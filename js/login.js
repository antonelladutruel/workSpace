
//Evento de click que valida los datos del usuario en LocalStorage y redirecciona a index.html

document.addEventListener('DOMContentLoaded', function() {
    const btnAccess = document.getElementById("btnAccess");

    btnAccess.addEventListener('click', function(event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Validar si los campos están vacíos
        if (!username || !password) {
            alert("Debes completar los campos");
            return; // Salir de la función si los campos están vacíos
        }

        // Validar el formato del correo electrónico
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(username)) {
            alert("Por favor, introduce un correo electrónico válido.");
            return; // Salir de la función si el correo no es válido
        }

        // Si todo es válido, guardar en LocalStorage y redirigir
        localStorage.setItem("nombreUsuario", username);
        localStorage.setItem("contraseña", password);
        window.location.href = "index.html";
    });
});