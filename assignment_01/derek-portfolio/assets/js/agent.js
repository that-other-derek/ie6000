/* =============================================================================
   agent.js — the "Ask my AI agent" widget.

   TWO MODES (set in data.js → agent.mode):
     "local" — offline. Keyword scoring over the knowledge base, streamed with a
               typewriter effect. Zero config, works on a static host. DEFAULT.
     "api"   — POSTs the conversation to agent.endpoint and streams the reply
               back. Use this to plug in a real LLM (see README).

   Public events:
     window.dispatchEvent(new CustomEvent("agent:open"))    — open the panel
     window.dispatchEvent(new CustomEvent("agent:close"))   — close it
   ========================================================================== */
(() => {
  "use strict";

  const P = window.PROFILE;
  const CFG = P.agent || {};
  const $ = (s, r = document) => r.querySelector(s);
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const MODE = CFG.mode === "api" && CFG.endpoint ? "api" : "local";

  let history = [];       // [{ role: "user" | "assistant", content: string }]
  let busy = false;
  let opened = false;

  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* --------------------------------------------------------- formatting -- */
  /** Escape, then allow a tiny safe subset: **bold**, `code`, links, bare URLs. */
  function format(text) {
    let html = esc(text);
    html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    html = html.replace(/`([^`]+)`/g, "<code>$1</code>");
    html = html.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
    html = html.replace(/(^|[\s(])(https?:\/\/[^\s<)]+)/g,
      '$1<a href="$2" target="_blank" rel="noopener noreferrer">$2</a>');
    html = html.replace(/(^|[\s(])([\w.+-]+@[\w-]+\.[\w.]{2,})/g,
      '$1<a href="mailto:$2">$2</a>');
    return html;
  }

  /* =============================== LOCAL BRAIN =========================== */
  const SMALL_TALK = [
    {
      test: /^(hi|hey|hello|yo|howdy|greetings|good (morning|afternoon|evening))\b/i,
      answer: ({ meta }) =>
        `Hello. I'm ${CFG.name}, ${meta.name}'s AI agent. Ask me about his experience, tech stack, projects, or how to reach him.`,
    },
    {
      test: /\b(who|what) (are|is) (you|this)\b|\bwhat do you do\b|\bare you (a )?(bot|ai|human|real)\b/i,
      answer: ({ meta }) =>
        `I'm an AI agent built into ${meta.name}'s portfolio. I answer from a fixed knowledge base covering his professional background — no guessing, no invented detail. Anything he hasn't told me, I'll say so.`,
    },
    {
      test: /\b(thanks|thank you|cheers|appreciate|nice one|great)\b/i,
      answer: () => "Happy to help. Anything else you'd like to know — or shall I point you at the contact details?",
    },
  ];

  const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  /* ----------------------------------------------------------- normalising --
     Everything below the small talk runs on a normalised, stemmed, alias-
     expanded copy of the question rather than the raw string. That is what
     stops "what does Derek do at WSU", "what does he do at Wayne State" and
     "what's he studying" from being three unrelated misses: they normalise to
     the same handful of tokens, the aliases map WSU → Wayne State, and the
     stemmer folds studying/study/studied together. */

  /** Lowercase, unify the fancy dashes and quotes, drop meaningless punctuation. */
  function normalise(s) {
    return String(s ?? "")
      .toLowerCase()
      .replace(/[\u2018\u2019]/g, "'")
      .replace(/[\u201c\u201d]/g, '"')
      .replace(/[\u2013\u2014]/g, "-")
      .replace(/[^\w\s+#'.&-]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  /**
   * Conservative suffix stripping.
   * "what is he studying", "where did he study" and "what did he study" are the
   * same question — without this, one keyword only ever catches one form of it.
   */
  function stem(w) {
    if (w.length <= 4) return w;
    return w
      .replace(/ies$/, "y")                 // studies → study
      .replace(/(\w)ied$/, "$1y")           // studied → study
      .replace(/(ing|ed)$/, "")             // studying → study
      .replace(/([bdfglmnprt])\1$/, "$1")   // shipped → ship
      .replace(/([^s])s$/, "$1");           // patents → patent
  }

  const stemPhrase = (s) => s.split(" ").map(stem).join(" ");
  const words = (s) => s.split(" ").filter(Boolean);

  /** True when a and b are at most one edit apart. Used to forgive typos. */
  function withinOneEdit(a, b) {
    if (Math.abs(a.length - b.length) > 1) return false;
    if (a === b) return true;
    let i = 0, j = 0, edits = 0;
    while (i < a.length && j < b.length) {
      if (a[i] === b[j]) { i++; j++; continue; }
      if (++edits > 1) return false;
      if (a.length > b.length) i++;
      else if (b.length > a.length) j++;
      else { i++; j++; }
    }
    return edits + (a.length - i) + (b.length - j) <= 1;
  }

  /**
   * True if `kw` appears in `q` (both already normalised).
   *
   * Short keywords must match whole words, or "ai" fires on "email" and "ms" on
   * "systems". Longer ones may match inside a token, and a one-edit typo is
   * forgiven against the knowledge base's own vocabulary, so "wayn state" or
   * "intellmake" still land on the right answer.
   */
  function mentions(q, kw, vocab) {
    if (!kw) return false;
    if (kw.includes(" ")) return q.includes(kw);
    if (kw.length <= 3) return new RegExp(`\\b${escapeRe(kw)}\\b`).test(q);
    if (q.includes(kw)) return true;
    if (vocab && words(q).some((w) => w.length > 4 && withinOneEdit(w, kw))) return true;
    return false;
  }

  /** Grow the question with the aliases declared in data.js → agent.aliases. */
  function expand(q) {
    let out = q;
    for (const [pattern, extra] of CFG.aliases || []) {
      if (mentions(q, normalise(pattern))) out += ` ${normalise(extra)}`;
    }
    return out;
  }

  /** Score a KB entry against the visitor's question. */
  function score(entry, q, qStem, vocab) {
    // `strong` keywords are decisive rather than cumulative. Use them for the
    // rare unambiguous mention — a section by name, say — where accumulating
    // evidence from other entries would otherwise outvote the obvious answer.
    for (const t of entry.strong || []) {
      if (mentions(q, normalise(t), vocab)) return 1000;
    }

    let total = 0;
    for (const kw of entry.keywords || []) {
      const k = normalise(kw);
      const hit = mentions(q, k, vocab) || mentions(qStem, stemPhrase(k));
      if (!hit) continue;
      // Longer, phrase-like keywords are stronger signals than single tokens.
      total += 2 + k.split(/\s+/).length * 2 + Math.min(k.length, 14) / 14;
    }
    // A whole-word match on the entry id is a strong hint.
    if (mentions(q, normalise(entry.id))) total += 3;
    // `also` behaves like a keyword but scores lower — use it for the loose,
    // tangential phrasings an editor wants to catch without over-weighting.
    for (const t of entry.also || []) if (mentions(q, normalise(t))) total += 2;
    return total;
  }

  /* ------------------------------------------------------------- answering -- */

  /** Everything the agent can actually cover, for use when a question misses. */
  function topics() {
    return (CFG.kb || []).map((e) => e.label).filter(Boolean);
  }

  /**
   * Nothing matched. Say so plainly, then show what *is* on file — a visitor who
   * gets a list of real subjects can ask a better second question, which is the
   * difference between an agent that feels narrow and one that feels dim.
   */
  function scopeAnswer() {
    const list = topics().slice(0, 9);
    return CFG.fallback + (list.length
      ? "\n\nWhat I can go into detail on:\n" + list.map((t) => `• ${t}`).join("\n")
      : "");
  }

  /**
   * Something matched, but not decisively — several entries run close together.
   * Offering the near misses beats picking one and sounding confident about the
   * wrong thing.
   */
  function menuAnswer(ranked) {
    const picks = ranked.slice(0, 3).map((r) => r.entry).filter((e) => e.label);
    if (picks.length < 2) return scopeAnswer();
    return "That could point a few ways — pick whichever you meant and I'll go deep:\n\n" +
      picks.map((e) => `• **${e.label}**${e.sample ? ` — try “${e.sample}”` : ""}`).join("\n");
  }

  function localAnswer(question) {
    for (const st of SMALL_TALK) {
      if (st.test.test(question)) {
        return typeof st.answer === "function" ? st.answer(P) : st.answer;
      }
    }

    const q = expand(normalise(question));
    const qStem = stemPhrase(q);
    const vocab = (CFG.kb || [])
      .flatMap((e) => (e.keywords || []).flatMap((k) => words(normalise(k))));

    const ranked = (CFG.kb || [])
      .map((entry) => ({ entry, s: score(entry, q, qStem, vocab) }))
      .filter((r) => r.s > 0)
      .sort((a, b) => b.s - a.s);

    if (!ranked.length) return scopeAnswer();

    // One solid keyword hit scores ~4.4; a phrase hit scores 8+. Below that the
    // match is a coincidence of a short token, so ask which one they meant.
    const CONFIDENT = 4;
    if (ranked[0].s < CONFIDENT) return menuAnswer(ranked);

    const best = ranked[0].entry;
    try {
      return typeof best.answer === "function" ? best.answer(P) : best.answer;
    } catch (err) {
      console.error("[agent] knowledge-base entry failed:", best.id, err);
      return scopeAnswer();
    }
  }

  /* ================================== API ================================ */
  /**
   * Everything the model is allowed to know, in one string.
   *
   * This used to carry experience, skills and projects only — so in API mode the
   * model had no idea Derek was studying at Wayne State, had no certifications
   * and no IntelliMake research to draw on, and answered accordingly. It now
   * mirrors the whole profile, and ends with the local knowledge base's own
   * answers so both modes can never disagree about a fact.
   */
  function profileDigest() {
    const { meta, hero, experience, skills, projects, education,
            certifications, volunteering, testimonials, journal } = P;

    const lines = [
      `Name: ${meta.name}`,
      `Headline: ${meta.headline}`,
      `Rotating titles: ${(hero?.roles || []).join(" | ")}`,
      `Location: ${meta.location}`,
      `Availability: ${meta.availability}`,
      `Email: ${meta.email}`,
      "",
      "Experience:",
      ...experience.map((e) =>
        `- ${e.role}, ${e.company} (${e.start}-${e.end}): ${e.summary} ${(e.achievements || []).join(" ")}`),
      "",
      "Education (most recent first):",
      ...(education || []).map((e) => `- ${e.focus} — ${e.school} (${e.years})`),
      "",
      "Certifications:",
      ...(certifications || []).map((c) => `- ${c.name} — ${c.issuer} (${c.year})`),
      "",
      "Current study, research and writing:",
      journal?.lede ? `- ${journal.lede}` : null,
      ...(journal?.entries || []).map((e) => `- ${e.title} (${e.date}, ${e.tag}): ${e.body.join(" ")}`),
      "",
      "Skills:",
      // Items are plain strings; the old `i.name` printed "undefined" for each.
      ...skills.map((g) => `- ${g.name}: ${g.items.map((i) => i.name ?? i).join(", ")}`),
      "",
      "Projects:",
      ...projects.map((p) => `- ${p.title} (${p.tagline}): ${p.description}`),
      "",
      "Volunteering:",
      ...(volunteering || []).map((v) => `- ${v.role} at ${v.org} (${v.dates}): ${v.summary}`),
      "",
      "What colleagues say:",
      ...(testimonials || []).map((t) => `- ${t.author}, ${t.title}: "${t.quote}"`),
      "",
      "Verified answers to common questions:",
      ...(CFG.kb || []).map((e) => {
        try {
          const a = typeof e.answer === "function" ? e.answer(P) : e.answer;
          return `Q: ${e.label || e.id}\nA: ${a}`;
        } catch { return null; }
      }).filter(Boolean),
    ];

    return lines.filter((l) => l !== null).join("\n");
  }

  function messagesFor() {
    return [
      {
        role: "system",
        content:
          `You are ${CFG.name}, an AI agent embedded in ${P.meta.name}'s portfolio website. ` +
          `You speak about his professional background to recruiters, headhunters and potential partners. ` +
          `Be concise (under 120 words), warm and concrete. Use plain text with short bullets. ` +
          `Never invent employers, dates, metrics or credentials — if it isn't below, say you don't have it and suggest contacting him. ` +
          `${CFG.systemPromptExtra || ""}\n\n--- PROFILE ---\n${profileDigest()}`,
      },
      ...history.map((m) => ({ role: m.role, content: m.content })),
    ];
  }

  async function apiStream(question, onDelta) {
    const res = await fetch(CFG.endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: messagesFor(), model: CFG.model, question }),
    });

    if (!res.ok) throw new Error(`Endpoint responded ${res.status}`);
    if (!res.body) {                                    // No streaming support
      const json = await res.json();
      onDelta(json.reply ?? json.content ?? "");
      return;
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    const isSSE = (res.headers.get("content-type") || "").includes("text/event-stream");
    let buffer = "";

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      if (isSSE) {
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";
        for (const line of lines) {
          const t = line.trim();
          if (!t.startsWith("data:")) continue;
          const payload = t.slice(5).trim();
          if (payload === "[DONE]") return;
          try {
            const json = JSON.parse(payload);
            onDelta(json.delta ?? json.choices?.[0]?.delta?.content ?? json.content ?? "");
          } catch {
            onDelta(payload);
          }
        }
      } else {
        onDelta(buffer);
        buffer = "";
      }
    }
  }

  /* ================================ RENDER =============================== */
  const log = $("#agentLog");

  function bubble(role, html, { typed = false } = {}) {
    const wrap = document.createElement("div");
    wrap.className = `msg msg--${role === "user" ? "user" : "bot"}`;
    wrap.innerHTML =
      `<span class="msg__avatar" aria-hidden="true">${role === "user" ? "You" : P.meta.initials}</span>` +
      `<div class="msg__bubble"></div>`;
    const body = $(".msg__bubble", wrap);
    body.innerHTML = html;
    if (typed) body.dataset.raw = "";
    log.appendChild(wrap);
    scrollToEnd();
    return body;
  }

  function scrollToEnd(smooth = true) {
    requestAnimationFrame(() => {
      log.scrollTo({ top: log.scrollHeight, behavior: smooth && !reduceMotion ? "smooth" : "auto" });
    });
  }

  function showTyping() {
    const el = bubble("bot", '<span class="dots"><i></i><i></i><i></i></span>');
    return el.closest(".msg");
  }

  /** Typewriter reveal. Falls back to instant when motion is reduced. */
  function typeInto(el, text, done) {
    if (reduceMotion) { el.innerHTML = format(text); scrollToEnd(false); done?.(); return; }

    let i = 0;
    const step = () => {
      i += Math.max(2, Math.round(text.length / 90));
      el.textContent = text.slice(0, i);
      scrollToEnd(false);
      if (i < text.length) {
        // Small pause on sentence breaks reads more naturally.
        const ch = text[i - 1];
        setTimeout(step, /[.!?\n]/.test(ch) ? 90 : 12);
      } else {
        el.innerHTML = format(text);
        scrollToEnd();
        done?.();
      }
    };
    step();
  }

  function setBusy(state) {
    busy = state;
    $("#agentSend").disabled = state;
    $("#agentInput").disabled = state;
    $("#agentStatusText").textContent = state ? "Thinking…" : (MODE === "api" ? "Online — live model" : "Online — answers instantly");
  }

  /* ================================ FLOW ================================= */
  async function ask(question) {
    const text = String(question || "").trim();
    if (!text || busy) return;

    busy = true;
    bubble("user", format(text));
    history.push({ role: "user", content: text });
    $("#agentInput").value = "";
    $("#agentChips").style.opacity = "0.35";
    setBusy(true);

    const typing = showTyping();
    let streamEl = null; // created lazily on the first streamed delta

    const finish = (answer) => {
      typing.remove();
      scrollToEnd();
      setBusy(false);
      $("#agentChips").style.opacity = "";
      history.push({ role: "assistant", content: answer });
      if (history.length > 24) history = history.slice(-24);
    };

    if (MODE === "local") {
      const answer = localAnswer(text);
      const typingDelay = reduceMotion ? 0 : 420 + Math.random() * 320;
      setTimeout(() => {
        typing.remove();
        typeInto(bubble("bot", ""), answer, () => finish(answer));
      }, typingDelay);
      return;
    }

    // ---- API mode: stream deltas into the bubble
    let acc = "";
    try {
      await apiStream(text, (delta) => {
        if (!delta) return;
        acc += delta;
        if (!streamEl) { typing.remove(); streamEl = bubble("bot", ""); }
        streamEl.innerHTML = format(acc);
        scrollToEnd(false);
      });
    } catch (err) {
      console.error("[agent] API request failed:", err);
      typing.remove();
      bubble("bot", format(
        "I couldn't reach the live model just now. " +
        `You can always email ${P.meta.email} directly.`));
      setBusy(false);
      $("#agentChips").style.opacity = "";
      return;
    }

    if (!acc) {
      typing.remove();
      const answer = localAnswer(text);
      typeInto(bubble("bot", ""), answer, () => finish(answer));
      return;
    }

    finish(acc);
  }

  /* ================================ SHELL ================================ */
  function mount() {
    $("#agentTitle").textContent = CFG.name;
    $("#agentLauncherTagline").textContent = CFG.tagline;
    $("#agentModeLabel").textContent = MODE === "api" ? "Live model" : "Offline mode";

    // Suggestion chips
    const chips = $("#agentChips");
    chips.innerHTML = (CFG.suggestions || [])
      .map((s) => `<button class="chip" type="button">${esc(s)}</button>`).join("");
    chips.addEventListener("click", (e) => {
      const btn = e.target.closest(".chip");
      if (btn) ask(btn.textContent);
    });

    // Greeting (skipped on repeat opens)
    bubble("bot", format(CFG.greeting));
    $("#agentChips").style.opacity = "1";

    // Badge: nudges a first visit, then stays quiet
    if (localStorage.getItem("pf-agent-seen") === "1") $("#agentBadge").classList.add("is-hidden");

    $("#agentForm").addEventListener("submit", (e) => {
      e.preventDefault();
      ask($("#agentInput").value);
    });

    $("#agentReset").addEventListener("click", () => {
      history = [];
      log.innerHTML = "";
      bubble("bot", format(CFG.greeting));
      $("#agentInput").focus();
    });
  }

  function setOpen(open) {
    const agent = $("#agent");
    agent.dataset.open = String(open);
    $("#agentLauncher").setAttribute("aria-expanded", String(open));
    opened = open;

    if (open) {
      $("#agentBadge").classList.add("is-hidden");
      localStorage.setItem("pf-agent-seen", "1");
      if (innerWidth < 720) document.body.classList.add("is-locked");
      setTimeout(() => $("#agentInput").focus({ preventScroll: true }), reduceMotion ? 0 : 320);
      scrollToEnd(false);
    } else {
      document.body.classList.remove("is-locked");
      $("#agentLauncher").focus({ preventScroll: true });
    }
  }

  function initShell() {
    $("#agentLauncher").addEventListener("click", () => setOpen(true));
    $("#agentClose").addEventListener("click", () => setOpen(false));
    addEventListener("agent:open", () => setOpen(true));
    addEventListener("agent:close", () => setOpen(false));

    addEventListener("keydown", (e) => {
      if (e.key === "Escape" && opened) setOpen(false);
      // Focus the input from anywhere with "/" (ignored while typing elsewhere)
      if (e.key === "/" && !opened) {
        const tag = (document.activeElement?.tagName || "").toLowerCase();
        if (tag === "input" || tag === "textarea") return;
        e.preventDefault();
        setOpen(true);
      }
    });
  }

  /* ================================ BOOT ================================= */
  function boot() {
    mount();
    initShell();
    console.info(`[agent] ready — mode: ${MODE}`);
  }
  document.readyState === "loading"
    ? document.addEventListener("DOMContentLoaded", boot)
    : boot();
})();
