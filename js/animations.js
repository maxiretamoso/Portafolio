// -------------------- DARK MODE --------------------
const toggle = document.getElementById("darkModeToggle");
const body = document.body;
const navbar = document.querySelector(".navbar");
const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
const descripcionText = document.querySelectorAll(
  ".descripcion, .descripcion-text"
);
const footer = document.querySelector("footer");
const sections = document.querySelectorAll("section");
const projectCards = document.querySelectorAll(".project-card");
const projectTitles = document.querySelectorAll(".project-title");
const projectDescriptions = document.querySelectorAll(".project-description");
const modal = document.querySelector(".modal-content");
const modalText = document.querySelector(".modal-body p");

// Aplicar modo claro por defecto
aplicarModoClaro();

toggle.addEventListener("change", function () {
  this.checked ? aplicarModoOscuro() : aplicarModoClaro();
});

function aplicarModoClaro() {
  body.style.background = "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)";
  body.style.color = "#1F2937";

  cambiarNavbar(
    "#ffffff",
    "bg-white",
    "bg-dark",
    "rgba(255,255,255,0.95)",
    "1px solid rgba(255,255,255,0.2)",
    "#333"
  );
  descripcionText.forEach((el) => (el.style.color = "#1F2937"));
  cambiarElementos(
    sections,
    "rgba(255,255,255,0.9)",
    "1px solid rgba(255,255,255,0.2)"
  );
  cambiarElementos(
    projectCards,
    "rgba(255,255,255,0.95)",
    "1px solid rgba(255,255,255,0.2)"
  );
  projectTitles.forEach((t) => (t.style.color = "#1F2937"));
  projectDescriptions.forEach((d) => (d.style.color = "#6B7280"));

  footer.style.background = "rgba(255,255,255,0.9)";
  footer.style.borderTop = "2px solid #1F2937";
  footer.style.border = "1px solid rgba(255,255,255,0.2)";
  footer.style.color = "#1F2937";

  if (modal) modal.style.background = "rgba(255,255,255,0.95)";
  if (modal) modal.style.border = "1px solid rgba(255,255,255,0.2)";
  if (modalText) modalText.style.color = "#333";
}

function aplicarModoOscuro() {
  body.style.background =
    "linear-gradient(135deg, #2c3e50 0%, #34495e 50%, #1a252f 100%)";
  body.style.color = "#ffffff";

  cambiarNavbar(
    "#2c2c2c",
    "bg-dark",
    "bg-white",
    "rgba(44,44,44,0.95)",
    "1px solid rgba(255,255,255,0.1)",
    "#ffffff"
  );
  descripcionText.forEach((el) => (el.style.color = "#ffffff"));
  cambiarElementos(
    sections,
    "rgba(44,44,44,0.9)",
    "1px solid rgba(255,255,255,0.1)"
  );
  cambiarElementos(
    projectCards,
    "rgba(44,44,44,0.95)",
    "1px solid rgba(255,255,255,0.1)"
  );
  projectTitles.forEach((t) => (t.style.color = "#ffffff"));
  projectDescriptions.forEach((d) => (d.style.color = "#d1d5db"));

  footer.style.background = "rgba(44,44,44,0.9)";
  footer.style.borderTop = "2px solid #e0e0db";
  footer.style.border = "1px solid rgba(255,255,255,0.1)";
  footer.style.color = "#ffffff";

  if (modal) modal.style.background = "rgba(44,44,44,0.95)";
  if (modal) modal.style.border = "1px solid rgba(255,255,255,0.1)";
  if (modalText) modalText.style.color = "#ffffff";
}

// Funciones auxiliares
function cambiarElementos(elements, bg, border) {
  elements.forEach((el) => {
    el.style.background = bg;
    el.style.border = border;
  });
}

function cambiarNavbar(
  bgColor,
  addClass,
  removeClass,
  bgStyle,
  borderStyle,
  linkColor
) {
  navbar.style.background = bgStyle;
  navbar.style.backdropFilter = "blur(10px)";
  navbar.style.border = borderStyle;
  navbar.classList.remove(removeClass);
  navbar.classList.add(addClass);
  navLinks.forEach((link) => (link.style.color = linkColor));
}

// -------------------- ANIMACIONES, SCROLL, CARRUSEL Y NAVBAR SCROLL --------------------
document.addEventListener("DOMContentLoaded", function () {
  const navDots = document.querySelectorAll(".nav-dot");
  let isScrolling = false;
  let currentSection = 0;

  // --- FUNCIONALIDAD OCULTAR / MOSTRAR NAVBAR ---
  let lastScrollTop = 0;
  const scrollThreshold = 100;

  function hideNavbar() {
    navbar.classList.add("hidden");
  }
  function showNavbar() {
    navbar.classList.remove("hidden");
  }

  window.addEventListener("scroll", function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > scrollThreshold) {
      if (scrollTop > lastScrollTop) hideNavbar();
      else showNavbar();
    } else showNavbar();

    lastScrollTop = scrollTop;
  });

  document.addEventListener("mousemove", function (e) {
    if (e.clientY < 100) showNavbar();
  });

  // --- SCROLL SECCIONES ---
  function showSection(section) {
    section.classList.add("visible");
  }
  function updateNavDots(index) {
    navDots.forEach((dot, i) => dot.classList.toggle("active", i === index));
  }

  function scrollToSection(sectionIndex) {
    if (sectionIndex < 0) sectionIndex = 0;
    if (sectionIndex >= sections.length) sectionIndex = sections.length - 1;
    if (isScrolling) return;
    isScrolling = true;
    currentSection = sectionIndex;

    const targetPosition = sections[sectionIndex].offsetTop - 100;
    window.scrollTo({ top: targetPosition, behavior: "smooth" });
    updateNavDots(sectionIndex);
    showSection(sections[sectionIndex]);

    const check = () => {
      if (Math.abs(window.scrollY - targetPosition) < 5) isScrolling = false;
      else requestAnimationFrame(check);
    };
    requestAnimationFrame(check);
  }

  document.addEventListener("keydown", (e) => {
    if (["ArrowDown", "PageDown"].includes(e.key)) {
      e.preventDefault();
      scrollToSection(currentSection + 1);
    } else if (["ArrowUp", "PageUp"].includes(e.key)) {
      e.preventDefault();
      scrollToSection(currentSection - 1);
    }
    if (e.key === "ArrowLeft") prevSlide();
    if (e.key === "ArrowRight") nextSlide();
  });

  window.addEventListener(
    "wheel",
    (e) => {
      if (isScrolling) return;
      if (e.deltaY > 0) scrollToSection(currentSection + 1);
      else if (e.deltaY < 0) scrollToSection(currentSection - 1);
    },
    { passive: true }
  );

  navDots.forEach((dot, index) =>
    dot.addEventListener("click", () => scrollToSection(index))
  );
  if (sections[0]) {
    showSection(sections[0]);
    updateNavDots(0);
  }

  // --- CARRUSEL ---
  let currentSlide = 0;
  const slides = projectCards;
  const indicators = document.querySelectorAll(".indicator");
  const totalSlides = slides.length;

  function showSlide(index) {
    slides.forEach((s) => s.classList.remove("active", "prev"));
    indicators.forEach((i) => i.classList.remove("active"));
    currentSlide = (index + totalSlides) % totalSlides;
    slides[currentSlide].classList.add("active");
    if (indicators[currentSlide])
      indicators[currentSlide].classList.add("active");
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }
  function prevSlide() {
    showSlide(currentSlide - 1);
  }

  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  prevBtn?.addEventListener("click", prevSlide);
  nextBtn?.addEventListener("click", nextSlide);

  indicators.forEach((indicator, index) =>
    indicator.addEventListener("click", () => showSlide(index))
  );

  let autoPlayInterval;
  function startAutoPlay() {
    autoPlayInterval = setInterval(nextSlide, 5000);
  }
  function stopAutoPlay() {
    if (autoPlayInterval) clearInterval(autoPlayInterval);
  }

  const carouselContainer = document.querySelector(".proyectos-carousel");
  carouselContainer?.addEventListener("mouseenter", stopAutoPlay);
  carouselContainer?.addEventListener("mouseleave", startAutoPlay);

  if (slides.length > 0) showSlide(0);
  startAutoPlay();
});
