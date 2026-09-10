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

  /** True if `kw` appears in `q`, respecting word boundaries for short keywords. */
  function mentions(q, kw) {
    // Short keywords ("ai", "pm", "oms") must not match inside longer words —
    // otherwise "ai" fires on "email" and "available".
    if (kw.length <= 3) return new RegExp(`\\b${escapeRe(kw)}\\b`).test(q);
    return q.includes(kw);
  }

  /** Score a KB entry against the visitor's question. */
  function score(entry, q) {
    let total = 0;
    for (const kw of entry.keywords) {
      if (!mentions(q, kw)) continue;
      // Longer, phrase-like keywords are stronger signals than single tokens.
      total += 1 + kw.split(/\s+/).length * 2 + Math.min(kw.length, 14) / 14;
    }
    // A whole-word match on the entry id is a strong hint.
    if (mentions(q, entry.id)) total += 3;
    return total;
  }

  function localAnswer(question) {
    const q = question.toLowerCase();

    for (const st of SMALL_TALK) {
      if (st.test.test(question)) {
        return typeof st.answer === "function" ? st.answer(P) : st.answer;
      }
    }

    let best = null;
    let bestScore = 0;
    for (const entry of CFG.kb || []) {
      const s = score(entry, q);
      if (s > bestScore) { bestScore = s; best = entry; }
    }

    if (!best || bestScore < 1) return CFG.fallback;

    try {
      return typeof best.answer === "function" ? best.answer(P) : best.answer;
    } catch (err) {
      console.error("[agent] knowledge-base entry failed:", best.id, err);
      return CFG.fallback;
    }
  }

  /* ================================== API ================================ */
  function profileDigest() {
    const { meta, experience, skills, projects } = P;
    return [
      `Name: ${meta.name}`,
      `Headline: ${meta.headline}`,
      `Location: ${meta.location}`,
      `Availability: ${meta.availability}`,
      `Email: ${meta.email}`,
      "",
      "Experience:",
      ...experience.map((e) =>
        `- ${e.role}, ${e.company} (${e.start}-${e.end}): ${e.summary} ${(e.achievements || []).join(" ")}`),
      "",
      "Skills:",
      ...skills.map((g) => `- ${g.name}: ${g.items.map((i) => i.name).join(", ")}`),
      "",
      "Projects:",
      ...projects.map((p) => `- ${p.title} (${p.tagline}): ${p.description}`),
    ].join("\n");
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
