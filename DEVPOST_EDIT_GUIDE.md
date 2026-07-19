# Where to Edit the Existing Devpost Project

> Submission integrity note: verify every time-based or authorship claim below against your original Git history before publishing. The recovered ZIP package contains no commit history, so it cannot prove when a feature was implemented.

Your submission is already confirmed, so **edit the existing project** rather than adding a duplicate.

## 1. Open the correct editing page

From your Devpost profile:

1. Open **Task, Project and Deferral Management** under **In Progress**.
2. Press **Manage project** or **Edit project**.
3. Continue through every submission tab and save each page.

The exact labels may vary slightly on mobile. Do not use **Add a new project** for this submission.

## 2. Project information

Use:

- **Project name:** Task, Project and Deferral Management
- **Tagline:** Turn operational deferrals into accountable, auditable action—even when the network is unavailable.
- **Product name inside the demo:** ControlMatrix
- **Track/category:** Work & Productivity

Keeping the confirmed Devpost title avoids creating a title mismatch. “ControlMatrix” is the product name shown in the application and video.

## 3. Project story — paste-ready content

### Inspiration

Operational work is often lost not because teams lack a task list, but because responsibilities move between people, deferred documents remain in email, and no durable evidence explains what happened next. I built this project to close those accountability gaps while preserving human judgement and offline continuity.

### What it does

ControlMatrix combines task, project and document-deferral management in one offline-first workspace. It tracks primary and backup ownership, deadlines, approvals, follow-up drafts and tamper-evident audit evidence. The included GPT-5.6 Operational Brief lets a user select a task, project or deferral, confirm that the record is synthetic or non-confidential, and receive a structured situation summary, attention reason, recommended actions, missing information, escalation date, follow-up draft and assumptions. A human must accept, edit or reject the output with a mandatory note. The AI cannot close a record, change risk or send an email automatically.

### How we built it

The application uses HTML, CSS and JavaScript as an installable offline-first PWA with browser-local persistence. A Cloudflare Pages Function keeps the OpenAI API key server-side and calls the OpenAI Responses API using GPT-5.6 Terra with a strict structured-output schema. The browser sends only a reduced structured record, records an input hash, and stores the model, prompt version, request ID and reviewer outcome in the audit evidence. Codex was used to analyse the existing application, implement the Build Week extension, integrate the Worker endpoint, improve the judge workflow, review failure states and produce deployment and testing documentation.

### Challenges we ran into

The hardest challenge was adding AI without weakening control. In an audit-sensitive workflow, generated text must not silently become a business decision. I separated generation from approval, required an explicit data-safety confirmation, prevented automatic email or closure, and added Accept/Edit/Reject review evidence. Another challenge was preserving the useful offline workflow while making the GPT-5.6 feature clearly available when online.

### Accomplishments that we're proud of

I am proud that the project is not a generic chatbot. GPT-5.6 is attached to a real operational record and its output enters a governed human-review process. The core task, project, deferral and audit workflow continues offline; the API secret remains outside the browser; judges receive a one-click synthetic scenario; and the submission documentation distinguishes the pre-existing foundation from the claimed extension pending commit evidence.

### What we learned

Useful operational AI requires more than a good answer. It needs data minimisation, ownership, evidence, exception handling and a human decision boundary. I also learned that Codex is most valuable when used as an engineering collaborator across analysis, implementation, testing and documentation—not merely as a code generator.

### What's next for Task, Project and Deferral Management

The next phase is a server-backed multi-user edition with enterprise identity, encrypted synchronization, configurable organizational policy controls, notification services and formal security testing. The human-review and audit model will remain central: AI will assist with prioritization and drafting, but accountable users will retain authority over operational decisions.

## 4. Links and media

Enter:

- **Try it out:** your deployed Cloudflare Pages URL
- **Code repository:** your GitHub repository
- **Demo video:** a public YouTube link under three minutes

Open all three links in an incognito/private browser before final submission.

## 5. Code repository

Repository root should contain (Cloudflare dashboard Direct Upload is not sufficient for the Function; deploy through Git integration or Wrangler):

- `index.html`
- `functions/api/operational-brief.js`
- `README.md`
- `CHANGELOG-HACKATHON.md`
- `SECURITY.md`
- `LICENSE`
- PWA assets

For a public repository, keep the included MIT licence. For a private repository, share access with the two judging addresses stated in the current official Build Week instructions before the deadline.

## 6. Codex proof

In the submission field requesting a Codex Session ID:

1. Open the **primary Codex session** used for the Build Week extension.
2. Run `/feedback`.
3. Copy that Session ID into Devpost.
4. Add the same ID to the README placeholder.

Use the session that contains the majority of the Build Week engineering work, not a minor support chat.

## 7. Video order

1. Problem — lost accountability during deferrals and role changes.
2. One-click synthetic guest demo.
3. Open high-risk deferral.
4. Generate live GPT-5.6 Operational Brief.
5. Edit and save a human decision.
6. Show audit evidence.
7. Show offline core workflow.
8. Briefly show Codex and the Build Week change evidence.

Keep the video under three minutes and use English narration.

## 8. Final eligibility check

- Existing submission edited, not duplicated.
- Pre-existing work separated from Build Week work.
- Meaningful GPT-5.6 use visible in product and video.
- Codex contribution described and `/feedback` ID included.
- Repository and live demo accessible to judges.
- Video public and viewable while signed out.
- No real client, employee, employer or confidential data.
- No API key in HTML or GitHub history.
