document.addEventListener("DOMContentLoaded", function() {
    const imageInput = document.getElementById("image-input");
    const uploadButton = document.getElementById("upload-button");
    const profileImage = document.getElementById("profile-image");

    // Cargar imagen de localStorage al cargar la página
    const savedImage = localStorage.getItem("profileImage");
    if (savedImage) {
        profileImage.src = savedImage;
    }

    // Función para convertir archivo a Base64
    function fileToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }

    // Evento para subir la imagen
    uploadButton.addEventListener("click", async () => {
        const file = imageInput.files[0];
        if (file) {
            try {
                // Convertir archivo a Base64
                const base64Image = await fileToBase64(file);

                // Guardar en localStorage
                localStorage.setItem("profileImage", base64Image);

                // Mostrar la imagen en el perfil
                profileImage.src = base64Image;
            } catch (error) {
                console.error("Error al cargar la imagen", error);
            }
        } else {
            alert("Por favor, selecciona una imagen");
        }
    });
});


document.addEventListener("DOMContentLoaded", function() {
    const username = localStorage.getItem('nombreUsuario');

    const emailInput = document.getElementById('email');
    emailInput.value = `${username}`; 
});  

// Entrega 5 pauta 3
document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe y recargue la página

    // Obtener valores de los campos del formulario
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const telefono = document.getElementById('telefono').value;
    const segundoNombre = document.getElementById('segundoNombre').value;
    const segundoApellido = document.getElementById('segundoApellido').value;
    // No se incluye el campo de e-mail

    // Guardar en localStorage
    localStorage.setItem('nombre', nombre);
    localStorage.setItem('apellido', apellido);
    localStorage.setItem('telefono', telefono);
    localStorage.setItem('segundoNombre', segundoNombre);
    localStorage.setItem('segundoApellido', segundoApellido);

    // Mensaje de confirmación
    alert('Sus datos se han guardado.');
});

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