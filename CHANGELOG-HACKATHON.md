# OpenAI Build Week Change Evidence (commit evidence required)

This recovered source package does not include its original Git history. Treat the entries below as a feature inventory, not proof of Build Week timing or authorship, until they are linked to verified commits.

This document separates the pre-existing application foundation from work added during the OpenAI Build Week submission period. Keep the commit links and Codex session evidence current.

| Area | Before Build Week | Added during Build Week | Evidence to attach |
|---|---|---|---|
| Core workflow | Offline task, project and deferral registers | Retained and integrated into the judge workflow | Link to pre-Build-Week baseline commit/file |
| Accountability | Primary/backup ownership and reviewer roles | Synthetic high-risk scenario designed around owner, backup and reviewer | Commit link + screenshot |
| AI | No record-bound GPT-5.6 operational brief | Live structured GPT-5.6 brief for task/project/deferral | Commit link + video timestamp |
| Human control | Manual operational updates | Accept/Edit/Reject decision, mandatory reviewer note, no automatic action | Commit link + audit screenshot |
| Audit | Field-level/master audit and hash chain | AI generation metadata, prompt version, input hash and reviewer outcome | Commit link + audit screenshot |
| Privacy | Local/offline workflow | Data-minimised payload and mandatory non-confidential-data confirmation | Worker + frontend commit |
| Deployment | Static/offline application | Cloudflare Pages Function with server-side secret | Worker commit + endpoint screenshot |
| Judge access | General guest demo | One-click 90-second guided synthetic scenario | UI commit + video |
| Product focus | Broad internal management app | Hackathon positioning as operational deferral governance | Devpost edit + README |
| Language | Some “blockchain-style” descriptions | Corrected to “hash-chained tamper-evident audit trail” | Diff/commit |

## Evidence placeholders

- Baseline commit or dated source: `REPLACE_WITH_BASELINE`
- First Build Week extension commit: `REPLACE_WITH_FIRST_BUILD_WEEK_COMMIT`
- Final judging build commit: `REPLACE_WITH_FINAL_BUILD_WEEK_COMMIT`
- Primary Codex `/feedback` Session ID: `REPLACE_WITH_PRIMARY_CODEX_SESSION_ID`
- Live URL: `REPLACE_WITH_LIVE_URL`
- Video URL: `REPLACE_WITH_VIDEO_URL`

## Suggested commit sequence

1. `chore: preserve pre-build-week baseline and add change evidence`
2. `feat: add synthetic judge demo and focused product positioning`
3. `feat: add GPT-5.6 operational brief Cloudflare endpoint`
4. `feat: record human AI review decisions in audit evidence`
5. `fix: remove unrelated navigation and correct security terminology`
6. `docs: add deployment, demo and submission evidence`

Do not squash away all evidence until judging is complete. Never fabricate dates or backdate commits.
