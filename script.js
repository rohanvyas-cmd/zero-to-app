/* Zero to App — shared script */

(function () {
  "use strict";

  // -------- Scroll progress bar --------
  const progress = document.getElementById("scrollProgress");
  if (progress) {
    const update = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop;
      const max = h.scrollHeight - h.clientHeight;
      const pct = max > 0 ? (scrolled / max) * 100 : 0;
      progress.style.width = pct + "%";
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
  }

  // -------- Mobile menu toggle --------
  const menuToggle = document.getElementById("menuToggle");
  const primaryNav = document.getElementById("primaryNav");
  if (menuToggle && primaryNav) {
    menuToggle.addEventListener("click", () => {
      primaryNav.classList.toggle("open");
    });
    // Close when a link is clicked
    primaryNav.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => primaryNav.classList.remove("open"));
    });
  }

  // -------- Copy buttons --------
  document.querySelectorAll("[data-copy]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const codeEl = btn.closest(".code-block")?.querySelector("pre code");
      if (!codeEl) return;
      const text = codeEl.innerText;
      try {
        await navigator.clipboard.writeText(text);
      } catch {
        // fallback
        const ta = document.createElement("textarea");
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand("copy"); } catch (_) {}
        document.body.removeChild(ta);
      }
      const label = btn.querySelector("span");
      const prev = label ? label.textContent : null;
      btn.classList.add("copied");
      if (label) label.textContent = "Copied!";
      setTimeout(() => {
        btn.classList.remove("copied");
        if (label && prev) label.textContent = prev;
      }, 1400);
    });
  });

  // -------- Keyboard "/" focuses search (if present) --------
  const search = document.getElementById("sidebarSearch");
  if (search) {
    window.addEventListener("keydown", (e) => {
      if (e.key === "/" && document.activeElement !== search) {
        e.preventDefault();
        search.focus();
      }
    });
  }

  // -------- Reveal on scroll --------
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          observer.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  document
    .querySelectorAll(
      ".section-head, .concept-card, .tool-block, .claude-card, .deploy-card, .w-step, .cheatsheet, .docs-grid, .break-panel, .end-card, .stack-picker, .tips-panel, .flow-block, .roadmap, .hero-stats"
    )
    .forEach((el) => {
      el.classList.add("reveal");
      observer.observe(el);
    });
})();
