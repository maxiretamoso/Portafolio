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
  document.body.classList.remove('dark-mode');
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
  document.body.classList.add('dark-mode');
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
  const sections = document.querySelectorAll("section[id], footer[id]");

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

  // Debug removido

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

  // Mostrar navbar con leve scroll hacia arriba en cualquier momento (touch/scroll)
  let lastY = window.scrollY;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y < lastY - 5) showNavbar();
    lastY = y;
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

  // Desplazamiento por secciones deshabilitado: solo flechas izquierda/derecha mantienen carrousels
  document.addEventListener("keydown", (e) => {
    if (["ArrowLeft"].includes(e.key)) {
      e.preventDefault();
      prevSlide();
    } else if (["ArrowRight"].includes(e.key)) {
      e.preventDefault();
      nextSlide();
    }
  });

  // Wheel no pasivo para poder prevenir default según borde de sección
  // Deshabilitado el handler de wheel que hacía snap por secciones

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
    stopAutoPlay();
    autoPlayInterval = setInterval(nextSlide, 5000);
  }
  function stopAutoPlay() {
    if (autoPlayInterval) clearInterval(autoPlayInterval);
  }

  const carouselContainer = document.querySelector(".proyectos-carousel");
  carouselContainer?.addEventListener("mouseenter", stopAutoPlay);
  carouselContainer?.addEventListener("mouseleave", startAutoPlay);

  // Swipe táctil (infinito) para proyectos (móvil)
  let touchStartX = 0;
  let touchEndX = 0;
  function handleGesture() {
    const delta = touchEndX - touchStartX;
    if (Math.abs(delta) < 40) return;
    if (delta < 0) nextSlide(); else prevSlide();
  }
  carouselContainer?.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    stopAutoPlay();
  }, { passive: true });
  carouselContainer?.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleGesture();
    setTimeout(startAutoPlay, 3000);
  });

  if (slides.length > 0) showSlide(0);
  startAutoPlay();

  // Hacer las funciones globales para los botones del HTML
  window.nextSlide = nextSlide;
  window.prevSlide = prevSlide;
  window.goToSlide = showSlide;

  // Logo navbar: girar 360° al click
  const logoImg = document.querySelector('.imglogo img');
  if (logoImg) {
    logoImg.addEventListener('click', (e) => {
      e.preventDefault();
      logoImg.classList.remove('spin');
      // forzar reflow para reiniciar animación
      void logoImg.offsetWidth;
      logoImg.classList.add('spin');
    });
  }
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

  // Botón volver arriba
  const backTop = document.querySelector('.back-to-top-btn');
  if (backTop) {
    backTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    const toggleBackTop = () => {
      if (window.scrollY > 400) backTop.classList.remove('hidden');
      else backTop.classList.add('hidden');
    };
    window.addEventListener('scroll', toggleBackTop, { passive: true });
    toggleBackTop();
  }
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
// -------------------- GITHUB API --------------------
document.addEventListener("DOMContentLoaded", function () {
    // Detectar usuario desde el HTML (data-username) o fallback
    const gitSectionEl = document.getElementById("GitHub");
    const GITHUB_USERNAME = (gitSectionEl?.getAttribute('data-username') || "maxiretamoso").trim();
    const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}`;
    const GITHUB_REPOS_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=20`;
    const GITHUB_PROFILE_URL = `https://github.com/${GITHUB_USERNAME}`;

    function getGitHubHeaders() {
      const token = localStorage.getItem('GITHUB_TOKEN');
      return token ? { 'Authorization': `Bearer ${token}` } : {};
    }
  
    // Función para formatear números
    function formatNumber(num) {
      if (num >= 1000) {
        return (num / 1000).toFixed(1) + "k";
      }
      return num.toString();
    }
  
    // Función para obtener estadísticas del usuario
    async function fetchUserStats() {
      try {
        const response = await fetch(GITHUB_API_URL, { headers: { ...getGitHubHeaders(), 'Accept': 'application/vnd.github+json' } });
        const user = await response.json();
  
        // Repos totales
        document.getElementById("totalRepos").textContent = formatNumber(user.public_repos);
  
        // Ahora calculamos estrellas y forks recorriendo los repos
        const reposResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&type=owner&sort=updated&direction=desc`, { headers: { ...getGitHubHeaders(), 'Accept': 'application/vnd.github+json' } });
        const repos = await reposResponse.json();
  
        let totalStars = 0;
        let totalForks = 0;
        repos.forEach(repo => {
          totalStars += repo.stargazers_count;
          totalForks += repo.forks_count;
        });
  
        document.getElementById("totalStars").textContent = formatNumber(totalStars);
        document.getElementById("totalForks").textContent = formatNumber(totalForks);
  
      } catch (error) {
        console.error("Error fetching user stats:", error);
        document.getElementById("totalRepos").textContent = "Error";
        document.getElementById("totalStars").textContent = "Error";
        document.getElementById("totalForks").textContent = "Error";
      }
    }
  
    // Función para obtener repositorios recientes
    async function fetchRecentRepos() {
      try {
        // Traer más repos para alimentar el carrusel (ordenados del más nuevo al más viejo)
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&direction=desc&per_page=20&type=owner`, { headers: { ...getGitHubHeaders(), 'Accept': 'application/vnd.github+json' } });
        let repos = await response.json();
        if (!Array.isArray(repos)) throw new Error('No repos array');

        // Construir carrusel 2 por slide
        const track = document.getElementById('githubCarouselTrack');
        const indicators = document.getElementById('githubIndicators');
        if (track) track.innerHTML = '';
        if (indicators) indicators.innerHTML = '';

        // Crear slides de a 1 (más reciente al más antiguo)
        const slidesData = repos.map(r => [r]);

        // Crear slides
        // Calcular altura del track según la tarjeta más alta de la primera slide
        slidesData.forEach((pair, index) => {
          const slide = document.createElement('div');
          slide.className = 'github-slide' + (index === 0 ? ' active' : '');

          slide.innerHTML = pair.map(repo => {
            if (!repo) return '';
            const lastUpdate = new Date(repo.updated_at).toLocaleDateString('es-ES');
            return `
              <div class="repo-card">
                <div class="repo-name">${repo.name}</div>
                <div class="repo-description">${repo.description || 'Sin descripción'}</div>
                <div class="repo-stats">
                  <div class="repo-stat"><span>⭐</span><span>${formatNumber(repo.stargazers_count)}</span></div>
                  <div class="repo-stat"><span>🍴</span><span>${formatNumber(repo.forks_count)}</span></div>
                  <div class="repo-stat"><span>📅</span><span>${lastUpdate}</span></div>
                </div>
                <div class="repo-links">
                  <a href="${repo.html_url}" target="_blank" class="repo-link">Ver Repo</a>
                  ${repo.homepage ? `<a href="${repo.homepage}" target="_blank" class="repo-link">Ver Demo</a>` : ''}
                </div>
              </div>
            `;
          }).join('');

          track?.appendChild(slide);

          const indicator = document.createElement('span');
          indicator.className = 'indicator' + (index === 0 ? ' active' : '');
          indicator.addEventListener('click', () => showGithubSlide(index));
          indicators?.appendChild(indicator);
        });

        // Inicializar lógica del carrusel GitHub
        initGithubCarousel();
        // Ajustar altura del contenedor al alto del slide activo
        setTimeout(() => {
          const container = document.querySelector('.github-carousel .carousel-container');
          const active = document.querySelector('.github-slide.active');
          if (container && active) {
            container.style.height = active.scrollHeight + 'px';
          }
        }, 50);

        // Construir lenguajes desde API de lenguajes por repo
        buildLanguagesFromAPI(repos);
      } catch (error) {
        console.error("Error fetching repos:", error);
        const track = document.getElementById('githubCarouselTrack');
        const profile = `https://github.com/${GITHUB_USERNAME}`;
        if (track) track.innerHTML = `<div class=\"loading-repos\">No se pudieron cargar repositorios. <a href=\"${profile}\" target=\"_blank\">Ver perfil</a></div>`;
      }
    }
  
    // Cargar datos cuando se muestre la sección GitHub
    const gitSection = document.getElementById("GitHub");
    if (gitSection) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            fetchUserStats();
            fetchRecentRepos();
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
  
      observer.observe(gitSection);
    }

    // --- Carrusel GitHub ---
    let githubCurrentSlide = 0;
    let githubSlides = [];
    let githubIndicators = [];
    let githubAutoPlayInterval;

    function collectGithubDom() {
      githubSlides = Array.from(document.querySelectorAll('.github-slide'));
      githubIndicators = Array.from(document.querySelectorAll('#githubIndicators .indicator'));
    }

    function showGithubSlide(index) {
      collectGithubDom();
      if (githubSlides.length === 0) return;
      githubSlides.forEach(s => s.classList.remove('active', 'prev'));
      githubIndicators.forEach(i => i.classList.remove('active'));
      githubCurrentSlide = (index + githubSlides.length) % githubSlides.length;
      githubSlides[githubCurrentSlide].classList.add('active');
      if (githubIndicators[githubCurrentSlide]) githubIndicators[githubCurrentSlide].classList.add('active');
      // Ajustar altura dinámica al cambiar de slide
      const container = document.querySelector('.github-carousel .carousel-container');
      const active = document.querySelector('.github-slide.active');
      if (container && active) {
        container.style.height = active.scrollHeight + 'px';
      }
    }

    function nextGithubSlide() { showGithubSlide(githubCurrentSlide + 1); }
    function prevGithubSlide() { showGithubSlide(githubCurrentSlide - 1); }

    function startGithubAutoPlay() {
      stopGithubAutoPlay();
      githubAutoPlayInterval = setInterval(nextGithubSlide, 5000);
    }
    function stopGithubAutoPlay() {
      if (githubAutoPlayInterval) clearInterval(githubAutoPlayInterval);
    }

    function initGithubCarousel() {
      collectGithubDom();
      showGithubSlide(0);
      startGithubAutoPlay();
      const container = document.querySelector('.github-carousel');
      container?.addEventListener('mouseenter', stopGithubAutoPlay);
      container?.addEventListener('mouseleave', startGithubAutoPlay);
      // Exponer global para botones inline
      window.nextGithubSlide = nextGithubSlide;
      window.prevGithubSlide = prevGithubSlide;

      // Navegación por teclado izquierda/derecha infinita
      document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          prevGithubSlide();
          // Pausar 8s tras interacción por teclado
          stopGithubAutoPlay();
          setTimeout(startGithubAutoPlay, 8000);
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          nextGithubSlide();
          stopGithubAutoPlay();
          setTimeout(startGithubAutoPlay, 8000);
        }
      });

      // Pausar/reanudar con clics en flechas e indicadores
      const prevBtn = document.querySelector('.github-prev');
      const nextBtn = document.querySelector('.github-next');
      prevBtn?.addEventListener('click', () => { stopGithubAutoPlay(); setTimeout(startGithubAutoPlay, 8000); });
      nextBtn?.addEventListener('click', () => { stopGithubAutoPlay(); setTimeout(startGithubAutoPlay, 8000); });
      githubIndicators.forEach(ind => ind.addEventListener('click', () => { stopGithubAutoPlay(); setTimeout(startGithubAutoPlay, 8000); }));

      // Swipe táctil para GitHub
      let touchStartX = 0;
      let touchEndX = 0;
      function handleGithubGesture() {
        const delta = touchEndX - touchStartX;
        if (Math.abs(delta) < 40) return;
        if (delta < 0) nextGithubSlide(); else prevGithubSlide();
      }
      container?.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        stopGithubAutoPlay();
      }, { passive: true });
      container?.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleGithubGesture();
        setTimeout(startGithubAutoPlay, 3000);
      });
    }

    // --- Lenguajes ---
    async function buildLanguagesFromAPI(repos) {
      const legend = document.getElementById('languagesLegend'); // puede no existir ya
      const grid = document.getElementById('languagesGrid');
      if (!grid) return;
      if (!Array.isArray(repos)) return;
      grid.innerHTML = '<div class="loading-repos">Calculando lenguajes...</div>';

      // Traer hasta 100 repos para cubrir todos los lenguajes usados
      const subset = repos.slice(0, 100);
      const aggregate = {};
      try {
        const languagesArrays = await Promise.all(subset.map(async (repo) => {
          try {
            const res = await fetch(repo.languages_url, { headers: getGitHubHeaders() });
            if (!res.ok) return {};
            return await res.json();
          } catch {
            return {};
          }
        }));
        languagesArrays.forEach(obj => {
          Object.entries(obj).forEach(([lang, bytes]) => {
            aggregate[lang] = (aggregate[lang] || 0) + (typeof bytes === 'number' ? bytes : 0);
          });
        });
        const totalBytes = Object.values(aggregate).reduce((a, b) => a + b, 0);
        const entries = Object.entries(aggregate).sort((a,b) => b[1]-a[1]);
        if (entries.length === 0 || totalBytes === 0) {
          grid.innerHTML = '<div class="loading-repos">Sin datos de lenguajes</div>';
          return;
        }
        grid.innerHTML = '';
        const colorMap = {
          JavaScript: '#f1e05a', TypeScript: '#3178c6', Python: '#3572A5', Java: '#b07219', HTML: '#e34c26', CSS: '#563d7c',
          Shell: '#89e051', C: '#555555', 'C++': '#f34b7d', 'C#': '#178600', Ruby: '#701516', Go: '#00ADD8', PHP: '#4F5D95',
          Swift: '#F05138', Kotlin: '#A97BFF', Dart: '#00B4AB', Rust: '#dea584', Scala: '#c22d40', Vue: '#41B883', Svelte: '#ff3e00',
          TeX: '#3D6117', Haskell: '#5e5086'
        };
        // Tarjetas con logo, color y porcentaje
        const logoMap = {
          JavaScript: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
          TypeScript: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
          Python: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
          Java: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
          HTML: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
          CSS: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
          Shell: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg',
          C: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg',
          'C++': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
          'C#': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg',
          Ruby: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg',
          Go: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg',
          PHP: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg',
          Swift: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg',
          Kotlin: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg',
          Dart: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg',
          Rust: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-plain.svg',
          Scala: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scala/scala-original.svg',
          Vue: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
          Svelte: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg',
          TeX: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/latex/latex-original.svg',
          Haskell: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/haskell/haskell-original.svg'
        };
        entries.forEach(([lang, bytes]) => {
          const pct = Math.round((bytes / totalBytes) * 100);
          const color = colorMap[lang] || '#36c354';
          const logo = logoMap[lang] || '';
          const card = document.createElement('div');
          card.className = 'language-card';
          card.innerHTML = `
            <img src="${logo}" alt="${lang}" class="language-logo"/>
            <span class="language-pct">${pct}%</span>
            <div class="bar"><span style="width:${pct}%; background:${color}"></span></div>
          `;
          grid.appendChild(card);
        });
      } catch (e) {
        console.error('Error calculando lenguajes', e);
        if (grid) grid.innerHTML = '<div class="loading-repos">Error al cargar lenguajes</div>';
      }
    }
  });
  