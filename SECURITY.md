# Security Notes

## Hackathon safety boundary

This package demonstrates an architecture and control model. It is not represented as a production-certified banking, compliance or records-management platform.

## Implemented controls

- OpenAI API key is read only by the Cloudflare Pages Function from `OPENAI_API_KEY`.
- Browser code never receives the key.
- AI input is a reduced structured record rather than a complete workspace export.
- Person names are converted to assignment-presence flags in the AI payload.
- The user must confirm that the record is synthetic or non-confidential.
- Live AI cannot automatically modify risk/status, close records, approve actions or send email.
- Generation and reviewer decisions are written to the audit evidence.
- API requests and responses are marked `no-store` at the application layer.

## Before public deployment

- Search the entire repository and Git history for secrets.
- Use synthetic demo data only.
- Restrict or disable any generic sync endpoint not needed for judging.
- Add rate limiting and authenticated access before real organizational use.
- Complete threat modelling, dependency review, penetration testing and legal/privacy review.
- Replace browser-only role enforcement with server-side authorization for production.

## Reporting

For the hackathon repository, report a security concern privately to the repository owner rather than publishing sensitive details in a public issue.
