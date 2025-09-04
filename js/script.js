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
  body.style.background = "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 50%, #90caf9 100%)";
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

// -------------------- NAVEGACIÓN SUAVE Y ESTADO ACTIVO --------------------
document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".nav-link");
  const navDots = document.querySelectorAll(".nav-dot");
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

// -------------------- ANIMACIONES, SCROLL, CARRUSEL Y NAVBAR SCROLL --------------------
document.addEventListener("DOMContentLoaded", function () {
  const navDots = document.querySelectorAll(".nav-dot");
  const sections = document.querySelectorAll("section[id]");
  let isScrolling = false;
  let currentSection = 0;

  // Debug: verificar que las secciones se detecten correctamente
  console.log("Secciones detectadas:", sections.length);
  sections.forEach((section, index) => {
    console.log(`Sección ${index}:`, section.id);
  });

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

    if (scrollTop > lastScrollTop) {
      // Scrolling down - hide navbar
      hideNavbar();
    } else {
      // Scrolling up - show navbar (en cualquier momento)
      showNavbar();
    }

    lastScrollTop = scrollTop;
  });

  // Show navbar when mouse is near top (en cualquier momento)
  document.addEventListener("mousemove", function (e) {
    if (e.clientY < 100) {
      showNavbar();
    }
  });

  // Show navbar when scrolling up with wheel
  window.addEventListener("wheel", function(e) {
    if (e.deltaY < 0) { // Scrolling up
      showNavbar();
    }
  }, { passive: true });

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
    } else if (["ArrowLeft"].includes(e.key)) {
      e.preventDefault();
      prevSlide();
    } else if (["ArrowRight"].includes(e.key)) {
      e.preventDefault();
      nextSlide();
    }
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

  // Hacer las funciones globales para los botones del HTML
  window.nextSlide = nextSlide;
  window.prevSlide = prevSlide;
  window.goToSlide = showSlide;
});

// -------------------- MENÚ MÓVIL MODERNO --------------------
document.addEventListener("DOMContentLoaded", function() {
  const navbarToggler = document.querySelector('.navbar-toggler');
  const navbarCollapse = document.querySelector('.navbar-collapse');
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  
  // Crear overlay para el menú móvil
  const overlay = document.createElement('div');
  overlay.className = 'mobile-menu-overlay';
  document.body.appendChild(overlay);
  
  // Función para abrir menú
  function openMobileMenu() {
    navbarCollapse.classList.add('show');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Animar los enlaces
    navLinks.forEach((link, index) => {
      link.style.opacity = '0';
      link.style.transform = 'translateY(20px)';
      link.style.transition = 'all 0.3s ease';
      
      setTimeout(() => {
        link.style.opacity = '1';
        link.style.transform = 'translateY(0)';
      }, index * 100);
    });
  }
  
  // Función para cerrar menú
  function closeMobileMenu() {
    navbarCollapse.classList.remove('show');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    
    // Resetear animaciones
    navLinks.forEach(link => {
      link.style.opacity = '';
      link.style.transform = '';
      link.style.transition = '';
    });
  }
  
  // Event listeners
  if (navbarToggler) {
    navbarToggler.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      if (navbarCollapse.classList.contains('show')) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }
  
  // Cerrar al hacer click en overlay
  overlay.addEventListener('click', closeMobileMenu);
  
  // Cerrar al hacer click en enlaces
  navLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });
  
  // Cerrar con escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && navbarCollapse.classList.contains('show')) {
      closeMobileMenu();
    }
  });
  
  // Cerrar al hacer scroll
  window.addEventListener('scroll', function() {
    if (navbarCollapse.classList.contains('show')) {
      closeMobileMenu();
    }
  });
});

// -------------------- LOADER Y ANIMACIONES DE CARGA --------------------
window.addEventListener("load", () => {
  document.body.classList.add("loading"); // bloquea scroll al inicio

  setTimeout(() => {
    const loader = document.getElementById("loader");
    loader.classList.add("hidden");
    
    // Permitir scroll otra vez
    document.body.classList.remove("loading");

    // Fade in gradual del contenido principal
    setTimeout(() => {
      const mainContent = document.querySelector('main');
      if (mainContent) {
        mainContent.style.opacity = "1";
      }
    }, 500);

    // Opcional: remover loader del DOM
    loader.addEventListener("transitionend", () => loader.remove());
  }, 3000); // 3 segundos
});

// -------------------- ANIMACIONES AOS Y CONTENIDO PRINCIPAL --------------------
document.addEventListener("DOMContentLoaded", () => {
  // Esperar 5 segundos antes de mostrar main y footer
  setTimeout(() => {
    const main = document.querySelector("main");
    const footer = document.querySelector("footer");
    if(main) main.style.opacity = 1;
    if(footer) footer.classList.add("visible");
    
    // Inicializar AOS manualmente (scroll animations)
    const sections = document.querySelectorAll("section");
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          entry.target.classList.add("aos-animate");
        }
      });
    }, { threshold: 0.1 });
    
    sections.forEach(sec => observer.observe(sec));

  }, 5000); // 5000ms = 5 segundos
});

// -------------------- GITHUB API --------------------
document.addEventListener("DOMContentLoaded", function() {
  const GITHUB_USERNAME = 'maxiretamoso'; // Cambia por tu username de GitHub
  const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}`;
  const GITHUB_REPOS_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`;

  // Función para formatear números
  function formatNumber(num) {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  }

  // Función para obtener estadísticas del usuario
  async function fetchUserStats() {
    try {
      const response = await fetch(GITHUB_API_URL);
      const user = await response.json();
      
      document.getElementById('totalRepos').textContent = formatNumber(user.public_repos);
      document.getElementById('totalStars').textContent = formatNumber(user.public_gists);
      document.getElementById('totalForks').textContent = formatNumber(user.followers);
    } catch (error) {
      console.error('Error fetching user stats:', error);
      document.getElementById('totalRepos').textContent = 'Error';
      document.getElementById('totalStars').textContent = 'Error';
      document.getElementById('totalForks').textContent = 'Error';
    }
  }

  // Función para obtener repositorios recientes
  async function fetchRecentRepos() {
    try {
      const response = await fetch(GITHUB_REPOS_URL);
      const repos = await response.json();
      
      const reposGrid = document.getElementById('reposGrid');
      reposGrid.innerHTML = '';
      
      repos.forEach(repo => {
        const repoCard = document.createElement('div');
        repoCard.className = 'repo-card';
        
        const lastUpdate = new Date(repo.updated_at).toLocaleDateString('es-ES');
        
        repoCard.innerHTML = `
          <div class="repo-name">${repo.name}</div>
          <div class="repo-description">${repo.description || 'Sin descripción'}</div>
          <div class="repo-stats">
            <div class="repo-stat">
              <span>⭐</span>
              <span>${formatNumber(repo.stargazers_count)}</span>
            </div>
            <div class="repo-stat">
              <span>🍴</span>
              <span>${formatNumber(repo.forks_count)}</span>
            </div>
            <div class="repo-stat">
              <span>📅</span>
              <span>${lastUpdate}</span>
            </div>
          </div>
          <div class="repo-links">
            <a href="${repo.html_url}" target="_blank" class="repo-link">Ver Repo</a>
            ${repo.homepage ? `<a href="${repo.homepage}" target="_blank" class="repo-link">Ver Demo</a>` : ''}
          </div>
        `;
        
        reposGrid.appendChild(repoCard);
      });
    } catch (error) {
      console.error('Error fetching repos:', error);
      document.getElementById('reposGrid').innerHTML = '<div class="loading-repos">Error al cargar repositorios</div>';
    }
  }

  // Cargar datos cuando se muestre la sección Git
  const gitSection = document.getElementById('git');
  if (gitSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          fetchUserStats();
          fetchRecentRepos();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    observer.observe(gitSection);
  }
});
