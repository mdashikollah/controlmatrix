# Code Edit Map

Use the files in this package as the judging build. Do not edit the older encrypted HTML wrapper; its application payload cannot be safely modified without decrypting and rebuilding it.

## Main files

| Change | File | Find this exact text |
|---|---|---|
| Product title and browser metadata | `index.html` | `ControlMatrix | Task, Project and Deferral Management` |
| Sidebar brand and Build Week badge | `index.html` | `OpenAI Build Week extension` |
| Judge landing section | `index.html` | `hackathonHero` |
| One-click guest workflow | `index.html` | `startJudgeDemoFlow` |
| Synthetic sample data | `index.html` | `createGuestDemoState` |
| AI modal and human review fields | `index.html` | `aiBriefModal` |
| Data-minimised record sent to AI | `index.html` | `safeAIRecord` |
| API request from browser | `index.html` | `generateAiBrief` |
| Accept/Edit/Reject and audit | `index.html` | `saveAiDecision` |
| AI brief register | `index.html` | `renderAiBriefs` |
| Default AI endpoint | `index.html` | `AI_DEFAULT_ENDPOINT` |
| Server-side prompt | `functions/api/operational-brief.js` | `SYSTEM_PROMPT` |
| Structured JSON output schema | `functions/api/operational-brief.js` | `const schema` |
| Default model | `functions/api/operational-brief.js` | `gpt-5.6-terra` |
| Devpost story and editing steps | `DEVPOST_EDIT_GUIDE.md` | `Project story — paste-ready content` |
| Pre-existing vs new evidence | `CHANGELOG-HACKATHON.md` | `Evidence placeholders` |
| Repository overview | `README.md` | `Codex and GPT-5.6 evidence` |
| Video narration | `DEMO_SCRIPT.md` | `2:50 Demo Script` |

## Changes you must make before final submission

### 1. Add your real evidence links

Edit both `README.md` and `CHANGELOG-HACKATHON.md` and replace:

- `REPLACE_WITH_PRIMARY_CODEX_SESSION_ID`
- `REPLACE_WITH_BASELINE`
- `REPLACE_WITH_FIRST_BUILD_WEEK_COMMIT`
- `REPLACE_WITH_FINAL_BUILD_WEEK_COMMIT`
- `REPLACE_WITH_LIVE_URL`
- `REPLACE_WITH_VIDEO_URL`

Do not invent or backdate evidence.

### 2. Configure the OpenAI secret

Do **not** edit `index.html` with an API key. Deploy through Cloudflare Git integration or Wrangler—not dashboard Direct Upload—then add the encrypted secret:

```text
OPENAI_API_KEY
```

The optional model environment variable is:

```text
OPENAI_MODEL=gpt-5.6-terra
```

### 3. Modify the AI behaviour

In `functions/api/operational-brief.js`:

- Edit `SYSTEM_PROMPT` to adjust the assistant’s guardrails.
- Edit `schema` to add or remove structured fields.
- Keep the rule that the model does not approve, close, send or invent policy requirements.

When adding a field to the Worker schema, also add its matching form field and rendering logic in `index.html` inside:

- `fillAiFields`
- `currentAiEditedBrief`
- `saveAiDecision`

### 4. Modify the synthetic demo

In `index.html`, find `createGuestDemoState`. You may change the synthetic task, project and deferral wording. Keep all names and records fictional. The one-click flow expects the deferral ID to remain:

```text
guest-def-1
```

Changing that ID requires updating `startJudgeDemoFlow` too.

### 5. Modify the brand without changing the Devpost submission title

The Devpost title should remain **Task, Project and Deferral Management** because that is the already-confirmed submission. The in-app product name **ControlMatrix** is used consistently in the application and video.

- the `<title>` element,
- the sidebar `.brand` block,
- `manifest.webmanifest`, and
- README/Devpost wording.

Keep the title/subtitle relationship clear in the video.

## Do not edit

- Do not paste an API key into browser JavaScript.
- Do not add real client, bank, employee or internal-policy data to the public demo.
- Do not call the hash chain a distributed blockchain.
- Do not describe browser-only role controls as enterprise-grade server authorization.
- Do not claim pre-existing features were built during Build Week.
