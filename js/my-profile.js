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
