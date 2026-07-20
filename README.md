# ControlMatrix

**Devpost project title:** Task, Project and Deferral Management  
**Track:** Work & Productivity  
**Build Week product subtitle:** ControlMatrix

ControlMatrix is an offline-first operational-governance application for teams that need stronger ownership, backup coverage, deferral follow-up, human-reviewed AI assistance and durable audit evidence.

## Judge demo

1. Open the deployed URL.
2. Select **Guest demo login**, or press **Start 90-second judge demo**.
3. Open the synthetic high-risk deferral.
4. Press **GPT-5.6 Brief**. If the optional live endpoint is unavailable, continue with the core offline workflow and review the documented Build Week implementation.
5. Confirm the record is synthetic/non-confidential.
6. Generate the live brief when the deployment has a valid server-side API key.
7. Edit as needed, choose Accepted / Edited / Rejected and enter a reviewer note.
8. Save the human decision, then open the Audit Trail.

No live business, client or employee data is included in the sample workspace.

## Build Week extension

The imported source package did not include a pre-Build-Week Git baseline. The public repository history therefore proves the dated Build Week integration and audit work beginning with commit [`c04cabe`](https://github.com/mdashikollah/controlmatrix/commit/c04cabe50365ea841f91b51aeaae1bd2c3260778), but it does not independently prove the age or authorship of the earlier foundation. The distinction below is intentionally conservative.

The pre-existing foundation included offline task, project and deferral registers, primary/backup ownership, team roles, backup/restore and audit controls.

The Build Week extension adds:

- A judge-first synthetic workflow and one-click guided demo.
- An optional live GPT-5.6 Operational Brief attached to task, project and deferral records. The core workflow does not require an API key.
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
  └─ Optional POST /api/operational-brief
           ↓
Cloudflare Pages Function
  ├─ OPENAI_API_KEY stored as an encrypted secret when live AI is enabled
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
9. To enable optional live AI, add an encrypted secret named `OPENAI_API_KEY`.
10. Set `OPENAI_MODEL=gpt-5.6-terra` for the live AI endpoint.
11. Redeploy and open `/api/operational-brief`; live AI is ready only when it returns `"configured": true`. Without the secret, the core offline application remains usable.

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
| `OPENAI_API_KEY` | Optional; required only for live AI | Cloudflare Pages secret used only by the server-side function. Never expose it to judges or browser code. |
| `OPENAI_MODEL` | Optional; required only for live AI | Approved GPT-5.6 model identifier configured for the optional endpoint. |

The endpoint rejects an unset or unsupported model identifier and never silently substitutes another model.

## How GPT-5.6 and Codex Were Used

The Build Week extension adds an optional record-bound **GPT-5.6 Operational Brief**. When live AI is enabled, the browser sends a reduced, user-confirmed task, project, or deferral record to `/api/operational-brief`; the Cloudflare Pages Function calls the OpenAI Responses API with a strict JSON schema. The configured GPT-5.6 model returns a summary, attention reason, recommended actions, missing information, escalation date, follow-up draft, and risks/assumptions. The app stores the model name, prompt version, request ID when returned, deterministic input hash, human decision, and reviewer note in local audit evidence. Without a deployer-provided API key, task, project, deferral, audit and synthetic guest-demo functionality continues locally.

Codex was used in this repository to inspect the imported submission package, verify the static application and Cloudflare Function syntax, tighten the endpoint's input/output validation, reduce the AI payload, prevent CSV formula injection, narrow service-worker caching, correct unsupported product wording, and prepare the judge-facing documentation and verification checklists. This does not claim that a successful live OpenAI API response was produced during the repository audit. GPT-5.6 and Codex development evidence is distinct from optional runtime API authentication.

## Judge demo path

Use [JUDGE_DEMO_CHECKLIST.md](JUDGE_DEMO_CHECKLIST.md) for the recommended three-minute flow. It identifies the exact moment to show the GPT-5.6/Codex contribution without implying that the AI has authority to change records or send email.

## Verification

See [TEST_PLAN.md](TEST_PLAN.md) for the manual functional, responsive, offline, API-configuration, and evidence checks. This repository is a dependency-free static PWA plus a Cloudflare Pages Function, so it has no package manager lockfile or application build step.

## Codex and GPT-5.6 evidence

- Primary Codex Session ID: submit the genuine ID from the primary build task in the required Devpost field; it cannot be reconstructed from Git history.
- Build Week repository history: [`c04cabe..main`](https://github.com/mdashikollah/controlmatrix/compare/c04cabe50365ea841f91b51aeaae1bd2c3260778...main)
- Public demo: <https://controlmatrix.pages.dev>
- Public YouTube demo: <https://youtu.be/jwCntyWTdt4>

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
