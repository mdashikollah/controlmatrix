# Judge Demo Checklist

Use the deployed app in a fresh browser profile. All records shown must be synthetic.

1. Open the app and select **Start Judge Demo — No Signup** (or the equivalent guest-demo control).
2. State that the loaded workspace is fictional and temporary; point out the primary owner, backup owner, reviewer, task, project, and high-risk deferral.
3. Open the high-risk deferral. Show status, risk, due/deferred date, follow-up frequency, owner, backup cover, and audit history.
4. Make one normal operational change (for example, update progress or a follow-up date) and show that it is saved locally with an audit entry.
5. Open **GPT-5.6 Operational Brief**. Show the reduced structured record and the synthetic/non-confidential-data confirmation.
6. Generate the brief only when the deployed endpoint health check reports `configured: true`. Otherwise show the explicit configuration state; do not claim a successful live request.
7. Edit one recommendation, choose **Edited before use**, add a reviewer note, and save. Show the resulting brief-register and audit evidence fields: model, prompt version, input hash, request ID when available, decision, reviewer, and timestamp.
8. Open the email/follow-up draft and state that it is reviewable only; do not send it.
9. Toggle offline mode. Show that tasks, projects, deferrals, and local audit remain accessible, and that AI displays the offline-unavailable message instead of retrying.
10. Return online and show that the AI control is available for a new, user-initiated request; it must not automatically transmit stored records.
11. Briefly show `README.md` and `CHANGELOG-HACKATHON.md` to distinguish the pre-Build-Week foundation from the extension. Explain that Codex audited and hardened the recovered package; avoid claiming any unverified production deployment or API result.

Before recording or submitting, verify the public Devpost project, repository, deployed URL, and YouTube video in a signed-out/private browser. Those external checks are manual and are not established by this repository.
