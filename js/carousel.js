// Carrusel de proyectos
let currentSlide = 0;
const slides = document.querySelectorAll('.project-card');
const indicators = document.querySelectorAll('.indicator');
const totalSlides = slides.length;

// Función para mostrar una slide específica
function showSlide(index) {
  // Ocultar todas las slides
  slides.forEach(slide => {
    slide.classList.remove('active', 'prev');
  });
  
  // Remover clase active de todos los indicadores
  indicators.forEach(indicator => {
    indicator.classList.remove('active');
  });
  
  // Mostrar la slide actual
  if (slides[index]) {
    slides[index].classList.add('active');
  }
  
  // Activar el indicador correspondiente
  if (indicators[index]) {
    indicators[index].classList.add('active');
  }
  
  currentSlide = index;
  
  // Actualizar estado de los botones
  updateButtons();
}

// Función para ir a la siguiente slide
function nextSlide() {
  const next = (currentSlide + 1) % totalSlides;
  showSlide(next);
}

// Función para ir a la slide anterior
function prevSlide() {
  const prev = (currentSlide - 1 + totalSlides) % totalSlides;
  showSlide(prev);
}

// Función para ir a una slide específica
function goToSlide(index) {
  showSlide(index);
}

// Función para actualizar el estado de los botones
function updateButtons() {
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  
  if (prevBtn) {
    prevBtn.disabled = currentSlide === 0;
  }
  
  if (nextBtn) {
    nextBtn.disabled = currentSlide === totalSlides - 1;
  }
}

// Inicializar el carrusel
function initCarousel() {
  if (slides.length > 0) {
    showSlide(0);
  }
}

// Event listeners para teclado
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') {
    prevSlide();
  } else if (e.key === 'ArrowRight') {
    nextSlide();
  }
});

// Auto-play del carrusel (opcional)
let autoPlayInterval;

function startAutoPlay() {
  autoPlayInterval = setInterval(() => {
    nextSlide();
  }, 5000); // Cambiar cada 5 segundos
}

function stopAutoPlay() {
  if (autoPlayInterval) {
    clearInterval(autoPlayInterval);
  }
}

// Pausar auto-play cuando el usuario interactúa
document.querySelector('.proyectos-carousel')?.addEventListener('mouseenter', stopAutoPlay);
document.querySelector('.proyectos-carousel')?.addEventListener('mouseleave', startAutoPlay);

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  initCarousel();
  startAutoPlay();
}); 