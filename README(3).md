# Thy Portfolio — Setup Guide

A classical, Shakespearean-themed personal portfolio built with Next.js, Tailwind, and Supabase.

---

## ⚡ Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.local.example .env.local
# Open .env.local and add your Supabase credentials

# 3. Run the development server
npm run dev
# Open http://localhost:3000
```

---

## 🗄️ Supabase Setup

1. Go to [supabase.com](https://supabase.com) and create a free project
2. Go to **Settings → API** and copy:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Go to **SQL Editor → New Query** and run the SQL schema from `lib/supabase.ts` (scroll to the bottom of the file — it's in a comment block)
4. Optionally run the seed post at the bottom of that SQL block

---

## ✏️ Personalisation Checklist

### `app/page.tsx`
- [ ] Replace **"Thy Name Here"** with your actual name (in the fraktur h1)
- [ ] Update the tagline to describe your own work

### `app/endeavours/page.tsx`
- [ ] Update `PROJECTS` array with real GitHub links and descriptions
- [ ] Add/remove projects as needed

### `app/artes/page.tsx`
- [ ] Edit `SKILL_GROUPS` with your actual skills and proficiency levels
- [ ] Update "Presently Under Study" tags

### `components/Navbar.tsx`
- [ ] Update nav links if you add/remove pages

### `components/Footer.tsx`
- [ ] Replace GitHub and LinkedIn URLs with your actual profiles

### `app/missive/page.tsx`
- [ ] Update `SOCIAL_LINKS` with your profiles

### `tailwind.config.js`
- [ ] Adjust colours if desired (all in `:root` CSS variables in `globals.css`)

---

## 🌐 Deploying to Vercel

```bash
# 1. Push your repo to GitHub
# 2. Go to vercel.com → Import project → Select your repo
# 3. Add environment variables in Vercel dashboard:
#    NEXT_PUBLIC_SUPABASE_URL
#    NEXT_PUBLIC_SUPABASE_ANON_KEY
# 4. Deploy!

# 5. Add your .xyz domain:
#    Vercel → Settings → Domains → Add domain
#    At your registrar: point DNS nameservers to Vercel's
```

---

## 📁 File Structure

```
portfolio/
├── app/
│   ├── globals.css          ← All CSS variables, fonts, components
│   ├── layout.tsx           ← Root layout, Navbar, Footer
│   ├── page.tsx             ← Homepage (The Great Hall)
│   ├── not-found.tsx        ← 404 page
│   ├── endeavours/
│   │   └── page.tsx         ← Projects page
│   ├── artes/
│   │   └── page.tsx         ← Skills page
│   ├── broadsheet/
│   │   ├── page.tsx         ← Blog listing
│   │   └── [slug]/
│   │       └── page.tsx     ← Individual blog post
│   └── missive/
│       └── page.tsx         ← Contact page
├── components/
│   ├── Navbar.tsx           ← Nav with candle dark mode toggle
│   ├── Footer.tsx
│   ├── ReviewSystem.tsx     ← Quill-feather rating + comments
│   └── illustrations/
│       ├── WaxSeal.tsx      ← Animated wax seal SVG
│       ├── QuillDivider.tsx ← Ornamental divider SVG
│       ├── InkOrnament.tsx  ← Fleur, asterism, manicule, dagger
│       └── ScrollIllustration.tsx ← Parchment scroll SVG
└── lib/
    └── supabase.ts          ← Client, types, helpers, SQL schema
```

---

## 🎭 Easter Egg

Type **`forsooth`** on any page to trigger a hidden animation.

---

## 🕯️ Dark Mode

Click the candle icon in the navbar. Preference is saved to localStorage.
The label reads *"Extinguish the Candle"* (light mode) and *"Kindle the Flame"* (dark mode).
