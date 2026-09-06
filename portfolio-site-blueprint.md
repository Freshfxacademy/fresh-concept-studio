# ODU EMMANUEL PETER — Fresh Concept Studio
### Video Editor Portfolio — Site Blueprint for Antigravity Build

**Brand:** Fresh Concept Studio
**Email:** freshconceptstudio@gmail.com
**WhatsApp:** +234 906 551 4169
**X (Twitter):** https://x.com/SOLDIERSFROMTH
**Instagram:** https://www.instagram.com/SOLDIERSFROMTH1
**TikTok:** https://www.tiktok.com/@soldiersfromth

---

## 0. Design Concept

**Subject:** A video editor who cuts across five very different worlds — podcasts, action thrillers, 3D animation, short films, advertisements. The audience is people hiring: brands, producers, podcasters. The page's one job: prove range and craft fast, then make contact effortless.

**The idea that makes this feel like *your* site and not a template:** the whole page behaves like an editing timeline, not a stack of cards.

- A thin vertical **scrubber rail** runs down the left edge of the page (like a timeline playhead). It fills in as you scroll and doubles as section navigation — click a mark, jump to that section. This is functional, not decorative: it's the one distinctive structural device, grounded in what you actually do for a living.
- The hero loads like a **title sequence** — one deliberate reveal, not fade-ins scattered on every section.
- Portfolio categories are **tracks**, not identical cards. Each category (Podcast, Action Thriller, 3D Animation, Short Film, Advertisement) gets its own subtle accent tint and label treatment, echoing how tracks are color-coded in an NLE (DaVinci/Premiere timeline).
- Buttons get **one signature 3D interaction** — a physical "shutter click" press (depth via layered shadow + slight scale/translate on press, spring back on release) — used consistently everywhere, not hover-animation soup.

### Color tokens
| Token | Hex | Use |
|---|---|---|
| `--bg` | `#FFFFFF` | Page background (per your brief) |
| `--bg-alt` | `#F6F6F4` | Section separation, card backgrounds |
| `--ink` | `#0D0D10` | Primary text — true near-black, deliberate, not a generic tint |
| `--ink-soft` | `#5B5B63` | Secondary text |
| `--accent` | `#E6401C` | Primary accent — a "tally light / recording" red. CTAs, active states, playhead |
| `--accent-soft` | `#FCE7E2` | Accent backgrounds, tags |
| `--line` | `#E7E7E4` | Hairline borders, dividers |

Per-category track tints (used only as thin left-border + tag color on cards, never full backgrounds):
- Podcast — `#2E6F6E` (muted teal)
- Action Thriller — `#8A1E1E` (deep red)
- 3D Animation — `#5B4B9E` (violet)
- Short Films — `#B4791F` (amber)
- Advertisement — `#1F5FA8` (blue)
- Illustration — `#C23B7B` (magenta)
- Web Development — `#2B8A3E` (green — deliberately code-adjacent without leaning on the generic "tech blue" cliché)

### Type
- **Display / headings:** a bold, slightly condensed grotesk with motion-graphics character — e.g. **Clash Display** or **General Sans** (Fontshare, free). Used big and confident for the hero and section titles.
- **Body / UI:** **Inter** or **IBM Plex Sans** — a plain, legible workhorse so the display face keeps all the personality.
- No all-caps labels, no single-word-in-italic headline tricks, no tracked-out eyebrow text above every section — keep labels quiet and let the layout carry structure.

### Layout
- Left-aligned, editorial. Content max-width ~1120px, generous white space.
- Scrubber rail fixed at `left: 24px`, full viewport height, `z-index` above content, hidden on small mobile (collapses into a simple top progress bar instead).

```
[rail] [ HERO — big name/role, one-line pitch, 2 buttons        ]
[rail] [ ABOUT — photo + bio + tool badges + 3 stat numbers     ]
[rail] [ SERVICES — 5 short offering blocks                     ]
[rail] [ WORK — category filter + video card grid (the core)    ]
[rail] [ CONTACT — email / whatsapp / socials, big and simple   ]
[     ] [ footer ]
```

---

## 1. Page Sections

### Hero
- Name + role ("Video Editor & Motion Storyteller" or your own phrasing)
- One-line pitch — plain language, e.g. "I cut podcasts, thrillers, animation and ads that hold attention." (write your real one)
- Primary button: **See my work** → scrolls to Work
- Secondary button: **Get in touch** → scrolls to Contact
- Title-sequence entrance: headline letters/words settle into place once on load, nothing re-animates on scroll here.

### About
- Founder photo (yours) — square or 4:5 crop, placed opposite the bio text. Keep it a real portrait, not a graphic/illustrated avatar, since trust in a service business comes from seeing the person. Once you upload it, drop it at `src/assets/founder.jpg` and reference it directly in `About.jsx`
- Short bio (3–5 sentences, your voice, plain language — no marketing filler)
- Tool badges: Premiere Pro, DaVinci Resolve, After Effects, Blender, Cinema 4D, etc. — only the real ones you use
- 3 stat numbers (e.g. years editing, projects delivered, clients served) — only include this if the numbers are real; skip it otherwise rather than inventing figures

### Services
Eight short blocks mapped to your actual offerings:
- Podcast editing & multi-cam cutdowns
- Action/thriller narrative editing & color
- 3D animation & motion design
- Short film editing
- Advertisement & commercial cutting
- Cinematic AI filmmaking
- Illustration
- Web development (frontend)

Each: a one-line description of what the client gets, not a sales pitch. For the web development block specifically, be upfront and simple about scope — something like "Frontend development — I build the interface and experience; for full-stack or backend-heavy builds I collaborate with a backend developer." Stating this plainly builds trust rather than leaving clients to assume and be surprised later.

With eight services, consider a 4×2 grid on desktop (collapsing to a single column on mobile) rather than the original 5-block row, so it doesn't feel cramped.

### Work (the core, built to scale)
- Filter bar with all 7 categories + "All" — clicking filters the grid client-side, no page reload
- Responsive grid mixing two card types, both pulling from the same data file:
  - **Video cards** (podcast, action-thriller, 3d-animation, short-film, advertisement) — YouTube thumbnail, click-to-load iframe (never a live iframe by default, it's heavy at scale), title, client, category tag, year
  - **Media cards** (illustration, web-development) — a static image (illustration piece, or a screenshot/mockup of the site) instead of a video thumbnail, plus title, client, category tag, year, and an "External link" icon/button if the piece lives elsewhere (a live site, a Behance/Dribbble post, etc.)
- Both card types share the same outer shape (aspect ratio, corner radius, tag placement, hover/press behavior) so the grid reads as one consistent system, not two different components bolted together — only the media area (video vs. image) and the optional external-link affordance differ
- Built from a single data file so adding a new job later is a one-line edit, not new markup

### Contact
- Email: `freshconceptstudio@gmail.com` — `mailto:` link, also shown as plain text
- Direct WhatsApp button → `https://wa.me/2349065514169` opens chat directly (no leading `+` or `0` in the URL — country code + number only)
- Social row:
  - X — `https://x.com/SOLDIERSFROMTH`
  - Instagram — `https://www.instagram.com/SOLDIERSFROMTH1`
  - TikTok — `https://www.tiktok.com/@soldiersfromth`
- Keep it big, simple, and low-friction — this is the page's final job

---

## 2. Portfolio Card Data Schema

Store all portfolio entries in one JSON file. This is the most important architectural decision for your future self — every new job you finish becomes one object appended to an array, nothing else changes.

Two shapes share the same file, distinguished by `mediaType`:

**Video entry** (podcast, action-thriller, 3d-animation, short-film, advertisement):
```json
{
  "id": "pod-003",
  "title": "Episode 12 — The Long Game",
  "tagline": "What happens when the game outlasts the player?",
  "client": "Late Nights Podcast",
  "category": "podcast",
  "mediaType": "video",
  "youtubeId": "dQw4w9WgXcQ",
  "year": 2026,
  "tools": ["Premiere Pro", "DaVinci Resolve"],
  "featured": false
}
```

**Media entry** (illustration, web-development):
```json
{
  "id": "web-002",
  "title": "Nolan & Co. — Studio Site",
  "tagline": "A frontend build for a design studio's new site",
  "client": "Nolan & Co.",
  "category": "web-development",
  "mediaType": "image",
  "imageSrc": "/assets/work/nolan-site.jpg",
  "externalUrl": "https://nolanandco.example.com",
  "year": 2026,
  "tools": ["React", "Tailwind CSS"],
  "featured": false
}
```

`tagline` is optional but recommended — a one-line hook (your real YouTube description line, or a written-for-the-card version) that renders on the card beneath the title, in `text-ink-soft`, smaller than the title. It's what turns a bare thumbnail grid into something that reads like a curated reel rather than a file list.

Category values map to your seven portfolio verticals: `podcast`, `action-thriller`, `3d-animation`, `short-film`, `advertisement`, `illustration`, `web-development`.

`mediaType` (`"video"` or `"image"`) is what `PortfolioCard.jsx` reads to decide whether to render a click-to-play YouTube embed or a static image with an optional "visit link" button. Everything else — title, client, category tag, year — renders identically for both, which is what keeps the grid visually consistent.

`externalUrl` is optional and only used on image entries when the work lives somewhere clickable (a live site, a Behance post).

`featured: true` lets you pin your strongest pieces across any category to always show first in "All", regardless of date.

---

## 3. Recommended Stack (for Antigravity)

- **React + Vite** — fast to scaffold, agent-friendly, easy for Antigravity to reason about component boundaries
- **Tailwind CSS** — implement the token table above as Tailwind theme extensions (`bg-ink`, `text-accent`, etc.) rather than hardcoded hex values scattered through components
- **Framer Motion** — for the one hero entrance sequence and the button press physics; resist the urge to add it everywhere else
- **react-lite-youtube-embed** (or a hand-rolled thumbnail → iframe swap) — loads a static thumbnail first, only injects the real YouTube iframe on click. Critical once you have 50+ cards; a page with 50 live iframes will crawl
- Plain `IntersectionObserver` for the scrubber rail's active-section tracking — no extra library needed

---

## 4. Suggested Folder Structure

```
portfolio/
├── src/
│   ├── data/
│   │   └── works.json          ← seed data / local fallback (live data comes from Supabase)
│   ├── lib/
│   │   └── supabaseClient.js   ← Supabase connection, reads from .env
│   ├── hooks/
│   │   └── usePortfolioItems.js ← fetches cards from Supabase for the public site
│   ├── components/
│   │   ├── ScrubberRail.jsx
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Services.jsx
│   │   ├── Work/
│   │   │   ├── WorkSection.jsx
│   │   │   ├── CategoryFilter.jsx
│   │   │   └── PortfolioCard.jsx   ← renders both video and image entries; reused in Admin.jsx too
│   │   ├── Contact.jsx
│   │   ├── Footer.jsx
│   │   └── Button.jsx          ← the shared 3D-press button
│   ├── pages/
│   │   └── Admin.jsx           ← login + add/edit/delete cards, at the /admin route
│   ├── styles/
│   │   └── tokens.css          ← CSS variables from the color table
│   ├── App.jsx                 ← routes "/" (one-page site) and "/admin" (panel)
│   └── main.jsx
├── supabase-schema.sql         ← run once in Supabase's SQL Editor
├── .env                        ← VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY (never commit this)
├── tailwind.config.js
├── index.html
└── package.json
```

---

## 5. The Signature Button (3D press interaction)

One reusable `<Button>` component, used for every CTA on the page:

- Rest state: solid `--accent` fill, subtle offset shadow beneath (like a raised shutter button)
- Hover: shadow tightens slightly, button lifts 1–2px
- **Active/press:** button drops down to meet its shadow (translateY + shadow shrink), ~100ms — the "click" feel of pressing a physical record button
- Release: springs back with Framer Motion's spring easing, not a linear ease

This single interaction, applied consistently, does more for "dynamic and 3D" than animating every card on hover.

---

## 6. Admin Panel (add/edit cards without touching code)

Since the Work grid will keep growing, you get a small, password-protected `/admin` page inside the same site — not a separate app, not a separate design. Data lives in **Supabase** (a hosted database + login system), which means you're not running or maintaining a backend server; you're just calling Supabase's API from your frontend, which is squarely in your skillset.

### How it fits together
- `portfolio_items` — one Supabase table replacing the static `works.json`. Same fields you already know: `title`, `tagline`, `client`, `category`, `media_type`, `youtube_id`, `image_path`, `external_url`, `year`, `tools`, `featured`, plus a `sort_order` you can drag to reorder later.
- **Public read, admin-only write**, enforced by Supabase Row Level Security (RLS) — anyone can view the site's cards, only you (logged in) can add, edit, or delete. This is the real security boundary, not the fact that `/admin` isn't linked anywhere.
- **Supabase Auth** handles your login (email + password) — no custom auth code to write.
- **Supabase Storage** (`portfolio-media` bucket) holds any images you upload for illustration and web-development cards — drag a file in from the admin form, get back a URL, done.

### What's included
- **`supabase-schema.sql`** — run once in the Supabase SQL Editor. It creates the table, the security policies, the storage bucket, and seeds it with your current 11 cards (the placeholder entries keep their "Replace with..." text — you'll edit those rows from the admin panel itself once it's live, instead of hand-editing JSON).

### What Antigravity still needs to build
- `src/lib/supabaseClient.js` — a few lines initializing the Supabase client from two env vars (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` — you get both from your Supabase project settings after creating it free at supabase.com)
- `src/hooks/usePortfolioItems.js` — replaces the static `import works from './data/works.json'` in `WorkSection.jsx` with a Supabase fetch, so the live site always shows current data
- `src/pages/Admin.jsx` — a single route (`/admin`) with:
  - A login form (Supabase Auth `signInWithPassword`) shown if there's no active session
  - Once logged in: a list of existing cards with Edit/Delete, and a form to add a new one (title, tagline, client, category dropdown, media type toggle, YouTube ID or image upload, year, tools, featured checkbox)
  - Reuses the same `PortfolioCard` component and design tokens as the public site, so the admin view isn't a jarring, unstyled form — it should still feel like *your* site
- One extra route added via `react-router-dom` (`/` for the one-page site, `/admin` for the panel) — the public page itself stays a single page exactly as designed; only the admin view is a separate route

### Setting it up (for you, not Antigravity)
1. Create a free project at supabase.com
2. In the SQL Editor, paste and run `supabase-schema.sql`
3. In Authentication → Users, manually create your one admin login (your email + a password)
4. Copy your Project URL and anon public key into a `.env` file as `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
5. Hand the project (with `.env` filled in) to Antigravity to wire up the three files above



## 7. Starter files included

Alongside this blueprint you have these files ready to drop straight into the Antigravity project:

- **`works.json`** — your current portfolio entries (video and image), with the exact field names from the schema in section 2. This is the seed data before it moves into Supabase — keep it as a local fallback/reference even after the admin panel is live.
- **`tailwind.config.js`** — the full color/type/shadow token system from section 0, ready to extend your Tailwind theme (`bg-accent`, `text-track-podcast`, `shadow-btn-press`, etc.)
- **`supabase-schema.sql`** — the admin panel's database schema, security policies, and seed data, from section 6. Run once in Supabase's SQL Editor.

## 8. Still open

- A one-line pitch for the hero (e.g. "I cut podcasts, thrillers, animation and ads that hold attention" — or your own phrasing)
- **Cinematic AI Filmmaking** is now listed as a service (section, no card grid), since you mentioned it under "services/resume" rather than asking for a card section like illustration and web development. If it's really its own body of video work, it can become an 8th portfolio track with its own color and cards, exactly like the others — just say the word
- Your job links, whenever you have them — for videos, send the YouTube link + client name by category; for illustration/web dev, send an image (or screenshot of the site) plus a live link if there is one — and I'll slot them straight into `works.json`
- Your founder photo — attach it directly and I'll wire it into the About section
- Whether you want a contact form in addition to email/WhatsApp, or keep it link-only

Hand these files to Antigravity and it has everything needed to scaffold the real project.
