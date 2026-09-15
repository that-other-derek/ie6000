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
| **Sections** | `#about` · `#experience` (timeline, education, certifications, volunteering) · `#work` · `#journal` (IntelliMake Journal) · `#skills` · `#praise` · `#contact` — backgrounds alternate, eyebrows are numbered 01–07 |
| **Motion** | `IntersectionObserver` reveals with stagger, cursor spotlight, hover physics — all disabled under `prefers-reduced-motion` |
| **Photography** | The gallery shot and the headshot cut-out as tritone-mapped background plates across Hero, About, IntelliMake Journal and Contact — the hero and Contact framed on the face, full-bleed on the dark theme and an indigo wash on the light one |
| **Contact** | Validated form that opens the message in a webmail service of the visitor's choosing (Gmail, Outlook, Yahoo, Proton, copy) — never `mailto:`, so no desktop mail client is required |
| **AI agent** | Floating launcher + chat panel, streamed typewriter answers, suggestion chips, offline by default — keyword knowledge base with alias expansion, stemming and typo tolerance, and a scoped answer when a question misses instead of a flat refusal |
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

## The photography

Two images in `assets/img/` are used as colour-toned background plates rather
than as pictures:

| Image | Hero | About | IntelliMake Journal | Contact |
|---|---|---|---|---|
| `gallery.webp` | your face, beside the glass stats card | | the museum ceiling, as a band along the top | |
| `headshot.webp` | | portrait above the highlight cards | | behind the panel's heading column |

Each plate runs through a **tritone ramp** — an inline SVG filter in
`index.html` that remaps the photograph's luminance onto the brand gradient, so
indigo shadows run through violet and blue into teal highlights. It's an SVG
filter rather than the usual `grayscale() + sepia()` (which can only produce
one hue pair and crushes skin tones) or a gradient overlay (which has no alpha,
and would therefore paint a rectangle behind the headshot cut-out).

Dark and light themes get opposite ramps and opposite blend modes, because a
treatment that makes a photo glow out of a black page erases it on a white one.
The hero plate also tracks the cursor by a few pixels, which is what makes it
read as a layer behind the glass card rather than as wallpaper.

**All the tuning knobs, and how to swap the artwork,** are documented in
[`assets/img/README.md`](assets/img/README.md). The short version: change
`--plate-opacity`, `--plate-pos` or `--plate-bright` on the relevant
`.garnish--*` rule in `styles.css`.

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
the model from inventing employers or metrics. That digest
(`profileDigest()` in `agent.js`) carries the *whole* profile — experience,
education, certifications, the IntelliMake Journal entries, volunteering,
testimonials — and
ends with the local knowledge base's own answers, so the two modes can't
disagree about a fact.

Copy `api/chat.js.example` → `api/chat.js` for a working Vercel Function
scaffold, then set `OPENAI_API_KEY` in your Vercel project settings.

> **Never** put an API key in `assets/js/`. Anything in the browser is public.
> The serverless proxy exists precisely to keep it server-side.

### Teaching it new things

The local mode is a keyword-scored knowledge base, and it's worth knowing how it
reads a question, because that's what decides whether an answer lands.

Each entry looks like this:

```js
{
  id: "study",
  label: "What he's studying at Wayne State",   // shown when a question misses
  sample: "What's he studying at Wayne State?", // offered as a follow-up
  keywords: ["wayne state", "wsu", "masters", "capstone", "intellimake", …],
  also: ["does he go to university"],           // lower-weighted, looser matches
  answer: ({ education, journal }) => `…`,
}
```

Three things happen to the visitor's question before it's scored:

1. **Normalisation** — lowercased, fancy dashes and quotes unified, punctuation
   that carries no meaning dropped.
2. **Alias expansion** (`agent.aliases`) — `[what they typed, extra terms to also
   search for]`. This is what makes "what does Derek do at WSU" work: the
   knowledge base says "Wayne State University" and the visitor said "WSU", so
   the alias supplies the missing terms. Keep entries targeted; a broad alias
   makes several entries match at once and the wrong one can win.
3. **Stemming** — `studying`, `study` and `studied` collapse to one token, so a
   single keyword catches every phrasing.

A one-edit typo is forgiven against the knowledge base's own vocabulary
("wayn state", "intellmake"). When nothing matches well, the agent says so once
and then lists what it *can* cover, generated from the `label`s — and when
several entries run close together it offers them as a menu rather than
guessing. Both beats are the difference between narrow and dim.

**If a question that should work doesn't**, the fix is almost always a keyword
or an alias, not a prompt. Add the term the visitor actually types.

---

## Wiring the contact form

Out of the box the form validates client-side and then hands the finished
message to a **webmail compose link**, which the visitor picks from a chooser.
Capturing submissions needs a provider; until you add one, this is the
zero-infrastructure option that actually works.

### Why not `mailto:`

`mailto:` is the obvious choice on a static site and it's the wrong one. It only
works when a desktop mail client is configured. On a machine without one — or
with webmail only, which is most people now — Windows intercepts the protocol
and offers the app store instead of a composer, so the message is never sent and
the visitor sees a shop. That is the exact failure this avoids.

Instead the visitor picks the service they use and `initMailer()`
(`assets/js/main.js`) builds that service's own compose URL, with the whole
message in the query string. Nothing is sent until they press send over there,
and no mail client is involved at any point. The provider list is one array:

```js
const MAIL_PROVIDERS = [
  { id: "gmail",   label: "Gmail",   url: ({ to, subject, body }) => `https://mail.google.com/mail/?view=cm&fs=1&…` },
  { id: "outlook", label: "Outlook / Microsoft 365", url: … },
  // + Outlook.com, Yahoo, Proton, "Copy the message", "Use my default mail app"
];
```

Add or change a service by editing that array — it also feeds the chooser's
buttons. The last real service a visitor used is remembered in
`localStorage["pf-mailer"]` and marked "Last used" next time. `mailto:` is still
there as an explicit *choice* ("Use my default mail app"), so a visitor with a
client can deliberately use it — but nobody is pushed into the OS prompt.

Every `mailto:` link on the page is intercepted and routed through the same
chooser, so the address in the contact list, the footer icons and the agent's
replies don't fall back into the same trap.

To capture submissions instead, replace the `mailer.open(...)` call in
`initContact()` with a `fetch` to your provider:

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
- The two photographs (~180 KB together) are fetched lazily by
  `IntersectionObserver` as their section approaches the viewport, on a
  400 px margin, and skipped entirely when the browser reports `Save-Data`.
- Animations are limited to `transform` and `opacity` so they stay on the
  compositor. The hero plate's cursor parallax is transform-only, driven by a
  `requestAnimationFrame` gate, and disabled for coarse pointers.
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

### Anchor jumps hold the header open

Auto-hide is suppressed for the whole duration of a programmatic scroll (a nav
link, a palette result, back-to-top) so the header can't vanish mid-flight.

The hold is released when **scrolling stops**, not after a fixed timeout: a
debounced 160 ms settle timer is re-armed on every scroll event while held, and
Chrome's `scrollend` releases it exactly. A fixed timeout has to be guessed from
the distance to the target, so any section further away than the guess finishes
scrolling *after* the hold has expired — and since the rest of that journey is
downwards, the header stays hidden and the menu never comes back. Releasing on
scroll-settled is distance-independent, so adding a longer section can't break
it. `lastY` resyncs on release, so there's no stale delta to trip over.

### Navigation bands

`IntelliMake Journal` is a long label, and the six of them need ~1021px of
content at full size and ~881px tightened. The nav steps down in measured bands
rather than letting flex find that space — squeezing takes the room out of the
wordmark, which then wraps to two lines inside a 72px header:

| Viewport | Behaviour |
|---|---|
| ≥ 1161px | Full size — six links, `⌘K` badge, "Hire me" |
| 1001–1160px | Tightened — smaller gaps/padding/font, `⌘K` badge dropped |
| ≤ 1000px | Handover to the drawer — links, `⌘K` badge and "Hire me" hidden, hamburger shown |

`white-space: nowrap` on `.brand__text strong` and `.nav__links a` is what makes
a future overflow *visible* instead of silently squashing the header. If you add
a seventh section, re-measure: don't assume the bands still fit.

## Keyboard shortcuts

| Key | Action |
|---|---|
| `⌘/Ctrl + K` | Open the command palette |
| `/` | Focus the AI agent |
| `Esc` | Close the agent, drawer, or palette |
| `↑` `↓` `Enter` | Navigate the command palette |
| `←` `→` | Move between testimonials |
