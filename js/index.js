document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
});


//Se añade validación de usuario registrado en index.js, categories.js y sell.js
document.addEventListener('DOMContentLoaded', function() {
    const currentPath = window.location.pathname;
    const loginPagePath = "/login.html";  

    // Verifica si no estamos en la página de login
    if (currentPath !== loginPagePath) {
        const username = localStorage.getItem("nombreUsuario");
        const password = localStorage.getItem("contraseña");

        // Si no hay nombre de usuario o contraseña en localStorage, redirige al login
    if (!username || !password) {
            alert("Debes iniciar sesión para acceder a esta página.");
            window.location.href = "login.html"; 
        }
    }
});


document.addEventListener("DOMContentLoaded", function() {
    let valor = localStorage.getItem('nombreUsuario');
    let container = document.getElementsByClassName("localStorageData")[0]; 

        container.textContent = `${valor}`;
        container.classList.add("nav-link"); 
    
});

