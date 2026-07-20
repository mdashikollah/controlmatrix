# Verification Plan

## Automated/static checks

- Parse all application JavaScript.
- Compile inline JavaScript from `index.html`.
- Check Git whitespace errors.
- Scan tracked files for credential patterns.
- Confirm the manifest and service worker are present.
- Confirm the production URL returns HTTP 200.

## Manual judge-path checks

1. Open a fresh browser profile.
2. Start the guest demo without signup.
3. Verify the synthetic deferral loads.
4. Update a record with a required note.
5. Verify the audit entry appears.
6. Verify task, project, deferral, search, export and restore controls.
7. Verify offline shell navigation.
8. Check representative desktop and mobile widths.

No live OpenAI API test is required because the submitted application has no runtime AI dependency.
