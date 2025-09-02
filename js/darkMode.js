const toggle = document.getElementById('darkModeToggle');
const body = document.body;
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
const descripcionText = document.querySelectorAll('.descripcion, .descripcion-text');
const footer = document.querySelector('footer');

// Aplicar modo claro por defecto
aplicarModoClaro();

toggle.addEventListener('change', function() {
  if(this.checked){
    aplicarModoOscuro();
  } else {
    aplicarModoClaro();
  }
});

function aplicarModoClaro() {
  // Cambiar colores del body
  body.style.background = 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)';
  body.style.color = '#1F2937';

  // Cambiar navbar
  navbar.style.background = 'rgba(255, 255, 255, 0.95)';
  navbar.style.backdropFilter = 'blur(10px)';
  navbar.style.border = '1px solid rgba(255, 255, 255, 0.2)';

  // Cambiar clases del navbar
  navbar.classList.remove('bg-dark');
  navbar.classList.add('bg-white');

  // Cambiar enlaces del navbar
  navLinks.forEach(link => {
    link.style.color = '#333';
    link.classList.remove('active');
  });

  // Cambiar textos de descripción
  descripcionText.forEach(el => el.style.color = '#1F2937');

  // Cambiar secciones (tarjetas)
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    section.style.background = 'rgba(255, 255, 255, 0.9)';
    section.style.border = '1px solid rgba(255, 255, 255, 0.2)';
  });
  
  // Cambiar tarjetas de proyectos
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    card.style.background = 'rgba(255, 255, 255, 0.95)';
    card.style.border = '1px solid rgba(255, 255, 255, 0.2)';
  });
  
  const projectTitles = document.querySelectorAll('.project-title');
  projectTitles.forEach(title => {
    title.style.color = '#1F2937';
  });
  
  const projectDescriptions = document.querySelectorAll('.project-description');
  projectDescriptions.forEach(desc => {
    desc.style.color = '#6B7280';
  });

  // Cambiar footer
  footer.style.borderTop = '2px solid #1F2937';
  footer.style.color = '#1F2937';
  footer.style.background = 'rgba(255, 255, 255, 0.9)';
  footer.style.border = '1px solid rgba(255, 255, 255, 0.2)';
  
  // Cambiar modal para modo claro
  const modal = document.querySelector('.modal-content');
  if (modal) {
    modal.style.background = 'rgba(255, 255, 255, 0.95)';
    modal.style.border = '1px solid rgba(255, 255, 255, 0.2)';
  }
  
  const modalText = document.querySelector('.modal-body p');
  if (modalText) {
    modalText.style.color = '#333';
  }
}

function aplicarModoOscuro() {
  // Cambiar colores del body
  body.style.background = 'linear-gradient(135deg, #2c3e50 0%, #34495e 50%, #1a252f 100%)';
  body.style.color = '#ffffff';

  // Cambiar navbar
  navbar.style.background = 'rgba(44, 44, 44, 0.95)';
  navbar.style.backdropFilter = 'blur(10px)';
  navbar.style.border = '1px solid rgba(255, 255, 255, 0.1)';

  // Cambiar clases del navbar
  navbar.classList.remove('bg-white');
  navbar.classList.add('bg-dark');

  // Cambiar enlaces del navbar
  navLinks.forEach(link => {
    link.style.color = '#ffffff';
    link.classList.remove('active');
  });

  // Cambiar textos de descripción
  descripcionText.forEach(el => el.style.color = '#ffffff');

  // Cambiar secciones (tarjetas)
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    section.style.background = 'rgba(44, 44, 44, 0.9)';
    section.style.border = '1px solid rgba(255, 255, 255, 0.1)';
  });
  
  // Cambiar tarjetas de proyectos
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    card.style.background = 'rgba(44, 44, 44, 0.95)';
    card.style.border = '1px solid rgba(255, 255, 255, 0.1)';
  });
  
  const projectTitles = document.querySelectorAll('.project-title');
  projectTitles.forEach(title => {
    title.style.color = '#ffffff';
  });
  
  const projectDescriptions = document.querySelectorAll('.project-description');
  projectDescriptions.forEach(desc => {
    desc.style.color = '#d1d5db';
  });

  // Cambiar footer
  footer.style.borderTop = '2px solid #e0e0db';
  footer.style.color = '#ffffff';
  footer.style.background = 'rgba(44, 44, 44, 0.9)';
  footer.style.border = '1px solid rgba(255, 255, 255, 0.1)';
  
  // Cambiar modal para modo oscuro
  const modal = document.querySelector('.modal-content');
  if (modal) {
    modal.style.background = 'rgba(44, 44, 44, 0.95)';
    modal.style.border = '1px solid rgba(255, 255, 255, 0.1)';
  }
  
  const modalText = document.querySelector('.modal-body p');
  if (modalText) {
    modalText.style.color = '#ffffff';
  }
}