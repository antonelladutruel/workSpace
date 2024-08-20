document.addEventListener('DOMContentLoaded', function() {

    const btnAccess = document.getElementById("btnAccess");
    btnAccess.addEventListener('click', function(event) {
        const username = getElementById('username').value.trim();
        const password = getElementById('password').value.trim();
        
        if ([username,password].includes("")) {
            alert("Debes completar los campos")
        } else {
            event.preventDefault();
            window.location.href = "index.html";
        }
    })
});

