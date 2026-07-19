# Devpost final draft — ControlMatrix

Do not save this version to Devpost until the audited package is deployed and the live GPT-5.6 brief has been tested with a configured server-side secret. This avoids claiming functionality that has not been verified publicly.

## Title

ControlMatrix: Task, Project & Deferral Management

## Tags

Keep `chatgpt`, then add these when Devpost offers matching tags: `html5`, `javascript`, `pwa`, `cloudflare`, `cloudflare-workers`, `openai-api`, `gpt-5.6`.

## Try-it links

- Live app: replace the existing HTTP link with the HTTPS URL of the audited deployment.
- Code: add the public repository URL after uploading the audited package and its documentation.
- Video: keep `https://youtu.be/jwCntyWTdt4` after confirming it plays while signed out.

## Project story

## Inspiration

Important work can disappear across email threads, spreadsheets, chat messages, and personal notes. The problem is not just visibility; it is accountability. Teams need to know who owns an item, who provides backup, what is overdue, what evidence is pending, and what changed before an item was closed.

I built **ControlMatrix** to make that operating discipline available in one lightweight, offline-first workspace.

## What it does

ControlMatrix brings together three connected workflows:

- **Tasks** for day-to-day execution
- **Projects** for coordinated, milestone-driven work
- **Deferrals** for items that cannot close yet but still require ownership, evidence, and follow-up

The application supports primary and backup owners, priorities, due dates, progress, reminders, pending-document tracking, search, filters, CSV export, local backup/restore, and a hash-chained tamper-evident local audit trail.

The audited Build Week implementation also includes a record-bound **GPT-5.6 Operational Brief**. A user chooses a task, project, or deferral; confirms the record is synthetic or non-confidential; and receives a structured situation summary, attention reason, recommended actions, missing information, suggested escalation date, follow-up draft, and risks/assumptions. The user must accept, edit, or reject the output with a reviewer note. AI cannot close a record, change risk, or send email automatically.

## How I built it

ControlMatrix is built with HTML, CSS, and JavaScript as an installable Progressive Web App with browser-local persistence. The AI path is a same-origin Cloudflare Pages Function that keeps the OpenAI key server-side and calls the OpenAI Responses API with a strict structured-output schema. The browser sends a reduced record, and the audit evidence records the configured model, prompt version, deterministic input hash, request ID when returned, reviewer outcome, and timestamp.

Codex was used to inspect and harden the recovered submission package: validate API inputs and outputs, eliminate silent model fallback, reduce the AI payload, prevent CSV formula injection, narrow service-worker caching, correct unsupported product claims, and prepare judge-facing documentation and verification steps.

## Challenges I ran into

The core challenge was adding AI without weakening human control. Generated text must not silently become an operational decision. I separated generation from approval, required an explicit data-safety confirmation, blocked automatic email and closure, and kept the core task, project, deferral, and audit workflow available offline.

Another challenge was keeping dense operational data usable on small screens while retaining enough information to support accountable follow-up.

## Accomplishments that I am proud of

- A working offline-first task, project, and deferral workflow rather than a static prototype
- Primary and backup ownership to reduce single-person dependency
- Structured deferrals so “temporarily pending” work remains visible
- Human-reviewed, record-bound GPT-5.6 assistance rather than a generic chatbot
- Explicit privacy, configuration, and audit boundaries
- A synthetic one-click judge-demo path with no real client or employee data

## What I learned

Useful operational AI needs more than a good answer. It needs data minimisation, ownership, exception handling, evidence, and a human decision boundary. I also learned that offline-first is a product decision: it improves resilience, while future collaboration requires authentication, authorization, secure synchronization, conflict handling, and independent testing.

## What's next

The next version will add secure multi-user workspaces, server-side authorization, encrypted synchronization, configurable policies, notifications, attachments, and formal security and automated test coverage. AI will remain assistive: accountable users retain authority over operational decisions.

## Demo note

Use only synthetic records in the video and live demo. Before submission, verify the deployed HTTPS app, code repository, and YouTube video in a signed-out browser. Do not claim a live GPT-5.6 result until the deployed endpoint has been configured and tested.
