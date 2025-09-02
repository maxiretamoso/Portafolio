// Animaciones y efectos de la página
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    const navDots = document.querySelectorAll('.nav-dot');
    const footer = document.querySelector('footer');
    let isScrolling = false;
    let currentSection = 0;

    // Función para mostrar secciones con animación
    function showSection(section) {
        section.classList.add('visible');
    }

    // Función para actualizar puntos de navegación
    function updateNavDots(activeIndex) {
        navDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === activeIndex);
        });
    }

    // Función para scroll suave a sección
    function scrollToSection(sectionIndex) {
        if (isScrolling) return;
        
        isScrolling = true;
        currentSection = sectionIndex;
        
        const targetSection = sections[sectionIndex];
        const targetPosition = targetSection.offsetTop - 100;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        
        updateNavDots(sectionIndex);
        
        setTimeout(() => {
            isScrolling = false;
        }, 1000);
    }

    // Event listeners para los puntos de navegación
    navDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            scrollToSection(index);
        });
    });

    // Observer para animar secciones cuando entran en viewport
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                showSection(entry.target);
                
                // Actualizar punto de navegación activo
                const sectionIndex = Array.from(sections).indexOf(entry.target);
                updateNavDots(sectionIndex);
                currentSection = sectionIndex;
            }
        });
    }, observerOptions);

    // Observar todas las secciones
    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Observer para el footer
    const footerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.5 });

    footerObserver.observe(footer);

    // Scroll snapping y navegación por teclado
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        
        scrollTimeout = setTimeout(() => {
            if (isScrolling) return;
            
            const scrollPosition = window.scrollY + window.innerHeight / 2;
            
            sections.forEach((section, index) => {
                const sectionTop = section.offsetTop - 100;
                const sectionBottom = sectionTop + section.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    if (currentSection !== index) {
                        currentSection = index;
                        updateNavDots(index);
                    }
                }
            });
        }, 100);
    });

    // Navegación por teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown' || e.key === 'PageDown') {
            e.preventDefault();
            if (currentSection < sections.length - 1) {
                scrollToSection(currentSection + 1);
            }
        } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
            e.preventDefault();
            if (currentSection > 0) {
                scrollToSection(currentSection - 1);
            }
        }
    });

    // Mostrar primera sección después del loader
    setTimeout(() => {
        if (sections[0]) {
            showSection(sections[0]);
            updateNavDots(0);
        }
    }, 3500); // Después del loader
}); 