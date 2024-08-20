document.addEventListener('DOMContentLoaded', function() {

    function showAlertError() {
        document.getElementById("alert-danger").classList.add("show");
    }
    
    document.getElementById("btnAccess").addEventListener('click', function(event) {
        
        event.preventDefault();

        let username = document.getElementById('username').value.trim();
        let password = document.getElementById('password').value.trim();
        
        if ([username,password].includes("")) {
            showAlertError();
            console.log("campos requeridos incompletos")
        } else {
            window.location.href = "index.html";
        }
    });
});



