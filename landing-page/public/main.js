/**
 * DS EJFGV — Interações da Home (main.js)
 * - Cursor customizado interpolado (.cursor / .cursor.is-link) do Grotesk Zero / DS EJFGV
 * - Navegação ativa por seção (.gz-nav)
 * - Slider de Depoimentos Verificados (Ricardo Piragini & Isadora Dias Munhoz)
 * - Lightbox Modal de Vídeo (Vimeo)
 * - Máscara de Telefone BR & Validação do Formulário
 */
(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isTouch = window.matchMedia("(pointer: coarse)").matches;
  const cursor = document.getElementById("cursor");

  /* 1. Cursor Customizado Interpolado (Extraído do DS EJFGV / grotesk-zero-45) */
  if (!isTouch && !reduceMotion && cursor) {
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
      "a, button, input, textarea, select, label, .metodo_card, .case_card, .frente_mini-card, .hero-photo-frame"
    );
    interactiveEls.forEach((el) => {
      el.addEventListener("pointerenter", () => cursor.classList.add("is-link"));
      el.addEventListener("pointerleave", () => cursor.classList.remove("is-link"));
    });
  }

  /* 2. Destaque de Link Ativo na Navbar (.gz-nav) */
  const navLinks = Array.from(document.querySelectorAll(".gz-nav .links a[href^='#']:not(.buy)"));
  const trackedSections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  window.addEventListener("scroll", () => {
    const scrollPos = window.scrollY + 180;
    let activeId = "";
    for (const sec of trackedSections) {
      if (sec.offsetTop <= scrollPos) {
        activeId = sec.id;
      }
    }
    navLinks.forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === `#${activeId}`);
    });
  }, { passive: true });

  /* 3. Slider de Depoimentos Reais (Extraídos de conteudo.ejfgv.com/business-intelligence-dados) */
  const testimonials = [
    {
      quote: '"Eles nos entregaram trabalhos de qualidade e recomendamos a EJFGV. Você não vai se arrepender!"',
      author: "— Ricardo Piragini",
      role: "Sócio Sênior, Britânia Propriedade Intelectual",
      image: "https://cdn.prod.website-files.com/67184b3e7b6cf7353f064e7a/671fa2204cbce7ba18851675_Ricardo%20Piragini.avif",
      video: "https://player.vimeo.com/video/1040821356?autoplay=1"
    },
    {
      quote: '"Desenvolveram o trabalho de forma célere, próxima e eficaz. Atendimento essencial para o desenvolvimento do escritório."',
      author: "— Isadora Dias Munhoz",
      role: "Fundadora, Dias Munhoz Advogados",
      image: "https://cdn.prod.website-files.com/67184b3e7b6cf7353f064e7a/674091c31d9d903e53c981b6_depoimento-dias-munhoz.avif",
      video: "https://player.vimeo.com/video/1040826286?autoplay=1"
    }
  ];

  const tQuote = document.getElementById("tQuote");
  const tAuthor = document.getElementById("tAuthor");
  const tRole = document.getElementById("tRole");
  const tImage = document.getElementById("tImage");
  const tVideoBtn = document.getElementById("tVideoBtn");
  const dots = Array.from(document.querySelectorAll(".depoimento_dot"));
  let currentSlide = 0;

  function setTestimonial(index) {
    const item = testimonials[index];
    if (!item || !tQuote) return;
    currentSlide = index;
    tQuote.textContent = item.quote;
    tAuthor.textContent = item.author;
    tRole.textContent = item.role;
    if (tImage) tImage.src = item.image;
    if (tVideoBtn) tVideoBtn.setAttribute("data-video", item.video);
    dots.forEach((dot, i) => dot.classList.toggle("is-active", i === index));
  }

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const idx = Number(dot.getAttribute("data-slide") || 0);
      setTestimonial(idx);
    });
  });

  setInterval(() => {
    setTestimonial((currentSlide + 1) % testimonials.length);
  }, 6500);

  /* 4. Modal de Vídeo (Vimeo Lightbox) */
  const videoModal = document.getElementById("videoModal");
  const videoIframe = document.getElementById("videoIframe");
  const closeVideoModal = document.getElementById("closeVideoModal");

  function openVideo(url) {
    if (!videoModal || !videoIframe || !url) return;
    videoIframe.src = url;
    videoModal.classList.add("is-open");
    videoModal.setAttribute("aria-hidden", "false");
  }

  function closeVideo() {
    if (!videoModal || !videoIframe) return;
    videoModal.classList.remove("is-open");
    videoModal.setAttribute("aria-hidden", "true");
    videoIframe.src = "";
  }

  document.querySelectorAll("[data-video]").forEach((btn) => {
    btn.addEventListener("click", () => {
      openVideo(btn.getAttribute("data-video"));
    });
  });

  if (closeVideoModal) {
    closeVideoModal.addEventListener("click", closeVideo);
  }
  if (videoModal) {
    videoModal.addEventListener("click", (e) => {
      if (e.target === videoModal) closeVideo();
    });
  }
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeVideo();
  });

  /* 5. Máscara de Telefone BR & Envio do Formulário */
  const phoneInput = document.getElementById("mobile_phone");
  if (phoneInput) {
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
  }

  const leadForm = document.getElementById("leadForm");
  const formFeedback = document.getElementById("formFeedback");
  if (leadForm) {
    leadForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!leadForm.checkValidity()) {
        leadForm.reportValidity();
        return;
      }
      if (formFeedback) {
        formFeedback.classList.add("is-visible");
      }
      leadForm.reset();
    });
  }
})();
