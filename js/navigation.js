// Navegación suave y estado activo del navbar
document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".nav-link");
  const navDots = document.querySelectorAll(".nav-dot"); // <-- Agregado
  const sections = document.querySelectorAll("section[id]");

  // Función para navegación suave
  function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
      const offsetTop = element.offsetTop - 100;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  }

  // Función para actualizar el enlace y el punto activo
  function updateActive() {
    const scrollPosition = window.scrollY + 150;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      // Navbar links
      navLinks.forEach((link) => link.classList.remove("active"));
      const activeLink = document.querySelector(`[href="#${sectionId}"]`);
      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        if (activeLink) activeLink.classList.add("active");

        // Nav dots
        navDots.forEach((dot) => dot.classList.remove("active"));
        const activeDot = Array.from(navDots).find(
          (dot) => dot.getAttribute("data-target") === `#${sectionId}`
        );
        if (activeDot) activeDot.classList.add("active");
      }
    });
  }

  // Event listeners para los enlaces del navbar
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const target = this.getAttribute("href");
      smoothScroll(target);
    });
  });

  // Event listeners para los puntos verticales
  navDots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const target = dot.getAttribute("data-target");
      smoothScroll(target);
    });
  });

  // Actualizar estado activo al hacer scroll
  window.addEventListener("scroll", updateActive);

  // Llamada inicial
  updateActive();
});
