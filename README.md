# ControlMatrix

**Devpost project title:** Task, Project and Deferral Management  
**Track:** Work & Productivity  
**Build Week product subtitle:** ControlMatrix

ControlMatrix is an offline-first operational-governance application for teams that need accountable ownership, backup coverage, controlled deferrals and durable audit evidence.

## Problem and differentiation

Operational work is often fragmented across email, spreadsheets and individual memory. Ordinary task managers record work, but they rarely preserve backup accountability, deferral decisions and tamper-evident audit history in one offline-capable workflow.

## Core features

- Task, project and deferral registers with status, priority, due date, owner and backup owner.
- Search, filtering, dashboards, reminders, CSV export and backup/restore.
- Installable offline-first PWA with browser-local persistence.
- Synthetic guest-demo workspace requiring no account.
- Hash-chained, tamper-evident audit records.
- Reviewable Outlook/email drafts that are never sent automatically.

## Technology and architecture

ControlMatrix uses dependency-free HTML, CSS and JavaScript, IndexedDB/browser storage, a service worker and a web app manifest.

```text
Browser / installable PWA
  ├─ Task, project and deferral workflows
  ├─ Browser-local persistence and IndexedDB backup
  ├─ Search, export and restore
  └─ Hash-chained audit evidence
```

No API key, external AI service, package installation or environment variable is required for the submitted application.

## Judge demo

1. Open <https://controlmatrix.pages.dev>.
2. Select **Start judge demo — no signup**.
3. Open the synthetic high-risk deferral.
4. Show its status, risk, dates, owner, backup owner and follow-up frequency.
5. Make one operational change with an update note.
6. Open the Audit Trail and show the recorded change.
7. Briefly show offline continuity, backup/export and project/task views.

All guest records are fictional and temporary.

## What We Built During OpenAI Build Week

The imported source package did not include a pre-Build-Week Git baseline. The public history proves the dated integration and audit work beginning with commit [`c04cabe`](https://github.com/mdashikollah/controlmatrix/commit/c04cabe50365ea841f91b51aeaae1bd2c3260778), but does not independently prove the age or authorship of the earlier foundation.

The pre-existing foundation included offline task, project and deferral registers, ownership, backup/restore and audit controls. During the documented submission work, Codex was used to:

- inspect and test the imported application;
- create a synthetic, judge-first workflow;
- remove unrelated personal-finance navigation and employer-specific barriers;
- prevent CSV-formula injection;
- narrow service-worker caching;
- replace unsupported “blockchain” wording with **hash-chained tamper-evident audit trail**;
- improve setup, security, evidence and judge documentation;
- audit the GitHub, Cloudflare, Devpost and video configuration.

An experimental runtime GPT brief was evaluated but removed from the final submitted product because a successful production response was not established. It is not presented as a working feature and no OpenAI API key is required.

## How GPT-5.6 and Codex Were Used

GPT-5.6 and Codex were used as development and review tools to analyze the imported codebase, reason about the judge workflow, identify security and reliability risks, improve user-facing wording, produce scoped code changes and audit the final submission. The developer reviewed and authorized the resulting changes.

This is a development-use claim only. The deployed application does not claim live GPT generation. Evidence is provided through the Codex session, audit task and dated repository history.

## Setup and deployment

Local static test:

```bash
python -m http.server 8080
```

Then open <http://localhost:8080>. Select **Start judge demo — no signup** for synthetic sample data.

Cloudflare Pages settings:

- Framework preset: **None**
- Production branch: `main`
- Build command: `exit 0`
- Output directory: `.`

No environment variables or secrets are required.

## Verification

See [TEST_PLAN.md](TEST_PLAN.md). The repository is a dependency-free static PWA, so it has no package-manager lockfile or application build step.

## Evidence

- Primary Codex `/feedback` Session ID: `6a5d0af0-d5bc-83ee-97f5-e4de896992f8`
- Final Codex submission-audit task ID: `019f800b-8078-7a82-9f21-cdd1548cad8e`
- Supporting ChatGPT planning conversation: `6a5d142e-5ef4-83ee-b457-33e7b6d2cc6d`
- Build Week repository history: [`c04cabe..main`](https://github.com/mdashikollah/controlmatrix/compare/c04cabe50365ea841f91b51aeaae1bd2c3260778...main)
- Public demo: <https://controlmatrix.pages.dev>
- Public YouTube demo: <https://youtu.be/jwCntyWTdt4>

Do not describe pre-existing functionality as newly built.

## Security and limitations

- No API key is required or shipped to browser code.
- Guest data is synthetic and temporary.
- Browser-local data is specific to a device/browser unless separately synchronized.
- Browser-side PIN and role controls are not server-enforced enterprise identity.
- Formal penetration testing, enterprise SSO and encrypted multi-device synchronization remain future work.
- The application is not represented as a production-certified banking system.

## License

MIT.
