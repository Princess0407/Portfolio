# Restore Pinned Repositories and GitHub Configuration Plan

This document addresses your questions regarding the CSS issues introduced by Astro, the locations of GitHub data fetching configurations, and how the current implementation fetches data.

## Task 2: Why Astro Changed the Layout

When migrating to Astro, the layout of the pinned repositories broke (appearing as unstyled blue links instead of cards) because of **Astro's CSS Scoping mechanism**.

1. **Which files caused the change:** `src/pages/index.astro`.
2. **What code changed:** The CSS styles inside the `<style>` block in Astro components are scoped by default.
3. **Why it resulted in the new appearance:** Astro automatically appends a unique attribute (like `data-astro-cid-j7pvhlq`) to all HTML elements defined in the `.astro` file, and updates the CSS selectors to match. However, your GitHub repositories are generated **dynamically at runtime** using JavaScript (`document.createElement('a')`). Because these dynamically created elements don't get Astro's unique scoping attributes, none of the `.repo-card`, `.repo-name`, or `.repo-desc` styles are applied to them.
4. **What should be reverted/fixed:** We need to tell Astro NOT to scope those specific classes. We can do this by wrapping those styles in a `<style is:global>` tag or using the `:global()` pseudo-selector for the classes used by the dynamic script.

## Task 3: Locate GitHub API Configuration

Currently, there are **no environment variables (`.env`, `process.env`, `import.meta.env`)** used for GitHub data. Everything is hardcoded in the client-side JavaScript and HTML templates. 

> [!CAUTION]
> **Security Warning:** The current implementation places the Personal Access Token (PAT) inside a `<script>` tag that executes in the user's browser. If you put a real PAT there, **it will be exposed to anyone who visits your website**. To do this securely, the fetching must be moved to build-time or a server-side endpoint in Astro.

Here are the locations that need to be updated to point to your account:

### `src/pages/index.astro`
- **Line 168 (The PAT):** 
  ```javascript
  const token = 'YOUR_GITHUB_PAT_HERE';
  ```
  *Replace with: An environment variable or your actual PAT (though see security warning above).*
- **Line 173 (GraphQL Username):**
  ```javascript
  body: JSON.stringify({ query: `{ user(login:"Princess0407") ... }` })
  ```
  *Replace with: `login:"MY_USERNAME"`*
- **Line 23 (Hero Social Link):**
  ```html
  <a class="hero-link" href="https://github.com/Princess0407" target="_blank">
  ```
  *Replace with: Your GitHub profile URL.*
- **Line 85 (Heatmap Label):**
  ```html
  <p class="heatmap-title" id="heatmap-label">Princess0407 · last 52 weeks</p>
  ```
  *Replace with: `MY_USERNAME · last 52 weeks`*
- **Lines 148-153 (Fallback Data):**
  The `loadFallbackRepos` function contains hardcoded fallback projects (e.g., ICELang, PromptGuard).
  *Replace with: Your own fallback project data and URLs.*

### `src/pages/reach.astro`
- **Line 22 (Reach Social Link):**
  ```html
  <a class="hero-link" href="https://github.com/Princess0407" target="_blank">GitHub</a>
  ```
  *Replace with: Your GitHub profile URL.*

## Task 4: How Live GitHub Fetching Works

The current data fetching mechanism operates entirely **client-side at runtime**.

**Data Flow:**
1. The user opens the page in their browser.
2. The browser executes `loadPinnedRepos()` from the `<script>` tag at the bottom of `index.astro`.
3. The script calls `fetch('https://api.github.com/graphql')` using the hardcoded token and username.
4. The GitHub API returns a JSON response containing the pinned repositories.
5. The script iterates over the nodes and uses `document.createElement()` and `innerHTML` to inject raw HTML into `<div id="repos-container">`.

**What is fetched and when:**
- **Pinned Repositories:** Fetched at **runtime** (client-side) on every single page load.
- **Caching:** There is **no caching** implemented. Every visitor triggers a new API request to GitHub.
- **Contribution Heatmap:** This is **NOT fetched from GitHub**. The `buildHeatmap()` function (line 192 in `index.astro`) uses `Math.random()` to generate a completely fake graph.
- **Profile Data (Bio, skills, etc.):** This is **NOT fetched from GitHub**. It is statically written in the HTML inside `index.astro`.

## Task 1: Proposed Plan to Fix Layout

To resolve the layout without modifying your visual identity, I propose the following strict changes to `src/pages/index.astro`:

1. Separate the dynamic styles (e.g. `.repo-card`, `.repo-name`, etc.) into a new `<style is:global>` block inside `index.astro`.
2. This will restore the exact card styling you had before (as the CSS was already there, just being ignored by the browser). 

We will **not** modify the HTML structure, JavaScript logic, or add any new UI.

> [!IMPORTANT]
> **User Review Required:** Please let me know if you would like me to proceed with the CSS scoping fix for the layout (Task 1). Also, let me know if you'd like me to help refactor the GitHub fetching to run securely at build-time using Astro instead of exposing a token in the browser!
