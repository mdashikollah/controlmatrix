# Verification Plan

Run the static checks first, then run the manual checks in a fresh browser profile. Mark an item only after observing the stated outcome.

| Area | Check | Expected result |
|---|---|---|
| Launch | Open `index.html` through a local HTTP server | UI loads without JavaScript errors. |
| Judge access | Start guest demo | No registration, password, or organization email is required. |
| Synthetic data | Inspect demo records | Task, project, high-risk deferral, primary owner, backup owner, and reviewer are fictional. |
| Tasks | Create, edit, and complete a task | Required title/owner/backup/date validation and audit entry work. |
| Projects | Create and edit a project | Lead, members, status, progress, and due-date fields persist. |
| Deferrals | Create and edit a deferral | Required document/client, date ordering, and high-risk approver validation work. |
| Rescheduling | Change a task/deferral date | Updated value and audit history are visible. |
| Persistence | Reload browser | Local records and audit entries remain available. |
| Empty/error states | Open each list with no matching records | Clear empty state is shown; no exception occurs. |
| CSV safety | Export a record beginning with `=`, `+`, `-`, or `@` | Exported cell is prefixed with an apostrophe. |
| AI health | `GET /api/operational-brief` | Reports configuration state and non-secret model name only. |
| AI validation | Submit malformed or unsupported record fields | Endpoint returns a safe 400 response. |
| AI configuration | Omit API key or model | Endpoint returns a clear 503 configuration error without a secret. |
| AI review | Generate a valid brief and save Accept/Edit/Reject | Reviewer note is required; decision is recorded in audit evidence. |
| Offline | Disable network after loading app | Core registers/audit remain usable; AI says it is unavailable while offline. |
| Return online | Restore network | No background record upload occurs; user may initiate a new brief. |
| Email | Open follow-up/reminder | Draft opens for review and is not automatically sent. |
| Responsive | Test desktop and 375 px mobile viewport | Main navigation, tables, modals, and buttons stay usable. |
| PWA | Reload online then offline | Static shell is available; `/api/*` responses are not cached. |
| Security | Search tracked files and Git history | No real API keys, tokens, client records, or private details are present. |
| Claims | Compare README/Devpost copy with code | No blockchain, enterprise-security, compliance-guarantee, or unverified-live-call claims remain. |

## Static commands

```bash
NODE_BIN=/path/to/node
$NODE_BIN -e "const fs=require('fs'); const source=fs.readFileSync('index.html','utf8'); const scripts=[...source.matchAll(/<script[^>]*>([\\s\\S]*?)<\\/script>/gi)]; if(scripts.length!==1) throw new Error('Expected one inline script'); new Function(scripts[0][1]); console.log('PASS');"
$NODE_BIN --check functions/api/operational-brief.js
python3 -m http.server 8080
npx wrangler pages dev .
```

The last command requires Wrangler plus a local `.dev.vars` file when live AI testing is intended. Do not add a real secret to source control.
