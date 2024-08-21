document.addEventListener('DOMContentLoaded', function() {
    const btnAccess = document.getElementById("btnAccess");
    
    btnAccess.addEventListener('click', function(event) {
        event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
        if (username && password){
        localStorage.setItem("nombreUsuario", username);
    localStorage.setItem("contraseña", password);
    window.location.href = "index.html"}
    else {
        alert("Debes completar los campos")
    }
    });
});