document.addEventListener('DOMContentLoaded', function() {
    const btnAccess = document.getElementById("btnAccess");

    btnAccess.addEventListener('click', function(event) {
        event.preventDefault();
        window.location.href = "index.html";
    });
});
