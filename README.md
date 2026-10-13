nothin' much in here....just the codebase for my portfolio site..if you did like then welcome here!!

Portfolio site (Astro). Live on Vercel; this repo is for local development and changes.

## Environment

`GITHUB_PAT` is required for the contribution heatmap. The server reads it for GitHub GraphQL (`contributionsCalendar` and pinned repositories) and for pull requests. Set it in Vercel and in a local `.env` file. Never prefix it with `PUBLIC_`.

Without the token, the heatmap shows an error and the home page lists work already documented on the site (GXU-1 and ICELang). Pull requests fall back to GitHub's public API.

The contact form also uses `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, and `SMTP_PASS` when those are set. See `.env.example`.

## Run on your computer (local machine)

`http://localhost:4321` only works **on the machine where the dev server is running**. Opening that URL in Firefox/Chrome on your laptop does nothing unless you start the server **on that same laptop**.

**Requirements:** [Node.js 22](https://nodejs.org/) (see `.nvmrc`).

```bash
git clone https://github.com/Princess0407/Portfolio.git
cd Portfolio
npm install
npm run dev
```

When the terminal shows `Local http://127.0.0.1:4321/`, open that link in your browser.

Stop the server with `Ctrl+C` in the terminal.

### Troubleshooting “Unable to connect” (Firefox / Chrome)

| Symptom | Cause | Fix |
| --- | --- | --- |
| Can’t connect to `localhost:4321` | Dev server not running on **your** PC | Run `npm run dev` in the project folder and keep that terminal open |
| Link from a Cloud Agent chat doesn’t work | Agent VM is stopped or token expired | Use local steps above, or start a new agent and use its port link |
| `npm run dev` errors | Wrong Node version or missing install | Use Node 22, run `npm install` again |

### Cloud Agents (optional)

Inside a Cursor Cloud Agent VM, use `npm run dev:cloud` so port forwarding can reach the server. The `vite.server.allowedHosts` entry for `.agent.cvm.dev` is only needed for those proxied links, not for normal local development.

## Production build

```bash
npm run build
npm run preview
```
