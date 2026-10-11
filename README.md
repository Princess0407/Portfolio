nothin' much in here....just the codebase for my portfolio site..if you did like then welcome here!!

## Run locally

1. Use **Node.js 22** (`node -v` should show `22.x`).
2. Install dependencies: `npm install`
3. Start the dev server: `npm run dev`
4. Open **http://localhost:4321** in your browser.

The dev server listens on all interfaces (`--host`) so port forwarding and remote dev environments can reach it on port **4321**.

**Note:** `npm run preview` does **not** work with the Vercel adapter (`@astrojs/vercel/serverless`). Use `npm run dev` for local development instead of build + preview.

If the page does not load, check the terminal after `npm run dev`: it must say `http://localhost:4321/`. If port 4321 is already in use, the dev server exits with an error instead of switching ports—stop the other process (often a previous `npm run dev`) and try again.
