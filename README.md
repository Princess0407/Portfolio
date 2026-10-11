nothin' much in here....just the codebase for my portfolio site..if you did like then welcome here!!

## Environment

`GITHUB_PAT` is required for the contribution heatmap. The server reads it for GitHub GraphQL (`contributionsCalendar` and pinned repositories) and for pull requests. Set it in Vercel and in a local `.env` file. Never prefix it with `PUBLIC_`.

Without the token, the heatmap shows an error and the home page lists work already documented on the site (GXU-1 and ICELang). Pull requests fall back to GitHub's public API.

The contact form also uses `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, and `SMTP_PASS` when those are set. See `.env.example`.
