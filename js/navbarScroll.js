// Funcionalidad para ocultar/mostrar navbar al hacer scroll
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    let scrollThreshold = 100; // Umbral para activar la funcionalidad
    
    // Función para ocultar el navbar
    function hideNavbar() {
        navbar.classList.add('hidden');
    }
    
    // Función para mostrar el navbar
    function showNavbar() {
        navbar.classList.remove('hidden');
    }
    
    // Event listener para el scroll
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Solo activar después de cierto scroll
        if (scrollTop > scrollThreshold) {
            if (scrollTop > lastScrollTop) {
                // Scrolling hacia abajo - ocultar navbar
                hideNavbar();
            } else {
                // Scrolling hacia arriba - mostrar navbar
                showNavbar();
            }
        } else {
            // Cerca del top - siempre mostrar navbar
            showNavbar();
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Mostrar navbar al hacer hover cerca del top
    document.addEventListener('mouseover', function(e) {
        if (e.clientY < 100) {
            showNavbar();
        }
    });
}); 