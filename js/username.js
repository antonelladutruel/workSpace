window.onload = function() {
    const navItems = document.querySelectorAll('nav ul li');
    const lastNavItem = navItems[navItems.length - 1];

    const lastAnchor = document.createElement('a');
    lastAnchor.classList.add("nav-link");
    lastAnchor.href = 'my-profile.html';
    lastAnchor.textContent = localStorage.getItem('nombreUsuario');
    
    lastNavItem.appendChild(lastAnchor);
}

// Entrega 5 - Pauta 2
document.addEventListener("DOMContentLoaded", function() {
    const logoutButton = document.getElementById("logoutButton");

    logoutButton.addEventListener('click', function(event) {
        event.preventDefault(); // Previene la redirección inmediata

        // Borrar los datos de usuario y contraseña del localStorage
        localStorage.removeItem('nombreUsuario');
        localStorage.removeItem('contraseña');

        // Redirigir manualmente a la página de login
        window.location.href = "login.html";
    });
});