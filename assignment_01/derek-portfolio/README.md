# Professional Portfolio — Single-Page Site with AI Agent

A responsive, single-page portfolio built for partners, employers and headhunters.
No framework, no build step, no dependencies — deployable to Vercel as-is.

---

## Quick start

```powershell
# Option A — built-in preview server (no Node, no Python, no install)
powershell -ExecutionPolicy Bypass -File .\preview.ps1
# then open http://localhost:5173/
```

```powershell
# Option B — just open the file
start index.html
```

```bash
# Option C — if you do have Node
npx serve .
```

> Asset paths are relative, so `index.html` opens correctly straight from disk
> *and* on Vercel. A local server is still worth using if you want the same
> origin behaviour as production.

---

## What's included

| Area | Details |
|---|---|
| **Layout** | Sticky glass nav that hides on scroll-down, animated active-link pill, mobile drawer with circular clip-path reveal, scroll progress bar |
| **Hero** | Animated aurora blobs, masked grid, typewriter role rotation, count-up stats, 3D-tilt card with cursor-tracked border glow, magnetic buttons |
| **Navigation** | Smooth scroll, scroll-spy, `⌘/Ctrl + K` command palette, back-to-top |
| **Sections** | `#about` · `#experience` (timeline, education, certifications, volunteering) · `#work` · `#skills` · `#praise` · `#contact` — backgrounds alternate, eyebrows are numbered 01–06 |
| **Motion** | `IntersectionObserver` reveals with stagger, cursor spotlight, hover physics — all disabled under `prefers-reduced-motion` |
| **AI agent** | Floating launcher + chat panel, streamed typewriter answers, suggestion chips, offline by default |
| **Theming** | Dark/light with `prefers-color-scheme` default and `localStorage` persistence |
| **A11y** | Skip link, focus-visible rings, ARIA roles on the agent log / carousel / palette, keyboard-operable throughout, print stylesheet |

---

## Project structure

```
derek-portfolio/
├── index.html              # markup + content placeholders
├── preview.ps1             # zero-dependency local preview server
├── vercel.json             # caching + security headers
├── README.md
├── api/
│   └── chat.js.example     # optional serverless LLM proxy (see below)
└── assets/
    ├── favicon.svg
    ├── css/styles.css      # design system + components
    └── js/
        ├── data.js         # ← ALL CONTENT LIVES HERE
        ├── main.js         # rendering + interactions
        └── agent.js        # the AI agent
```

---

## Editing your content

**`assets/js/data.js` is the only file you need to touch.** It drives both the
page and the AI agent's knowledge, so they can never drift apart.

1. Open `assets/js/data.js`.
2. Set `meta.placeholder: true` while editing if you want the reminder banner.
3. Everything else is plain object literals — edit in place and reload.

### Content checklist

- [x] `meta.name`, `meta.headline`, `meta.location`, `meta.email` — done
- [x] `about.paragraphs[]`, `experience[]`, `projects[]`, `skills[]`, `certifications[]` — done
- [x] `testimonials[]` — 4 real LinkedIn recommendations, with `context` showing the working relationship
- [x] `education[]` — 4 entries; the in-progress M.S. is flagged `inProgress: true` for the accent treatment
- [x] `volunteering[]` — DataKind work, rendered after the career timeline
- [x] `endorsements[]` — top LinkedIn endorsement counts
- [x] `meta.placeholder: false` — demo banner cleared
- [ ] `meta.availability` + `hero.eyebrow` — currently the same default wording; update if your situation changes
- [ ] `meta.resumeUrl` — optional; drop a PDF in `/assets/` and point at it
- [ ] `certifications[]` — PMP/CSPO/CSM lapsed in 2023 per your export; decide whether to note that
- [ ] `index.html` — set your real domain in `og:url` and `canonical` after deploying

> **On the testimonial quotes:** they're trimmed to the most substantive
> sentences to keep the carousel readable. Sentence order is preserved and
> nothing is reworded beyond fixing typos (`curios`, a duplicated `with with`,
> `lead` → `led`). The full originals are on LinkedIn.

### Data shapes

```js
stats:        { value, prefix?, suffix?, decimals?, label }
skills:       { name, items: ["chip text", …] }      // items are plain strings
projects:     { title, tagline, description, tech[], link, metrics[{ label, value }] }
experience:   { role, company, location, start, end, achievements[], tech[] }
education:    { school, focus, years, inProgress? }  // inProgress gets the accent treatment
testimonials: { quote, author, title, context }      // context = "Reported to Derek directly · 2019"
volunteering: { role, org, dates, summary, points[], tech[], link }
endorsements: { skill, count }                       // verbatim LinkedIn counts
```

---

## The AI agent

Configured under `PROFILE.agent` in `data.js`.

### Mode 1 — `"local"` (default)

Runs entirely in the browser. Zero cost, zero latency, no API key, works on any
static host. Each entry in `agent.kb[]` is scored against the visitor's question
using weighted keyword matching:

- multi-word phrases score higher than single tokens
- `agent.fallback` handles anything unmatched
- answers can be a string, or a function receiving `PROFILE` so they stay in
  sync with the rest of the site

```js
kb: [
  {
    id: "availability",
    keywords: ["available", "hiring", "open to", "notice", "recruit"],
    answer: ({ meta }) => `He's ${meta.availability}.`,
  },
]
```

Tune the agent by editing `keywords` — that's the whole tuning surface.

### Mode 2 — `"api"` (live LLM)

Set:

```js
agent: { mode: "api", endpoint: "/api/chat", model: "gpt-4o-mini" }
```

Then expose an endpoint that:
1. accepts `POST` with `{ messages, model, question }`,
2. streams back either **SSE** (`data: {"delta":"…"}\n\n`, terminated by
   `data: [DONE]`) or a **plain text stream**.

The client handles both, plus a non-streaming `{ reply: "…" }` JSON response.
The agent auto-injects a system prompt built from your profile data, which keeps
the model from inventing employers or metrics.

Copy `api/chat.js.example` → `api/chat.js` for a working Vercel Function
scaffold, then set `OPENAI_API_KEY` in your Vercel project settings.

> **Never** put an API key in `assets/js/`. Anything in the browser is public.
> The serverless proxy exists precisely to keep it server-side.

---

## Wiring the contact form

Out of the box the form validates client-side and hands off to the visitor's
mail client via `mailto:`. That's the zero-infrastructure option.

To capture submissions instead, replace the `setTimeout(...)` block in
`initContact()` (`assets/js/main.js`) with a `fetch` to your provider:

```js
await fetch("https://formspree.io/f/YOUR_ID", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data),
});
setNote("Thanks — I'll be in touch shortly.", "ok");
```

Formspree, Basin, Web3Forms and a Vercel Function all work the same way.

---

## Deploying to Vercel

```bash
git init
git add .
git commit -m "Portfolio"
git remote add origin git@github.com:YOUR_USERNAME/portfolio.git
git push -u origin main
```

Then in Vercel: **Add New → Project → import the repo → Deploy**.

No build command, no output directory, no framework preset — it's static files.
`vercel.json` already sets long-lived caching for `/assets/*` and standard
security headers.

**After deploying, set your real domain in two places** in `index.html`:
`<meta property="og:url">` and `<link rel="canonical">`. Social previews and
search indexing both depend on those.

---

## Performance notes

- One CSS file, three small JS files, no libraries — nothing to download but
  your content and the Google Fonts stylesheet.
- Animations are limited to `transform` and `opacity` so they stay on the
  compositor.
- `IntersectionObserver` reveals unobserve themselves after firing.
- All motion collapses under `prefers-reduced-motion: reduce`.

If you want to drop the Google Fonts dependency, self-host the three families in
`assets/fonts/` and swap the `<link>` in `index.html` for `@font-face` rules.

---

## Header behaviour

The header auto-hides when you scroll down and slides back when you scroll up.
To keep it permanently visible instead, set this near the top of the
navigation section in `assets/js/main.js`:

```js
const HIDE_HEADER_ON_SCROLL = false;
```

The other knobs live in the same place:

| Constant | Default | Meaning |
|---|---|---|
| `HIDE_AFTER` | `200` | Never auto-hide above this scroll position |
| `SHOW_AT_TOP` | `80` | Always visible within this many px of the top |
| `JITTER` | `6` | Movements smaller than this accumulate before a decision |

> **Why the accumulate step matters:** the decision compares against the last
> position where a decision was *made*, not the previous animation frame. With a
> trackpad, per-frame deltas are 1–3px — comparing frame-to-frame leaves a dead
> zone where slow scrolling neither hides nor reveals the header, and it feels
> stuck. Don't "simplify" this back to a frame delta.

## Keyboard shortcuts

| Key | Action |
|---|---|
| `⌘/Ctrl + K` | Open the command palette |
| `/` | Focus the AI agent |
| `Esc` | Close the agent, drawer, or palette |
| `↑` `↓` `Enter` | Navigate the command palette |
| `←` `→` | Move between testimonials |
