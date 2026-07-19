# ControlMatrix

**Devpost project title:** Task, Project and Deferral Management  
**Track:** Work & Productivity  
**Build Week product subtitle:** ControlMatrix

ControlMatrix is an offline-first operational-governance application for teams that need stronger ownership, backup coverage, deferral follow-up, human-reviewed AI assistance and durable audit evidence.

## Judge demo

1. Open the deployed URL.
2. Select **Guest demo login**, or press **Start 90-second judge demo**.
3. Open the synthetic high-risk deferral.
4. Press **GPT-5.6 Brief**.
5. Confirm the record is synthetic/non-confidential.
6. Generate the live brief.
7. Edit as needed, choose Accepted / Edited / Rejected and enter a reviewer note.
8. Save the human decision, then open the Audit Trail.

No live business, client or employee data is included in the sample workspace.

## Recovered Build Week extension (verify against commit history)

The recovered submission package labels the following components as Build Week work. The original Git history was not included in the package, so it cannot independently establish timing or authorship. Before publishing, replace any time-based claim with links to the relevant commits or repository history.

The pre-existing foundation included offline task, project and deferral registers, primary/backup ownership, team roles, backup/restore and audit controls.

The Build Week extension adds:

- A judge-first synthetic workflow and one-click guided demo.
- A live GPT-5.6 Operational Brief attached to task, project and deferral records.
- Structured model output for situation summary, attention reason, actions, gaps, escalation date, follow-up draft and assumptions.
- Explicit data-safety confirmation before sending a record to the AI endpoint.
- Human Accept / Edit / Reject decisions with a mandatory reviewer note.
- Audit evidence for model, prompt version, request ID, input hash, generation and reviewer outcome.
- A server-side Cloudflare Pages Function; the OpenAI API key is never placed in browser code.
- Clear offline behaviour: core workflow continues while live AI generation waits for connectivity.
- Removal of unrelated personal-finance navigation and employer/domain-specific barriers.
- Product copy corrected from “blockchain” language to **hash-chained tamper-evident audit trail**.

See [CHANGELOG-HACKATHON.md](CHANGELOG-HACKATHON.md) for the evidence table.

## Architecture

```text
Browser / installable PWA
  ├─ Local task, project, deferral and audit workflow
  ├─ IndexedDB / local browser persistence
  └─ POST /api/operational-brief
           ↓
Cloudflare Pages Function
  ├─ OPENAI_API_KEY stored as an encrypted secret
  ├─ Input size and structure validation
  └─ OpenAI Responses API — gpt-5.6-terra
           ↓
Structured JSON brief
           ↓
Human review → Accept / Edit / Reject → audit evidence
```

## Deploy on Cloudflare Pages

### Dashboard method

1. Create a GitHub repository and upload this folder without the ZIP wrapper.
2. In Cloudflare, open **Workers & Pages → Create → Pages → Connect to Git**.
3. Choose the repository.
4. Framework preset: **None**.
5. Build command: `exit 0`.
6. Build output directory: `.` (the repository root).
7. Deploy.
8. Open **Settings → Variables and Secrets**.
9. Add an encrypted secret named `OPENAI_API_KEY`.
10. Optional variable: `OPENAI_MODEL=gpt-5.6-terra`.
11. Redeploy and open `/api/operational-brief`; it should return `"configured": true`.

Cloudflare dashboard **Direct Upload does not deploy a `/functions` directory**. Use Git integration or Wrangler for this package.

### Wrangler method

```bash
npm install -g wrangler
wrangler login
wrangler pages project create projectos-sentinel
wrangler pages secret put OPENAI_API_KEY --project-name projectos-sentinel
wrangler pages deploy . --project-name projectos-sentinel
```

## Local test

Full Pages + Function test:

```bash
cp .dev.vars.example .dev.vars
# Put a real local API key in .dev.vars; never commit it.
npx wrangler pages dev .
```

Static UI only:

```bash
python -m http.server 8080
```

The static server does not run the AI endpoint. The rest of the application remains testable locally and offline.

## Environment variables

Copy `.env.example` to `.dev.vars` only for local Cloudflare Pages testing. `.dev.vars` is ignored by Git.

| Variable | Required | Purpose |
|---|---:|---|
| `OPENAI_API_KEY` | Yes for live AI | Cloudflare Pages secret used only by the server-side function. |
| `OPENAI_MODEL` | Yes for live AI | One approved GPT-5.6 model identifier: `gpt-5.6`, `gpt-5.6-sol`, `gpt-5.6-terra`, or `gpt-5.6-luna`. |

The endpoint rejects an unset or unsupported model identifier and never silently substitutes another model.

## How GPT-5.6 and Codex Were Used

The Build Week extension adds a record-bound **GPT-5.6 Operational Brief**. The browser sends a reduced, user-confirmed task, project, or deferral record to `/api/operational-brief`; the Cloudflare Pages Function calls the OpenAI Responses API with a strict JSON schema. The configured GPT-5.6 model returns a summary, attention reason, recommended actions, missing information, escalation date, follow-up draft, and risks/assumptions. The app stores the model name, prompt version, request ID when returned, deterministic input hash, human decision, and reviewer note in local audit evidence.

Codex was used in this repository to inspect the recovered submission package, verify the static application and Cloudflare Function syntax, tighten the endpoint's input/output validation, reduce the AI payload, prevent CSV formula injection, narrow service-worker caching, correct unsupported product wording, and prepare the judge-facing documentation and verification checklists. This section does not claim that a live OpenAI API request was run during the audit; a deployed Pages secret is required to verify that separately.

## Judge demo path

Use [JUDGE_DEMO_CHECKLIST.md](JUDGE_DEMO_CHECKLIST.md) for the recommended three-minute flow. It identifies the exact moment to show the GPT-5.6/Codex contribution without implying that the AI has authority to change records or send email.

## Verification

See [TEST_PLAN.md](TEST_PLAN.md) for the manual functional, responsive, offline, API-configuration, and evidence checks. This repository is a dependency-free static PWA plus a Cloudflare Pages Function, so it has no package manager lockfile or application build step.

## Codex and GPT-5.6 evidence

Before final submission, replace the placeholders below:

- Primary Codex `/feedback` Session ID: `REPLACE_WITH_PRIMARY_CODEX_SESSION_ID`
- Main Build Week commit range: `REPLACE_WITH_FIRST_COMMIT..REPLACE_WITH_FINAL_COMMIT`
- Public demo URL: `REPLACE_WITH_CLOUDFLARE_URL`
- Public YouTube demo: `REPLACE_WITH_YOUTUBE_URL`

Use the commit history to distinguish pre-existing functionality from Build Week additions. Do not describe old functionality as newly built.

## Security and privacy boundaries

- API keys are server-side only.
- The browser submits a reduced structured record, not the whole workspace database.
- Names are reduced to assignment-presence flags in the AI payload.
- The user must confirm the record is synthetic or non-confidential.
- AI cannot automatically send email, change risk, close a record or approve an action.
- Generated text must be reviewed by a human.
- This hackathon build is not represented as a production-certified banking system.

## Known limitations

- Browser-local data is device/browser specific unless a separately secured backend is configured.
- Browser-side role controls are useful for demonstration and controlled offline use but are not a substitute for server-enforced enterprise identity.
- Formal penetration testing, enterprise SSO and centrally encrypted multi-user synchronization remain future work.
- GPT output may be incorrect; human verification is mandatory.

## License

MIT. Review organizational policy before using the code or exposing any internal workflow.
