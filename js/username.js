window.onload = function() {
    const navItems = document.querySelectorAll('nav ul li');
    const lastNavItem = navItems[navItems.length - 1];

    const lastAnchor = document.createElement('a');
    lastAnchor.classList.add("nav-link");
    lastAnchor.href = 'my-profile.html';
    lastAnchor.textContent = localStorage.getItem('nombreUsuario');
    
    lastNavItem.appendChild(lastAnchor);
}