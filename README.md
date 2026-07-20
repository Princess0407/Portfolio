# Princess Portfolio — Astro

## Setup

```bash
npm install
npm run dev        # localhost:4321
npm run build      # outputs to dist/
npm run preview    # preview the build
```

## Adding a new blog post

Create a new file in `src/pages/blog/`:

```
src/pages/blog/your-post-name.md
```

Paste this frontmatter at the top and fill it in:

```md
---
layout: ../../layouts/BlogPost.astro
title: "Your post title"
date: "2025-08-01"
topic: "Topic / Category"
description: "One sentence summary shown on the blog index."
---

Your post content here in plain markdown.
```

That's it. The post appears automatically on /blog.

## Adding photos to gallery

1. Drop images into `public/gallery/`
2. Open `src/pages/gallery.astro`
3. Add items inside `.gallery-grid`:

```html
<div class="gallery-item">
  <img src="/gallery/your-photo.jpg" alt="description"/>
</div>
```

## Setting up contact form (Formspree)

1. Go to formspree.io and sign up
2. Create a new form pointed at your email
3. Copy your form ID (looks like `xpwzabcd`)
4. Open `src/pages/reach.astro`
5. Replace `YOUR_FORM_ID` in the form action URL

## Enabling live GitHub pinned repos

1. Go to github.com/settings/tokens
2. Generate a classic token with `public_repo` scope only
3. Open `src/pages/index.astro`
4. Replace `YOUR_GITHUB_PAT_HERE` with your token

## Banners

Place your banner images as:
- `public/banners/dark.png`   — used in dark mode
- `public/banners/light.png`  — used in light mode

## Deploying

Works on Vercel, Netlify, or GitHub Pages.

**Vercel / Netlify:** connect your repo, set build command to `npm run build`, output dir to `dist`.

**GitHub Pages:** add `site: 'https://yourusername.github.io'` and `base: '/repo-name'` to `astro.config.mjs`.
