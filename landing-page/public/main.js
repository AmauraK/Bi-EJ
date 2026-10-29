/**
 * DS EJFGV — Interações do site (main.js)
 * Cada bloco só roda se o elemento existir na página.
 * - Cursor customizado interpolado (.cursor / .cursor.is-link) do Grotesk Zero / DS EJFGV
 * - Menu mobile e dropdowns da .gz-nav (fecham com Esc e com clique fora)
 * - Vídeo em <dialog> (.video-modal)
 * - Depoimentos: todos no HTML, troca só por clique (sem rotação automática)
 * - Contadores [data-count] com IntersectionObserver (o valor final já vem no HTML)
 * - Pausa da faixa de logos
 * - Máscara de telefone BR em input[type=tel]
 * - Formulários form[data-form]: sem endpoint, mostra WhatsApp e e-mail; com endpoint, só mostra
 *   sucesso se a resposta vier ok. Nunca há mensagem de sucesso falsa.
 */
(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isTouch = window.matchMedia("(pointer: coarse)").matches;

  /* 1. Cursor Customizado Interpolado (Extraído do DS EJFGV / grotesk-zero-45) */
  const cursor = document.getElementById("cursor");
  if (cursor && !isTouch && !reduceMotion) {
    let cx = window.innerWidth / 2;
    let cy = window.innerHeight / 2;
    let tx = cx;
    let ty = cy;

    window.addEventListener("pointermove", (e) => {
      tx = e.clientX;
      ty = e.clientY;
    }, { passive: true });

    function renderCursor() {
      cx += (tx - cx) * 0.22;
      cy += (ty - cy) * 0.22;
      cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
      requestAnimationFrame(renderCursor);
    }
    requestAnimationFrame(renderCursor);

    const interactiveEls = document.querySelectorAll(
      "a, button, input, textarea, select, label, summary, .metodo_card, .case_card, .frente_mini-card, .hero-photo-frame"
    );
    interactiveEls.forEach((el) => {
      el.addEventListener("pointerenter", () => cursor.classList.add("is-link"));
      el.addEventListener("pointerleave", () => cursor.classList.remove("is-link"));
    });
  }

  /* 2. Menu mobile e dropdowns da navegação (.gz-nav) */
  const nav = document.getElementById("mainNav");
  if (nav) {
    const toggle = nav.querySelector(".menu-toggle");
    const links = nav.querySelector(".links");
    const dropdowns = Array.from(nav.querySelectorAll("details.dropdown"));

    function closeMenu() {
      if (!links || !toggle) return;
      links.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }

    if (toggle && links) {
      toggle.addEventListener("click", () => {
        const open = links.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", String(open));
      });
      links.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));
    }

    dropdowns.forEach((d) => {
      d.addEventListener("toggle", () => {
        if (d.open) dropdowns.forEach((other) => { if (other !== d) other.open = false; });
      });
    });

    document.addEventListener("click", (e) => {
      if (nav.contains(e.target)) return;
      dropdowns.forEach((d) => { d.open = false; });
      closeMenu();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key !== "Escape") return;
      const openDropdown = dropdowns.find((d) => d.open);
      dropdowns.forEach((d) => { d.open = false; });
      if (links && links.classList.contains("is-open")) {
        closeMenu();
        toggle.focus();
      } else if (openDropdown) {
        openDropdown.querySelector("summary").focus();
      }
    });
  }

  /* 3. Modal de Vídeo (Vimeo) em <dialog> */
  const videoModal = document.getElementById("videoModal");
  const videoIframe = document.getElementById("videoIframe");
  if (videoModal && videoIframe && typeof videoModal.showModal === "function") {
    document.querySelectorAll("[data-video]").forEach((btn) => {
      btn.addEventListener("click", () => {
        videoIframe.src = btn.getAttribute("data-video");
        videoModal.showModal();
      });
    });

    const closeVideo = () => { if (videoModal.open) videoModal.close(); };
    const closeBtn = document.getElementById("closeVideoModal");
    if (closeBtn) closeBtn.addEventListener("click", closeVideo);
    videoModal.addEventListener("click", (e) => { if (e.target === videoModal) closeVideo(); });
    videoModal.addEventListener("close", () => { videoIframe.src = ""; });
  }

  /* 4. Depoimentos: todos os cards já estão no HTML; os pontos alternam qual aparece */
  document.querySelectorAll("[data-depoimentos]").forEach((grupo) => {
    const cards = Array.from(grupo.querySelectorAll("[data-depoimento]"));
    const dots = Array.from(grupo.querySelectorAll("[data-ir]"));
    dots.forEach((dot) => {
      dot.addEventListener("click", () => {
        const alvo = Number(dot.getAttribute("data-ir"));
        cards.forEach((card, i) => { card.hidden = i !== alvo; });
        dots.forEach((d) => {
          const ativo = Number(d.getAttribute("data-ir")) === alvo;
          d.classList.toggle("is-active", ativo);
          d.setAttribute("aria-pressed", String(ativo));
        });
        const foco = cards[alvo] && cards[alvo].querySelector(`[data-ir="${alvo}"]`);
        if (foco) foco.focus();
      });
    });
  });

  /* 5. Contadores animados: o valor final já está no HTML; a animação só roda ao aparecer na tela */
  const counters = document.querySelectorAll("[data-count]");
  if (counters.length && !reduceMotion && "IntersectionObserver" in window) {
    const animate = (el) => {
      const target = Number(el.getAttribute("data-count"));
      const prefix = el.getAttribute("data-prefix") || "";
      const suffix = el.getAttribute("data-suffix") || "";
      const finalText = el.textContent;
      const start = performance.now();
      const duration = 1400;
      const step = (now) => {
        const p = Math.min(1, (now - start) / duration);
        el.textContent = prefix + Math.round(target * (1 - Math.pow(1 - p, 3))) + suffix;
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = finalText;
      };
      requestAnimationFrame(step);
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        animate(entry.target);
      });
    }, { threshold: 0.4 });
    counters.forEach((el) => observer.observe(el));
  }

  /* 6. Pausa da faixa de logos */
  document.querySelectorAll("[data-logos-pause]").forEach((btn) => {
    const faixa = document.getElementById(btn.getAttribute("aria-controls"));
    if (!faixa) return;
    btn.addEventListener("click", () => {
      const paused = faixa.classList.toggle("is-paused");
      btn.setAttribute("aria-pressed", String(paused));
      btn.textContent = paused ? "Retomar logos" : "Pausar logos";
    });
  });

  /* 6b. WhatsApp flutuante some enquanto formulário ou rodapé estão na tela (os dois já têm WhatsApp) */
  const whatsappFloat = document.querySelector(".whatsapp-float");
  const zonasComWhatsapp = document.querySelectorAll(".section_form, .footer");
  if (whatsappFloat && zonasComWhatsapp.length && "IntersectionObserver" in window) {
    const visiveis = new Set();
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? visiveis.add(e.target) : visiveis.delete(e.target)));
      whatsappFloat.classList.toggle("is-oculto", visiveis.size > 0);
    });
    zonasComWhatsapp.forEach((el) => obs.observe(el));
  }

  /* 7. Máscara de Telefone BR */
  document.querySelectorAll("input[type=tel]").forEach((phoneInput) => {
    phoneInput.addEventListener("input", () => {
      let digits = phoneInput.value.replace(/\D/g, "").slice(0, 11);
      if (digits.length > 6) {
        const ddd = digits.slice(0, 2);
        const mid = digits.length === 11 ? digits.slice(2, 7) : digits.slice(2, 6);
        const end = digits.length === 11 ? digits.slice(7, 11) : digits.slice(6, 10);
        phoneInput.value = `(${ddd}) ${mid}-${end}`;
      } else if (digits.length > 2) {
        phoneInput.value = `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
      } else if (digits.length > 0) {
        phoneInput.value = `(${digits}`;
      }
    });
  });

  /* 8. Formulários (form[data-form]) */
  function link(href, text) {
    const a = document.createElement("a");
    a.href = href;
    a.textContent = text;
    if (/^https?:/.test(href)) {
      a.target = "_blank";
      a.rel = "noopener";
    }
    return a;
  }

  // Mensagem quando o envio não é possível: leva ao material (se houver) ou ao WhatsApp e ao e-mail.
  function fallbackMessage(form, failed) {
    const frag = document.createDocumentFragment();
    const download = form.getAttribute("data-download");
    if (download) {
      frag.append(failed ? "Não conseguimos registrar seus dados agora. " : "Este formulário ainda não registra cadastros. ");
      frag.append("O material está disponível aqui: ", link(download, "baixar o material"), ".");
      return frag;
    }
    const data = new FormData(form);
    const lines = ["Olá! Vim pelo site da EJFGV."];
    if (data.get("name")) lines.push(`Nome: ${data.get("name")}`);
    const service = form.querySelector("select[name=servico]");
    if (service && service.value) lines.push(`Serviço: ${service.selectedOptions[0].textContent.trim()}`);
    if (data.get("Mensagem")) lines.push(`Mensagem: ${data.get("Mensagem")}`);
    const whatsapp = form.getAttribute("data-whatsapp");
    const email = form.getAttribute("data-email");
    frag.append(failed ? "Não conseguimos enviar o formulário agora. " : "Este formulário ainda não envia mensagens. ");
    frag.append("Fale com a gente");
    if (whatsapp) frag.append(" ", link(`${whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`, "pelo WhatsApp"));
    if (email) frag.append(whatsapp ? " ou pelo e-mail " : " pelo e-mail ", link(`mailto:${email}`, email));
    frag.append(".");
    return frag;
  }

  document.querySelectorAll("form[data-form]").forEach((form) => {
    const feedback = form.querySelector(".form-feedback");

    // Serviço pré-selecionado pela URL (?servico=<slug>)
    const select = form.querySelector("select[name=servico]");
    const fromUrl = new URLSearchParams(window.location.search).get("servico");
    if (select && fromUrl && Array.from(select.options).some((o) => o.value === fromUrl)) {
      select.value = fromUrl;
    }

    function show(content, state) {
      if (!feedback) return;
      feedback.className = `form-feedback ${state}`;
      feedback.replaceChildren(content);
    }

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      const honeypot = form.querySelector(".form-honeypot input");
      if (honeypot && honeypot.value) return;

      // getAttribute, e não form.action: com o atributo vazio, form.action devolve a URL da própria página.
      const endpoint = (form.getAttribute("action") || "").trim();
      if (!endpoint) {
        show(fallbackMessage(form, false), "is-error");
        return;
      }

      const submit = form.querySelector("[type=submit]");
      if (submit) submit.disabled = true;
      try {
        const res = await fetch(endpoint, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" },
        });
        if (!res.ok) throw new Error(String(res.status));
        const frag = document.createDocumentFragment();
        frag.append(form.getAttribute("data-sucesso") || "Recebemos seus dados. Nossa equipe vai entrar em contato.");
        const download = form.getAttribute("data-download");
        if (download) frag.append(" ", link(download, "Baixar o material"), ".");
        show(frag, "is-visible");
        form.reset();
      } catch (err) {
        show(fallbackMessage(form, true), "is-error");
      } finally {
        if (submit) submit.disabled = false;
      }
    });
  });
})();
