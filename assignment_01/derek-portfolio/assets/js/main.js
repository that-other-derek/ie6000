/* =============================================================================
   main.js — renders content from PROFILE and wires every interaction.
   Vanilla ES2020. No dependencies. No build step.
   ========================================================================== */
(() => {
  "use strict";

  const P = window.PROFILE;
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer  = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const clamp = (n, min, max) => Math.min(max, Math.max(min, n));

  /* ---------------------------------------------------------------- icons */
  const ICONS = {
    linkedin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm6 0h3.8v1.7h.05a4.2 4.2 0 0 1 3.75-2.06c4 0 4.4 2.5 4.4 5.8V21h-4v-5.6c0-1.34-.03-3.06-1.9-3.06-1.9 0-2.2 1.45-2.2 2.96V21H9V9Z"/></svg>',
    github: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.1-1.47-1.1-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.11-.25-.45-1.27.1-2.65 0 0 .83-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm1.6 2 7.4 5.4L19.4 7H4.6ZM20 8.9l-7.4 5.4a1 1 0 0 1-1.2 0L4 8.9V17h16V8.9Z"/></svg>',
    target: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 2a8 8 0 1 1 0 16 8 8 0 0 1 0-16Zm0 3.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9Zm0 2a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z"/></svg>',
    layers: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 9 4.5-9 4.5-9-4.5L12 3Zm0 2.24L6.6 7.5 12 9.76l5.4-2.26L12 5.24ZM3 12l9 4.5 9-4.5v2.4l-9 4.5-9-4.5V12Z"/></svg>',
    users: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0-2a2 2 0 1 1 0-4 2 2 0 0 1 0 4Zm7 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm0-2a1 1 0 1 1 0-2 1 1 0 0 1 0 2ZM2 20a7 7 0 0 1 14 0h-2a5 5 0 0 0-10 0H2Zm13.5 0h-2a5.5 5.5 0 0 0-1.2-3.43c.55-.2 1.13-.32 1.7-.36A5.6 5.6 0 0 1 21.5 20h-2a3.6 3.6 0 0 0-4-3.55Z"/></svg>',
    zap: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z"/></svg>',
    cap: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 1 8l11 5 9-4.1V16h2V8L12 3ZM5 12.4V16c0 1.9 3.1 3.5 7 3.5s7-1.6 7-3.5v-3.6l-7 3.2-7-3.2Z"/></svg>',
    external: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 3h7v7h-2V6.4l-8.3 8.3-1.4-1.4L17.6 5H14V3ZM5 5h5v2H7v10h10v-3h2v5H5V5Z"/></svg>',
    code: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9.4 16.6-4.6-4.6 4.6-4.6L8 6 2 12l6 6 1.4-1.4Zm5.2 0 4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4Z"/></svg>',
    pin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z"/></svg>',
    check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9.6 16.2 5.4 12l-1.4 1.4 5.6 5.6L20.4 8 19 6.6l-9.4 9.6Z"/></svg>',
    home: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 2 11h3v9h6v-6h2v6h6v-9h3L12 3Z"/></svg>',
    sun: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 17a5 5 0 1 1 0-10 5 5 0 0 1 0 10Zm0-13.5h1v2.3h-2v-2.3h1ZM11 18.2h2v2.3h-2v-2.3ZM3.6 11h2.3v2H3.6v-2Zm14.5 0h2.3v2h-2.3v-2ZM6.1 4.7l1.6 1.6-1.4 1.4-1.6-1.6 1.4-1.4Zm11.8 11.8 1.6 1.6-1.4 1.4-1.6-1.6 1.4-1.4Zm0-11.8 1.4 1.4-1.6 1.6-1.4-1.4 1.6-1.6ZM6.1 16.5l1.4 1.4-1.6 1.6-1.4-1.4 1.6-1.6Z"/></svg>',
    sparkle: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l1.8 5.2L19 9l-5.2 1.8L12 16l-1.8-5.2L5 9l5.2-1.8L12 2Zm6 12 .9 2.6 2.6.9-2.6.9-.9 2.6-.9-2.6-2.6-.9 2.6-.9L18 14Z"/></svg>',
  };

  /* ============================ 1. STATIC CONTENT ======================== */
  function renderStatic() {
    const { meta, hero, about, experience, projects, skills, marquee, education,
            certifications, testimonials, socials, stats, volunteering,
            endorsements, journal } = P;

    document.title = meta.siteTitle;
    const desc = $('meta[name="description"]');
    if (desc) desc.setAttribute("content", meta.siteDescription);
    const og = $('meta[property="og:title"]');
    if (og) og.setAttribute("content", meta.siteTitle);

    // Branding
    ["#brandMark", "#heroAvatar", "#footMark"].forEach((s) => { const el = $(s); if (el) el.textContent = meta.initials; });
    ["#brandName", "#cardName", "#footName"].forEach((s) => { const el = $(s); if (el) el.textContent = meta.name; });
    $("#brandHeadline").textContent = meta.shortHeadline || meta.headline;
    $("#cardRole").textContent = meta.headline;
    $("#footRole").textContent = meta.headline;
    $("#heroName").textContent = meta.name;
    $("#heroSummary").textContent = hero.summary;
    $("#heroEyebrow").textContent = hero.eyebrow;
    $("#cardAvailability").textContent = meta.availability;

    // Hero CTAs
    const prim = $("#heroPrimary");
    prim.href = hero.primaryCta.href;
    $("span", prim).textContent = hero.primaryCta.label;

    if (meta.resumeUrl) {
      const r = $("#heroResume");
      r.href = meta.resumeUrl;
      r.hidden = false;
    }

    // Stats
    $("#heroStats").innerHTML = stats.map((s) => {
      const prefix = s.prefix || "";
      return `
      <div class="hstat">
        <strong data-count="${s.value}" data-prefix="${esc(prefix)}" data-suffix="${esc(s.suffix)}"
                data-decimals="${s.decimals || 0}">${esc(prefix)}0${esc(s.suffix)}</strong>
        <span>${esc(s.label)}</span>
      </div>`;
    }).join("");

    // Socials (three places)
    const socialHTML = socials.map((s) =>
      `<a class="social" href="${esc(s.url)}" target="_blank" rel="noopener noreferrer"
          aria-label="${esc(s.label)}" title="${esc(s.label)}">${ICONS[s.icon] || ICONS.external}</a>`).join("");
    ["#heroSocials", "#drawerSocials", "#footSocials"].forEach((s) => { const el = $(s); if (el) el.innerHTML = socialHTML; });

    // About
    $("#aboutHeading").textContent = about.heading;
    $("#aboutBody").innerHTML = about.paragraphs.map((p) => `<p>${esc(p)}</p>`).join("");
    $("#aboutHighlights").innerHTML = about.highlights.map((h, i) => `
      <article class="highlight reveal" data-reveal style="--d:${i * 70}ms">
        <span class="highlight__icon">${ICONS[h.icon] || ICONS.sparkle}</span>
        <strong>${esc(h.title)}</strong>
        <p>${esc(h.text)}</p>
      </article>`).join("");

    // Timeline
    $("#timeline").insertAdjacentHTML("beforeend", experience.map((job, i) => {
      const current = /present|current|now/i.test(job.end);
      return `
      <article class="job reveal${current ? " is-current" : ""}" data-reveal style="--d:${i * 80}ms">
        <div class="job__head">
          <h4 class="job__role">${esc(job.role)}</h4>
          <span class="job__company">${esc(job.company)}</span>
          <span class="job__when">${esc(job.start)} — ${esc(job.end)}${job.location ? ` · ${esc(job.location)}` : ""}</span>
        </div>
        <p class="job__summary">${esc(job.summary)}</p>
        ${job.achievements?.length ? `<ul class="job__list">${job.achievements.map((a) => `<li>${esc(a)}</li>`).join("")}</ul>` : ""}
        ${job.tech?.length ? `<div class="tags">${job.tech.map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>` : ""}
      </article>`;
    }).join(""));

    // Education — in-progress degrees get the same accent as current roles.
    $("#eduRow").innerHTML = (education || []).map((e) => `
      <div class="edu${e.inProgress ? " is-current" : ""}">
        <span class="edu__icon">${ICONS.cap}</span>
        <div>
          <strong>${esc(e.school)}</strong>
          <span class="edu__meta">${esc(e.focus)}</span>
          <em class="edu__when">${esc(e.years)}</em>
        </div>
      </div>`).join("");

    // Certifications
    $("#certRow").innerHTML = (certifications || []).map((c) => `
      <div class="edu">
        <span class="edu__icon">${ICONS.check}</span>
        <div>
          <strong>${esc(c.name)}</strong>
          <span class="edu__meta">${esc(c.issuer)}</span>
          <em class="edu__when">${esc(c.year)}</em>
        </div>
      </div>`).join("");

    // Volunteering
    $("#volGrid").innerHTML = (volunteering || []).map((v, i) => `
      <article class="vol reveal" data-reveal style="--d:${i * 80}ms">
        <div class="vol__head">
          <span class="vol__icon">${ICONS.users}</span>
          <div>
            <strong>${esc(v.role)}</strong>
            <span>${esc(v.org)} · ${esc(v.dates)}</span>
          </div>
        </div>
        <p class="vol__summary">${esc(v.summary)}</p>
        <ul class="vol__list">${(v.points || []).map((p) => `<li>${esc(p)}</li>`).join("")}</ul>
        <div class="vol__foot">
          <div class="tags">${(v.tech || []).map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>
          ${v.link ? `<a class="card__link" href="${esc(v.link)}" target="_blank" rel="noopener noreferrer">${ICONS.external}Demo</a>` : ""}
        </div>
      </article>`).join("");

    // Peer endorsements — verbatim counts, no interpretation.
    $("#endorseStrip").innerHTML = (endorsements || []).length ? `
      <span class="endorse__label">Endorsed by colleagues on LinkedIn</span>
      <div class="endorse__pills">
        ${endorsements.map((e) => `<span class="endorse__pill">${esc(e.skill)} <b>${e.count}</b></span>`).join("")}
      </div>` : "";

    // Journal — the newest entry (index 0) gets the "Latest" badge.
    if (journal) {
      // The section's name lives in data.js and is applied here, so renaming it
      // never means hunting for hard-coded strings in the markup.
      if (journal.name) {
        ["#navJournal", "#drawerJournal", "#journalEyebrowName"].forEach((s) => {
          const el = $(s);
          if (el) el.textContent = journal.name;
        });
      }
      $("#journalLede").textContent = journal.lede;
      $("#journalList").innerHTML = journal.entries.map((e, i) => `
        <article class="journal-entry reveal" data-reveal style="--d:${i * 70}ms">
          <div class="journal-entry__meta">
            <span class="journal-entry__date">${esc(e.date)}</span>
            <span class="journal-entry__tag">${esc(e.tag)}</span>
            ${i === 0 ? '<span class="journal-entry__latest">Latest</span>' : ""}
          </div>
          <div class="journal-entry__body">
            <h3 class="journal-entry__title">${esc(e.title)}</h3>
            ${e.body.map((p) => `<p>${esc(p)}</p>`).join("")}
            ${e.link ? `<a class="journal-entry__link" href="${esc(e.link.url)}" target="_blank" rel="noopener noreferrer">${esc(e.link.label)}${ICONS.external}</a>` : ""}
          </div>
        </article>`).join("");
    }

    // Projects
    $("#projectCards").innerHTML = projects.map((p, i) => `
      <article class="card reveal" data-reveal data-tilt style="--d:${i * 90}ms">
        <span class="card__glow" aria-hidden="true"></span>
        <span class="card__index">${String(i + 1).padStart(2, "0")}</span>
        <h3 class="card__title">${esc(p.title)}</h3>
        <p class="card__tagline">${esc(p.tagline)}</p>
        <p class="card__desc">${esc(p.description)}</p>
        ${p.metrics?.length ? `<div class="card__metrics">${p.metrics.map((m) => `
          <div class="card__metric"><strong>${esc(m.value)}</strong><span>${esc(m.label)}</span></div>`).join("")}</div>` : ""}
        <div class="card__foot">
          <div class="tags">${(p.tech || []).map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>
          <div class="card__links">
            ${p.link && p.link !== "#" ? `<a class="card__link" href="${esc(p.link)}" target="_blank" rel="noopener noreferrer">${ICONS.external}Live</a>` : ""}
            ${p.repo && p.repo !== "#" ? `<a class="card__link" href="${esc(p.repo)}" target="_blank" rel="noopener noreferrer">${ICONS.github}Code</a>` : ""}
          </div>
        </div>
      </article>`).join("");

    // Skills — grouped capability chips
    $("#skillsGrid").innerHTML = skills.map((g) => `
      <div class="skill-group reveal" data-reveal>
        <h3>${esc(g.name)}</h3>
        <div class="skill-chips">
          ${g.items.map((s, i) => `<span class="skill-chip" style="--i:${i}">${esc(s)}</span>`).join("")}
        </div>
      </div>`).join("");

    // Marquee — duplicated for a seamless loop
    const items = marquee.map((m) => `<span class="marquee__item">${esc(m)}</span>`).join("");
    $("#marqueeTrack").innerHTML = items + items;

    // Testimonials
    // Word-initials ("Desislava Dimitrova" → DD, not DE).
    const initialsOf = (name) =>
      (name || "?").split(/\s+/).filter(Boolean).slice(0, 2)
        .map((w) => w[0]).join("").toUpperCase() || "?";

    $("#quotesTrack").innerHTML = testimonials.map((t) => `
      <figure class="quote">
        <div class="quote__mark" aria-hidden="true">&ldquo;</div>
        <blockquote class="quote__text">${esc(t.quote)}</blockquote>
        <figcaption class="quote__author">
          <span class="quote__avatar" aria-hidden="true">${esc(initialsOf(t.author))}</span>
          <span class="quote__byline">
            <strong>${esc(t.author)}</strong>
            <span class="quote__role">${esc(t.title)}</span>
            ${t.context ? `<em class="quote__context">${esc(t.context)}</em>` : ""}
          </span>
        </figcaption>
      </figure>`).join("");
    $("#quoteDots").innerHTML = testimonials.map((_, i) =>
      `<button type="button" role="tab" aria-selected="${i === 0}" aria-label="Quote ${i + 1}"></button>`).join("");

    // Contact meta
    const rows = [
      { icon: "mail", html: `<a href="mailto:${esc(meta.email)}">${esc(meta.email)}</a>` },
      { icon: "pin", html: esc(meta.location) },
      { icon: "sparkle", html: esc(meta.availability) },
      ...socials.filter((s) => s.icon === "linkedin").map((s) => ({
        icon: "linkedin",
        html: `<a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, ""))}</a>`,
      })),
    ];
    $("#contactMeta").innerHTML = rows.map((r) =>
      `<li>${ICONS[r.icon]}<span>${r.html}</span></li>`).join("");

    // Year
    $("#year").textContent = `© ${new Date().getFullYear()} ${meta.name}`;

    // Placeholder banner.
    // Its height drives --banner-h, which offsets the fixed nav / progress bar /
    // scroll padding so nothing ever renders underneath the notice.
    const banner = $("#placeholderBanner");
    const syncBannerOffset = () => {
      const h = banner.hidden ? 0 : banner.offsetHeight;
      document.documentElement.style.setProperty("--banner-h", `${h}px`);
    };

    if (meta.placeholder && localStorage.getItem("pf-banner-dismissed") !== "1") {
      banner.hidden = false;
    }
    if (meta.placeholder) {
      console.warn("[portfolio] Demo content is active. Edit assets/js/data.js and set meta.placeholder = false.");
    }

    $("#bannerClose")?.addEventListener("click", () => {
      banner.hidden = true;
      localStorage.setItem("pf-banner-dismissed", "1");
      syncBannerOffset();
    });

    syncBannerOffset();
    addEventListener("resize", syncBannerOffset);
    // Webfonts can reflow the banner text, changing its height.
    document.fonts?.ready?.then(syncBannerOffset);
  }

  /* ============================== 2. THEME =============================== */
  function initTheme() {
    const root = document.documentElement;
    const stored = localStorage.getItem("pf-theme");
    const prefersLight = matchMedia("(prefers-color-scheme: light)").matches;
    root.dataset.theme = stored || (prefersLight ? "light" : "dark");

    $("#themeToggle").addEventListener("click", () => {
      const next = root.dataset.theme === "dark" ? "light" : "dark";
      root.dataset.theme = next;
      localStorage.setItem("pf-theme", next);
      syncThemeColor();
    });
    syncThemeColor();
  }
  function syncThemeColor() {
    const light = document.documentElement.dataset.theme === "light";
    const m = $('meta[name="theme-color"]');
    if (m) m.setAttribute("content", light ? "#f6f7fc" : "#08090f");
  }

  /* ============================ 3. NAVIGATION ============================ */
  // Set to false to keep the header permanently visible instead of auto-hiding.
  const HIDE_HEADER_ON_SCROLL = true;

  // How long the page has to go without a scroll event before a scroll is
  // treated as finished. Long enough to ride out a dropped frame on a heavy
  // page, short enough that the header re-arms the moment the page lands.
  const SCROLL_SETTLE_MS = 160;

  function initNav() {
    const nav = $("#nav");
    const links = $$(".nav__links a");
    const ink = $("#navInk");
    const HIDE_AFTER = 200;  // never auto-hide above this scroll position
    const SHOW_AT_TOP = 80;  // always visible within this many px of the top
    const JITTER = 6;        // movements smaller than this accumulate
    let lastY = scrollY;
    let ticking = false;
    let headerHeld = false;
    let settleTimer = null;

    /**
     * Keep the header on screen for the duration of a scroll the page started
     * itself — an anchor jump, "back to top" — plus a beat after it lands.
     *
     * The hold is released when scrolling *stops*, not after a fixed timeout.
     * A fixed timeout has to be guessed from how far away the target is, and
     * any target further than the guess finishes scrolling after the hold has
     * already expired: the header hides mid-flight, and because the rest of
     * the scroll is all downwards it never comes back. Tying the hold to the
     * scroll settling makes it independent of section positions, so it keeps
     * working as the page grows or the copy changes length.
     */
    function holdHeader() {
      headerHeld = true;
      nav.classList.remove("is-hidden");
      armSettleTimer();
    }
    function armSettleTimer() {
      clearTimeout(settleTimer);
      settleTimer = setTimeout(() => {
        headerHeld = false;
        lastY = scrollY;   // resync, so there's no stale delta when the hold lifts
      }, SCROLL_SETTLE_MS);
    }
    function releaseHeader() {
      if (!headerHeld) return;
      headerHeld = false;
      clearTimeout(settleTimer);
      lastY = scrollY;
    }

    // A nav link pointing at a missing id fails silently — the browser just does
    // nothing when clicked. Surface it rather than shipping a dead link.
    links.forEach((a) => {
      const target = a.getAttribute("href");
      if (target?.startsWith("#") && !$(target)) {
        console.warn(`[nav] No element matches "${target}" — that link will do nothing.`);
      }
    });

    function moveInk(active) {
      if (!active) { ink.classList.remove("is-on"); return; }
      ink.style.width = `${active.offsetWidth}px`;
      ink.style.transform = `translateX(${active.offsetLeft}px)`;
      ink.classList.add("is-on");
    }

    function update() {
      const y = scrollY;

      // Stuck state
      nav.classList.toggle("is-stuck", y > 20);

      // Auto-hide on scroll-down, reveal on scroll-up
      updateHeader(y);

      // Progress bar
      const max = document.documentElement.scrollHeight - innerHeight;
      $("#progressBar").style.width = `${max > 0 ? (y / max) * 100 : 0}%`;

      // Back-to-top
      $("#toTop").classList.toggle("is-on", y > 700);

      // Scroll spy
      const probe = y + innerHeight * 0.32;
      let current = null;
      links.forEach((a) => {
        const sec = $(a.getAttribute("href"));
        if (sec && sec.offsetTop <= probe) current = a;
      });
      links.forEach((a) => a.classList.toggle("is-active", a === current));
      moveInk(current);

      ticking = false;
    }

    /**
     * Decide whether the header should be showing.
     *
     * Compares against the last position where a decision was actually made,
     * so small trackpad movements accumulate. Comparing against the previous
     * *frame* instead leaves a dead zone — slow scrolling neither hides nor
     * reveals the header, which makes it feel stuck and unpredictable.
     */
    function updateHeader(y) {
      if (!HIDE_HEADER_ON_SCROLL) { nav.classList.remove("is-hidden"); lastY = y; return; }

      // A page-driven scroll is in flight: stay visible and keep pushing the
      // settle timer out, so the hold lasts exactly as long as the scrolling.
      if (headerHeld) { armSettleTimer(); nav.classList.remove("is-hidden"); lastY = y; return; }

      const delta = y - lastY;
      if (Math.abs(delta) < JITTER) return;   // too small — let it accumulate

      if (y <= SHOW_AT_TOP || delta < 0) nav.classList.remove("is-hidden");
      else if (y > HIDE_AFTER) nav.classList.add("is-hidden");

      lastY = y;
    }

    addEventListener("scroll", () => {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });

    // Chrome fires `scrollend` when a smooth scroll finishes. Lifting the hold
    // there rather than waiting out the settle timer keeps the release exact;
    // the timer stays as the fallback for browsers without the event.
    if ("onscrollend" in window) addEventListener("scrollend", releaseHeader);

    // Any other part of the page that starts a scroll on the user's behalf
    // (the command palette) asks for the hold through this event, so the
    // decision to keep the header up lives in exactly one place.
    addEventListener("nav:hold", holdHeader);

    addEventListener("resize", () => {
      const active = $(".nav__links a.is-active");
      if (active) moveInk(active);
    });

    update();
    $("#toTop").addEventListener("click", () => {
      holdHeader();
      scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });

    // Anchor jumps scroll smoothly — keep the header visible throughout.
    $$('a[href^="#"]').forEach((a) =>
      a.addEventListener("click", () => holdHeader()));

    // Drawer
    const drawer = $("#drawer");
    const burger = $("#hamburger");
    const toggleDrawer = (open) => {
      // Never leave the drawer open without its close button on screen.
      if (open) { nav.classList.remove("is-hidden"); holdHeader(); }
      drawer.classList.toggle("is-open", open);
      burger.setAttribute("aria-expanded", String(open));
      drawer.setAttribute("aria-hidden", String(!open));
      burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      document.body.classList.toggle("is-locked", open);
    };
    burger.addEventListener("click", () => toggleDrawer(burger.getAttribute("aria-expanded") !== "true"));
    $$(".drawer a").forEach((a) => a.addEventListener("click", () => toggleDrawer(false)));
    addEventListener("keydown", (e) => { if (e.key === "Escape") toggleDrawer(false); });
    // Matches the breakpoint where the inline links come back (see the
    // responsive block in styles.css) — above it the drawer must not linger.
    addEventListener("resize", () => { if (innerWidth > 1000) toggleDrawer(false); });
  }

  /* ============================ 4. REVEAL FX ============================= */
  function initReveal() {
    const els = $$("[data-reveal]");
    if (reduceMotion || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add("is-in");
        io.unobserve(e.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
    els.forEach((el) => io.observe(el));
  }

  /* ============================= 5. COUNTERS ============================= */
  function initCounters() {
    const els = $$("[data-count]");
    if (!els.length) return;
    const run = (el) => {
      const target = parseFloat(el.dataset.count);
      const prefix = el.dataset.prefix || "";
      const suffix = el.dataset.suffix || "";
      const decimals = parseInt(el.dataset.decimals || "0", 10);
      const paint = (n) => { el.textContent = prefix + n.toFixed(decimals) + suffix; };
      if (reduceMotion) { paint(target); return; }
      const dur = 1500;
      const start = performance.now();
      const step = (now) => {
        const t = clamp((now - start) / dur, 0, 1);
        const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
        paint(target * eased);
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { run(e.target); io.unobserve(e.target); } });
    }, { threshold: 0.4 });
    els.forEach((el) => io.observe(el));
  }

  /* ============================ 6. SKILL CHIPS =========================== */
  // Skill groups render as static chips. The per-chip stagger is pure CSS,
  // driven by the `.is-in` class that initReveal() adds to each .skill-group.

  /* ========================== 7. SCROLL-LINKED UX ======================== */
  function initScrollFx() {
    const fill = $("#timelineFill");
    const timeline = $("#timeline");
    const spotlight = $("#spotlight");

    const onScroll = () => {
      if (fill && timeline) {
        const r = timeline.getBoundingClientRect();
        const progress = clamp((innerHeight * 0.62 - r.top) / r.height, 0, 1);
        fill.style.height = `${progress * 100}%`;
      }
    };
    addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    if (finePointer) {
      document.body.classList.add("has-pointer");
      let raf = null;
      addEventListener("pointermove", (e) => {
        if (raf) return;
        raf = requestAnimationFrame(() => {
          spotlight.style.setProperty("--mx", `${e.clientX}px`);
          spotlight.style.setProperty("--my", `${e.clientY}px`);
          raf = null;
        });
      }, { passive: true });
    }
  }

  /* ======================= 8. TILT / GLOW / MAGNETIC ===================== */
  function initPointerFx() {
    if (!finePointer || reduceMotion) return;

    // 3D tilt + radial glow that tracks the cursor
    $$("[data-tilt]").forEach((card) => {
      const glow = $(".card__glow, .hero__card-glow", card);
      card.addEventListener("pointermove", (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        const max = card.classList.contains("hero__card") ? 5 : 7;
        card.style.transform =
          `perspective(900px) rotateX(${(0.5 - py) * max * 2}deg) rotateY(${(px - 0.5) * max * 2}deg) translateY(-3px)`;
        if (glow) {
          glow.style.setProperty("--gx", `${px * 100}%`);
          glow.style.setProperty("--gy", `${py * 100}%`);
        }
        if (card.classList.contains("card")) {
          card.style.setProperty("--gx", `${px * 100}%`);
          card.style.setProperty("--gy", `${py * 100}%`);
        }
      });
      card.addEventListener("pointerleave", () => { card.style.transform = ""; });
    });

    // Magnetic buttons
    $$(".magnetic").forEach((btn) => {
      btn.addEventListener("pointermove", (e) => {
        const r = btn.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
        const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
        btn.style.transform = `translate(${dx * 8}px, ${dy * 6}px) translateY(-2px)`;
      });
      btn.addEventListener("pointerleave", () => { btn.style.transform = ""; });
    });
  }

  /* ========================== 9. TESTIMONIALS =========================== */
  function initQuotes() {
    const track = $("#quotesTrack");
    const count = track.children.length;
    if (count < 2) { $("#quotes").querySelector(".quotes__controls").hidden = true; return; }

    let index = 0;
    let timer = null;
    const dots = $$("#quoteDots button");

    const go = (i) => {
      index = (i + count) % count;
      track.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((d, di) => d.setAttribute("aria-selected", String(di === index)));
    };
    const autoplay = () => {
      if (reduceMotion) return;
      clearInterval(timer);
      timer = setInterval(() => go(index + 1), 7000);
    };

    dots.forEach((d, i) => d.addEventListener("click", () => { go(i); autoplay(); }));
    $("#quotePrev").addEventListener("click", () => { go(index - 1); autoplay(); });
    $("#quoteNext").addEventListener("click", () => { go(index + 1); autoplay(); });

    const viewport = $(".quotes__viewport");
    viewport.addEventListener("mouseenter", () => clearInterval(timer));
    viewport.addEventListener("mouseleave", autoplay);
    viewport.addEventListener("focusin", () => clearInterval(timer));
    viewport.addEventListener("focusout", autoplay);

    // Touch swipe
    let x0 = null;
    viewport.addEventListener("touchstart", (e) => { x0 = e.touches[0].clientX; }, { passive: true });
    viewport.addEventListener("touchend", (e) => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 45) go(index + (dx < 0 ? 1 : -1));
      x0 = null;
      autoplay();
    });

    // Arrow keys when the carousel has focus
    $("#quotes").addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") { go(index - 1); autoplay(); }
      if (e.key === "ArrowRight") { go(index + 1); autoplay(); }
    });

    go(0);
    autoplay();
  }

  /* ============================= 10. HERO TYPE ========================== */
  function initTypedRole() {
    const el = $("#typedRole");
    const roles = P.hero.roles?.length ? P.hero.roles : [P.meta.headline];
    if (reduceMotion) { el.textContent = roles[0]; return; }

    let ri = 0, ci = 0, deleting = false;
    const tick = () => {
      const word = roles[ri];
      ci += deleting ? -1 : 1;
      el.textContent = word.slice(0, ci);

      let delay = deleting ? 45 : 78;
      if (!deleting && ci === word.length) { delay = 1700; deleting = true; }
      else if (deleting && ci === 0) { deleting = false; ri = (ri + 1) % roles.length; delay = 320; }
      setTimeout(tick, delay);
    };
    setTimeout(tick, 500);
  }

  /* ============================ 11. CONTACT ============================= */
  function initContact(mailer) {
    const form = $("#contactForm");
    const note = $("#formNote");
    const btn = $("#cfSubmit");

    const setNote = (msg, kind) => {
      note.textContent = msg;
      note.className = `contact__note${kind ? ` is-${kind}` : ""}`;
    };

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());
      let ok = true;

      $$(".field", form).forEach((f) => f.classList.remove("has-error"));
      if (!data.name?.trim()) { $("#cfName").closest(".field").classList.add("has-error"); ok = false; }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email || "")) { $("#cfEmail").closest(".field").classList.add("has-error"); ok = false; }
      if (!data.message?.trim() || data.message.trim().length < 10) { $("#cfMessage").closest(".field").classList.add("has-error"); ok = false; }

      if (!ok) { setNote("Please check the highlighted fields.", "err"); return; }

      btn.disabled = true;
      setNote("Choose where to send it…", "");

      // Static site: there is no server to post to, so the message is composed
      // in the visitor's own mail service (see initMailer). Nothing is sent
      // until they hit send there.
      const body = [
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        data.company ? `Company: ${data.company}` : null,
        "",
        data.message,
      ].filter(Boolean).join("\n");

      mailer.open(
        { to: P.meta.email, subject: `Website enquiry — ${data.name}`, body },
        () => {
          setNote("Your message is ready to send — I'll reply shortly.", "ok");
          btn.disabled = false;
          form.reset();
        }
      );
    });
  }

  /* ============================= 11b. SEND CHOOSER ====================== */
  /**
   * Compose the visitor's message in a webmail service instead of handing it to
   * `mailto:`.
   *
   * `mailto:` is the obvious choice on a static site, but it only works when a
   * desktop mail client is configured. On a machine with none — or with webmail
   * only, which is most people — the OS intercepts the protocol and offers an
   * app store instead of a composer, so the message silently never gets sent.
   *
   * These are the services' own documented compose endpoints. Everything in the
   * message goes in the query string, so nothing here needs a backend.
   */
  const MAIL_PROVIDERS = [
    {
      id: "gmail", label: "Gmail", initial: "G",
      url: ({ to, subject, body }) =>
        `https://mail.google.com/mail/?view=cm&fs=1&to=${enc(to)}&su=${enc(subject)}&body=${enc(body)}`,
    },
    {
      id: "outlook", label: "Outlook / Microsoft 365", initial: "O",
      url: ({ to, subject, body }) =>
        `https://outlook.office.com/mail/deeplink/compose?to=${enc(to)}&subject=${enc(subject)}&body=${enc(body)}`,
    },
    {
      id: "outlook-live", label: "Outlook.com", initial: "O",
      url: ({ to, subject, body }) =>
        `https://outlook.live.com/mail/0/deeplink/compose?to=${enc(to)}&subject=${enc(subject)}&body=${enc(body)}`,
    },
    {
      id: "yahoo", label: "Yahoo Mail", initial: "Y",
      url: ({ to, subject, body }) =>
        `https://compose.mail.yahoo.com/?to=${enc(to)}&subject=${enc(subject)}&body=${enc(body)}`,
    },
    {
      id: "proton", label: "Proton Mail", initial: "P",
      url: ({ to, subject, body }) =>
        `https://mail.proton.me/u/0/compose?to=${enc(to)}&subject=${enc(subject)}&body=${enc(body)}`,
    },
    {
      id: "copy", label: "Copy the message", initial: "⧉", action: "copy",
    },
    {
      id: "mailto", label: "Use my default mail app", initial: "@", action: "mailto",
    },
  ];

  const enc = (s) => encodeURIComponent(s ?? "");
  const MAILER_KEY = "pf-mailer";

  /**
   * Owns the send chooser and every `mailto:` link on the page.
   * `open(message, onDone)` — message is `{ to, subject, body }`.
   */
  function initMailer() {
    const dlg = $("#mailer");
    const grid = $("#mailerGrid");
    const note = $("#mailerNote");
    const supportsDialog = typeof dlg?.showModal === "function";

    const stored = () => {
      try { return localStorage.getItem(MAILER_KEY); } catch { return null; }
    };
    const remember = (id) => { try { localStorage.setItem(MAILER_KEY, id); } catch { /* private mode */ } };

    const setNote = (msg, kind) => {
      note.textContent = msg;
      note.className = `mailer__note${kind ? ` is-${kind}` : ""}`;
    };

    async function copyMessage({ subject, body }) {
      const text = `${subject}\n\n${body}`;
      try {
        await navigator.clipboard.writeText(text);
        setNote("Message copied — paste it into any mail service.", "ok");
      } catch {
        // Clipboard API needs a secure context and permission; fall back to a
        // selection the visitor can copy by hand.
        try {
          const ta = document.createElement("textarea");
          ta.value = text;
          ta.setAttribute("readonly", "");
          ta.style.cssText = "position:fixed;top:-1000px";
          document.body.appendChild(ta);
          ta.select();
          document.execCommand("copy");
          ta.remove();
          setNote("Message copied — paste it into any mail service.", "ok");
        } catch {
          setNote("Couldn't copy automatically — select the text in the form instead.", "err");
        }
      }
    }

    function getProvider(id) { return MAIL_PROVIDERS.find((p) => p.id === id) || null; }

    /** Hand the message to a provider. Opens a tab, or copies, or falls back to mailto. */
    function deliver(id, message) {
      const p = getProvider(id);
      if (!p) return false;

      if (p.action === "copy") { copyMessage(message); return true; }

      if (p.action === "mailto") {
        // Deliberate choice, so the OS prompt is expected rather than a surprise.
        window.location.href =
          `mailto:${message.to}?subject=${enc(message.subject)}&body=${enc(message.body)}`;
        return true;
      }

      window.open(p.url(message), "_blank", "noopener,noreferrer");
      return true;
    }

    function close() { if (dlg?.open) dlg.close(); }

    /** Re-rendered on every open so the "last used" marker is never stale. */
    function renderOptions() {
      const last = stored();
      grid.innerHTML = MAIL_PROVIDERS.map((p) => `
        <button class="mailer__opt${p.action ? " mailer__opt--wide" : ""}${p.id === last ? " is-last" : ""}"
                type="button" data-provider="${p.id}">
          <b aria-hidden="true">${esc(p.initial)}</b><span>${esc(p.label)}</span>
          ${p.id === last ? "<em>Last used</em>" : ""}
        </button>`).join("");
    }

    /** Show the chooser. */
    function open(message, onDone) {
      // Nothing to choose from without <dialog> support — go straight out.
      if (!supportsDialog) { deliver("gmail", message); onDone?.(); return; }
      renderOptions();
      setNote("");
      dlg._message = message;
      dlg._onDone = onDone;
      dlg.showModal();
    }

    if (supportsDialog) {
      grid.addEventListener("click", (e) => {
        const btn = e.target.closest(".mailer__opt");
        if (!btn) return;
        const id = btn.dataset.provider;
        const message = dlg._message;
        if (!message) return;

        deliver(id, message);
        // Remember a real service so the next send is one click. Actions aren't
        // remembered: they'd make every later send silently skip the chooser.
        const p = getProvider(id);
        if (p && !p.action) {
          remember(id);
          setNote(`Opening ${p.label}…`);
        }
        dlg._onDone?.();
        // Copy stays open so the confirmation is readable; the rest close.
        if (p?.action === "copy") return;
        setTimeout(close, 500);
      });

      $("#mailerClose").addEventListener("click", close);
      // <dialog> already closes on Escape, but automating that is unreliable —
      // an explicit handler costs nothing and guarantees the scroll lock lifts.
      dlg.addEventListener("cancel", (e) => { e.preventDefault(); close(); });
    }

    // Any `mailto:` link on the page routes through the chooser too — otherwise
    // the visitor hits the same missing-mail-client problem from the address
    // links in the hero, footer, contact list and agent replies.
    document.addEventListener("click", (e) => {
      const a = e.target.closest?.('a[href^="mailto:"]');
      if (!a) return;
      const address = a.getAttribute("href").slice(7).split("?")[0];
      if (!address) return;
      e.preventDefault();
      const msg = { to: address, subject: "", body: "" };
      const saved = stored();
      if (saved && getProvider(saved)) { deliver(saved, msg); return; }
      open(msg);
    });

    return { open, deliver, stored, remember, getProvider };
  }

  /* ============================= 12. COMMAND PALETTE ====================== */
  function initPalette() {
    const dlg = $("#palette");
    const input = $("#paletteInput");
    const list = $("#paletteList");
    if (typeof dlg.showModal !== "function") return; // graceful fallback

    const commands = [
      ...$$(".nav__links a").map((a) => ({
        label: a.textContent.trim(), hint: "Section", icon: "home", href: a.getAttribute("href"),
      })),
      { label: "Open AI agent", hint: "Action", icon: "sparkle", action: "agent" },
      { label: "Toggle theme", hint: "Action", icon: "sun", action: "theme" },
      { label: "Copy email address", hint: "Action", icon: "mail", action: "copy" },
      ...P.socials.map((s) => ({ label: s.label, hint: "Link", icon: s.icon, href: s.url, blank: true })),
    ];

    let index = 0;
    let filtered = commands;

    const render = () => {
      list.innerHTML = filtered.length
        ? filtered.map((c, i) => `
            <li role="option" data-i="${i}" aria-selected="${i === index}">
              ${ICONS[c.icon] || ICONS.sparkle}<span>${esc(c.label)}</span><em>${esc(c.hint)}</em>
            </li>`).join("")
        : '<li class="palette__empty" role="presentation">No matching commands</li>';
    };

    const open = () => {
      index = 0; filtered = commands; input.value = "";
      render();
      dlg.showModal();
      document.body.classList.add("is-locked");
      setTimeout(() => input.focus(), 30);
    };
    const close = () => { dlg.close(); document.body.classList.remove("is-locked"); };

    const run = (cmd) => {
      if (!cmd) return;
      close();
      if (cmd.action === "agent") { window.dispatchEvent(new CustomEvent("agent:open")); return; }
      if (cmd.action === "theme") { $("#themeToggle").click(); return; }
      if (cmd.action === "copy") {
        navigator.clipboard?.writeText(P.meta.email).then(() => {
          const btn = $("#paletteOpen");
          btn.style.borderColor = "var(--accent-3)";
          setTimeout(() => { btn.style.borderColor = ""; }, 1200);
        });
        return;
      }
      if (cmd.blank) { window.open(cmd.href, "_blank", "noopener"); return; }
      if (cmd.href?.startsWith("#")) {
        const sec = $(cmd.href);
        if (sec) {
          // Ask the nav to hold itself open across the jump, rather than
          // reaching into its scope.
          window.dispatchEvent(new CustomEvent("nav:hold"));
          sec.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
        }
      }
    };

    $("#paletteOpen").addEventListener("click", open);

    // Escape must close the dialog explicitly. Chromium's implicit
    // Escape-to-close on <dialog> doesn't fire `cancel` reliably (notably
    // under automation), so we don't rely on it. close() is a no-op if closed.
    dlg.addEventListener("keydown", (e) => {
      if (e.key === "Escape") { e.preventDefault(); close(); }
    });

    addEventListener("keydown", (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); dlg.open ? close() : open(); }
      else if (e.key === "Escape" && dlg.open) close();
    });

    input.addEventListener("input", () => {
      const q = input.value.trim().toLowerCase();
      filtered = q ? commands.filter((c) => c.label.toLowerCase().includes(q)) : commands;
      index = 0;
      render();
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown") { e.preventDefault(); index = Math.min(index + 1, filtered.length - 1); render(); }
      else if (e.key === "ArrowUp") { e.preventDefault(); index = Math.max(index - 1, 0); render(); }
      else if (e.key === "Enter") { e.preventDefault(); run(filtered[index]); }
    });

    list.addEventListener("click", (e) => {
      const li = e.target.closest("li[data-i]");
      if (li) run(filtered[+li.dataset.i]);
    });

    dlg.addEventListener("click", (e) => { if (e.target === dlg) close(); });
    dlg.addEventListener("close", () => document.body.classList.remove("is-locked"));
  }

  /* ============================ 13. GARNISH ============================= */
  /**
   * Attach the colour-toned background plates.
   *
   * The image is only applied once it has actually decoded, so a missing file
   * leaves the plate fully transparent — no broken-image box, no layout shift.
   * The tritone ramp itself lives in CSS (`filter: url(#ds-tritone-*)`), so
   * swapping the artwork is a matter of dropping a file into assets/img/.
   * See the README there.
   */
  function initGarnish() {
    const els = $$(".garnish[data-src]");
    if (!els.length) return;

    // Save-data users get the page without the photography.
    if (navigator.connection?.saveData) {
      console.info("[garnish] skipped — Save-Data is on.");
      return;
    }

    const load = (el) => {
      const src = el.dataset.src;
      const probe = new Image();
      probe.decoding = "async";
      probe.onload = () => {
        // Absolute, because a relative url() dropped into a custom property is
        // resolved against the *stylesheet* that consumes it, not the document
        // — which would turn assets/img/x.webp into assets/css/assets/img/x.webp.
        el.style.setProperty("--plate-src", `url("${new URL(src, document.baseURI).href}")`);
        el.classList.add("is-ready");
      };
      probe.onerror = () => {
        console.info(`[garnish] ${src} not found — skipping. See assets/img/README.md.`);
      };
      probe.src = src;
    };

    if (!("IntersectionObserver" in window)) { els.forEach(load); }
    else {
      // Fetch each image only as its section approaches the viewport.
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          io.unobserve(e.target);
          load(e.target);
        });
      }, { rootMargin: "400px 0px" });
      els.forEach((el) => io.observe(el));
    }

    initPlateParallax();
  }

  /**
   * A few pixels of counter-movement on the hero plate as the cursor travels,
   * which is what makes it read as a layer sitting behind the glass card
   * rather than as wallpaper. Transform-only, so it stays on the compositor;
   * disabled for coarse pointers and reduced-motion users, where there is no
   * cursor to track or the movement is unwelcome.
   */
  function initPlateParallax() {
    const plate = $(".garnish--hero");
    if (!plate || !finePointer || reduceMotion) return;

    const hero = plate.parentElement;
    const RANGE = 12; // px of travel at the screen edges
    let raf = null;

    hero.addEventListener("pointermove", (e) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const dx = (e.clientX / innerWidth - .5) * -2 * RANGE;
        const dy = (e.clientY / innerHeight - .5) * -2 * RANGE;
        plate.style.transform = `translate3d(${dx.toFixed(2)}px, ${dy.toFixed(2)}px, 0)`;
        raf = null;
      });
    }, { passive: true });

    hero.addEventListener("pointerleave", () => {
      plate.style.transform = "";
    });
  }

  /* ============================== 14. BOOT ============================== */
  function boot() {
    renderStatic();
    initTheme();
    initNav();
    initTypedRole();
    initGarnish();
    initReveal();
    initCounters();
    initScrollFx();
    initPointerFx();
    initQuotes();
    initContact(initMailer());
    initPalette();

    // Hero secondary CTA opens the agent
    $("#heroSecondary").addEventListener("click", () =>
      window.dispatchEvent(new CustomEvent("agent:open")));
  }

  document.readyState === "loading"
    ? document.addEventListener("DOMContentLoaded", boot)
    : boot();
})();
