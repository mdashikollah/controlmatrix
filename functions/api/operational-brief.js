const SYSTEM_PROMPT = `You are an operational governance assistant inside ControlMatrix.
Create a concise, evidence-aware operational brief from the supplied structured record.
Do not invent laws, policies, approvals, facts, dates, recipients or completed actions.
Do not make a final compliance decision. Do not state that an item is safe, approved or closed.
Separate known facts from missing information. Recommended actions must be practical and human-reviewable.
The draft follow-up must be professional, must not claim that anything was sent, approved or completed, and must ask for missing evidence where needed.`;

const MODEL_ALLOWLIST = new Set(["gpt-5.6", "gpt-5.6-sol", "gpt-5.6-terra", "gpt-5.6-luna"]);
const PROMPT_VERSION = "operational-brief-v1";
const COMMON_FIELDS = new Set(["recordType", "recordId", "title", "workspaceObjective", "currentDate"]);
const TYPE_FIELDS = {
  task: new Set(["status", "priority", "progress", "startDate", "dueDate", "ownerAssigned", "backupAssigned", "workType", "dependencyOrBlocker", "description"]),
  project: new Set(["status", "priority", "progress", "startDate", "dueDate", "leadAssigned", "memberCount", "projectType", "description"]),
  deferral: new Set(["status", "riskLevel", "originalDueDate", "deferredUntil", "ownerAssigned", "backupAssigned", "approverConfigured", "followUpFrequency", "reason"])
};

const schema = {
  type: "object",
  additionalProperties: false,
  required: ["situationSummary","attentionReason","recommendedActions","missingInformation","suggestedEscalationDate","draftFollowUp","risksAndAssumptions"],
  properties: {
    situationSummary: { type: "string" },
    attentionReason: { type: "string" },
    recommendedActions: { type: "array", minItems: 2, maxItems: 5, items: { type: "string" } },
    missingInformation: { type: "array", maxItems: 6, items: { type: "string" } },
    suggestedEscalationDate: { type: "string", description: "YYYY-MM-DD when supported by the record, otherwise empty string" },
    draftFollowUp: { type: "string" },
    risksAndAssumptions: { type: "array", minItems: 1, maxItems: 6, items: { type: "string" } }
  }
};

function json(data, status = 200, extra = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store", ...extra }
  });
}

function configuredModel(env) {
  const model = typeof env.OPENAI_MODEL === "string" ? env.OPENAI_MODEL.trim() : "";
  if (!model) return { error: "OPENAI_MODEL is not configured." };
  if (!MODEL_ALLOWLIST.has(model)) return { error: "OPENAI_MODEL must be an approved GPT-5.6 model identifier." };
  return { model };
}

function isShortString(value, max = 2000) {
  return typeof value === "string" && value.length <= max;
}

function validDate(value) {
  return value === "" || (/^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(`${value}T00:00:00Z`)));
}

function validateRecord(record) {
  if (!record || Object.prototype.toString.call(record) !== "[object Object]") return "A structured record is required.";
  const type = record.recordType;
  if (!Object.prototype.hasOwnProperty.call(TYPE_FIELDS, type)) return "recordType must be task, project, or deferral.";
  const allowed = new Set([...COMMON_FIELDS, ...TYPE_FIELDS[type]]);
  if (Object.keys(record).some((key) => !allowed.has(key))) return "The record contains unsupported fields.";
  if (!isShortString(record.recordId, 120) || !isShortString(record.title, 240) || !isShortString(record.workspaceObjective || "", 1000)) return "The record contains invalid text fields.";
  for (const [key, value] of Object.entries(record)) {
    if (typeof value === "string" && !isShortString(value)) return `The ${key} field is too long.`;
    if (typeof value !== "string" && typeof value !== "number" && typeof value !== "boolean") return `The ${key} field has an invalid type.`;
  }
  if (typeof record.progress === "number" && (record.progress < 0 || record.progress > 100)) return "progress must be between 0 and 100.";
  for (const key of ["currentDate", "startDate", "dueDate", "originalDueDate", "deferredUntil"]) {
    if (key in record && !validDate(record[key])) return `${key} must be an ISO date or empty.`;
  }
  return null;
}

function validateBrief(brief) {
  if (!brief || Object.prototype.toString.call(brief) !== "[object Object]") return false;
  const keys = Object.keys(schema.properties);
  if (Object.keys(brief).length !== keys.length || keys.some((key) => !(key in brief))) return false;
  if (!["situationSummary", "attentionReason", "draftFollowUp", "suggestedEscalationDate"].every((key) => isShortString(brief[key], 4000))) return false;
  if (!validDate(brief.suggestedEscalationDate)) return false;
  for (const key of ["recommendedActions", "missingInformation", "risksAndAssumptions"]) {
    if (!Array.isArray(brief[key]) || brief[key].some((item) => !isShortString(item, 800))) return false;
  }
  return brief.recommendedActions.length >= 2 && brief.recommendedActions.length <= 5 && brief.missingInformation.length <= 6 && brief.risksAndAssumptions.length >= 1 && brief.risksAndAssumptions.length <= 6;
}

function extractOutputText(data) {
  if (typeof data?.output_text === "string") return data.output_text;
  for (const item of data?.output || []) {
    for (const part of item?.content || []) {
      if (part?.type === "output_text" && typeof part.text === "string") return part.text;
    }
  }
  return "";
}

export async function onRequest(context) {
  const { request, env } = context;
  const modelConfig = configuredModel(env);
  if (request.method === "OPTIONS") return new Response(null, { status: 204 });
  if (request.method === "GET") return json({ ok: true, configured: Boolean(env.OPENAI_API_KEY) && Boolean(modelConfig.model), model: modelConfig.model || "", promptVersion: PROMPT_VERSION, configurationError: modelConfig.error || "" });
  if (request.method !== "POST") return json({ error: "Method not allowed" }, 405);
  if (modelConfig.error) return json({ error: modelConfig.error }, 503);
  if (!env.OPENAI_API_KEY) return json({ error: "OPENAI_API_KEY is not configured in Cloudflare Pages secrets." }, 503);

  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > 20000) return json({ error: "Request is too large." }, 413);
  let body;
  try { body = await request.json(); } catch { return json({ error: "Invalid JSON body." }, 400); }
  if (body?.promptVersion !== PROMPT_VERSION) return json({ error: "Unsupported prompt version." }, 400);
  const recordError = validateRecord(body?.record);
  if (recordError) return json({ error: recordError }, 400);

  const recordText = JSON.stringify(body.record);
  if (recordText.length > 12000) return json({ error: "Structured record exceeds the safe size limit." }, 413);
  const promptVersion = PROMPT_VERSION;

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: { "authorization": `Bearer ${env.OPENAI_API_KEY}`, "content-type": "application/json" },
    body: JSON.stringify({
      model: modelConfig.model,
      store: false,
      input: [
        { role: "system", content: [{ type: "input_text", text: SYSTEM_PROMPT }] },
        { role: "user", content: [{ type: "input_text", text: `Prompt version: ${promptVersion}\nStructured operational record:\n${recordText}` }] }
      ],
      text: { format: { type: "json_schema", name: "operational_brief", strict: true, schema } },
      reasoning: { effort: "low" },
      max_output_tokens: 1200
    })
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const modelRejected = response.status === 404 || data?.error?.code === "model_not_found" || data?.error?.param === "model";
    if (modelRejected) {
      return json({ error: "The configured OPENAI_MODEL was rejected or is unavailable. Check the Cloudflare setting; no fallback was used." }, 503);
    }
    return json({ error: "The AI service could not generate a brief. Please try again later." }, response.status >= 400 && response.status < 500 ? 502 : 503);
  }
  const outputText = extractOutputText(data);
  if (!outputText) return json({ error: "The model returned no structured brief." }, 502);
  let brief;
  try { brief = JSON.parse(outputText); } catch { return json({ error: "The model response could not be parsed as structured JSON." }, 502); }
  if (!validateBrief(brief)) return json({ error: "The model response did not match the required brief format." }, 502);

  return json({
    brief,
    meta: { model: modelConfig.model, promptVersion, requestId: typeof data.id === "string" ? data.id : "", generatedAt: new Date().toISOString(), live: true }
  });
}
