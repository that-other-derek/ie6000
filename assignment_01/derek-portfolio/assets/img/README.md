# Image assets

Two photographs. The site picks them up automatically as colour-toned
background plates — no markup change needed to swap the artwork.

| Filename | Which image | Where it appears |
|---|---|---|
| `gallery.webp` | The gallery shot — you in front of the starburst chandelier | Hero (framed on your face, beside the stats card) and IntelliMake Journal (the museum ceiling, as a band along the top) |
| `headshot.webp` | The headshot cut-out (transparent background) | About (portrait above the highlight cards) and Contact (head above the panel's heading) |

Swapping in a different photo with the same name is all that's required — the
cropping is expressed as custom properties on each `.garnish--*` rule, so
retuning for a differently-framed shot means editing numbers in
`assets/css/styles.css`, not rewriting anything.

---

## How the treatment works

Each plate is pushed through a **tritone ramp** — the inline SVG filters in
`index.html`. An `feColorMatrix` collapses the photo to luminance, then an
`feComponentTransfer` remaps each channel from that luminance onto a five-stop
ramp in the brand palette: indigo shadows, violet midtones, blue and teal
highlights. The photograph ends up sharing the page's palette instead of
sitting on top of it.

Two things about why it's built this way:

- **SVG filter, not `grayscale() + sepia()/hue-rotate()`.** The CSS filter
  route can only ever produce one hue pair, and it crushes skin tones badly
  enough that the portrait has to be kept at near-invisible opacity to look
  acceptable.
- **SVG filter, not a gradient overlay with a blend mode.** An overlay has no
  alpha, so over the cut-out it paints a rectangle behind the figure. Remapping
  channels leaves alpha untouched, so a transparent cut-out stays transparent.

There are two ramps because the themes need opposite behaviour:

| Theme | Blend | Ramp | Effect |
|---|---|---|---|
| `dark` | `screen` on the photos, `normal` on the cut-outs | `#ds-tritone-dark` — shadows near-black, highlights teal | The photo's darks drop into the page and only its lit structure glows |
| `light` | `multiply` everywhere | `#ds-tritone-light` — indigo shadows, highlight end near-white | Ink on paper: whites stay white, the tint carries the image |

`screen` on a cut-out would blow the highlights into a white blob, which is why
those get `normal`.

---

## Tuning

Every knob is one custom property, all declared together on `.garnish` in
`styles.css`:

```css
.garnish {
  --plate-opacity: .34;   /* overall strength */
  --plate-boost: 1;       /* per-theme multiplier on the above */
  --plate-blend: screen;  /* screen = shadows drop out; normal = figure */
  --plate-bright: 1;      /* tonal trims, applied *before* the ramp */
  --plate-contrast: 1;
  --plate-scale: 1.04;
  --plate-size: cover;    /* background-size */
  --plate-pos: 50% 42%;   /* background-position */
  --plate-origin: 50% 42%;
  --plate-mask: radial-gradient(...);   /* where it fades out */
}
```

Per-instance overrides sit on `.garnish--hero`, `.garnish--about`,
`.garnish--journal` and `.garnish--contact`; mobile overrides are in the
`max-width: 900px` block at the end of the same section.

Quick reference:

- **Too strong / too faint** → `--plate-opacity` on that instance.
- **Want a different part of the photo** → `--plate-pos`. With
  `--plate-size: cover` in a box narrower than the photo, `0%` / `100%` pins
  the window to the left / right edge of the source. The hero uses `60%` there
  to put the face (measured off the file at 54% across) in the middle of the
  window; the chandelier is at 22%, so `0%` frames that instead.
- **Want an exact window** (the IntelliMake Journal band) → set `--plate-size` to
  something like `135% auto`, then `--plate-pos` picks the window directly.
- **Portrait vanishing on a dark background** → raise `--plate-bright`. This
  lifts the midtones into the ramp's violet range before the ramp is applied.
  It's why Contact runs at `1.6` while About runs at `1`.
- **Hard or soft edges** → `--plate-mask`.

### The Contact plate is sized off the panel's padding

Contact is the one plate that has to share space with big type, so it doesn't
use a percentage of its box:

```css
.contact__panel { --contact-top: clamp(46px, 6vw, 72px); }        /* its top padding */
.garnish--contact { --plate-size: auto calc(var(--contact-top) * 5.8); }   /* ~1.28× in head height */
```

The panel's clear band above the copy is roughly `top padding + 35px`, and the
head is about `1.28 ×` the padding, so the face always clears the section title
whatever the viewport. Measure before changing the multiplier — at `1.18×`
the image used to fill the panel and around 29% of the face sat behind
"Let's build something solid."

Below 900px the panel is much taller, so the same approach is applied with a
smaller multiplier (`3.4`) and the plate is pinned to the top-right instead.

## Notes

- `headshot.webp` must keep its alpha channel. A version flattened onto white
  will composite as a white rectangle under the `normal` blend.
- The plates are decorative and `aria-hidden`; they never carry meaning.
- Below 900px every section is one column, so the About plate is dropped and
  the rest move to the top or bottom of their section, at reduced opacity —
  each one still sized so its subject clears the copy.

## Adding more

```html
<span class="garnish garnish--photo" data-src="assets/img/yourfile.webp" aria-hidden="true"></span>
```

Add `garnish--cutout` instead of `garnish--photo` if the image has a
transparent background (that switches the blend and drops the scanline
overlay). Put it **inside** the section, as its first child, then write a
`.garnish--yourname` rule for its geometry. Sections that host a plate get
`overflow: clip` automatically via `.section:has(> .garnish)`.
