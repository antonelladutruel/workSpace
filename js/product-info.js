document.addEventListener('DOMContentLoaded', function() {
    const catId = localStorage.getItem('catID');
    const productId = localStorage.getItem('productId');
    const DATA_URL = `https://japceibal.github.io/emercado-api/cats_products/${catId}.json`;
    const PRODUCT_INFO_COMMENTS_URL = `https://japceibal.github.io/emercado-api/products_comments/${productId}.json`;

    // 1. Cargar información del producto
    fetch(DATA_URL)
    .then(res => res.json())
    .then(data => {
        const productsArray = data.products;
        const product = productsArray.find(p => p.id === parseInt(productId));

        if (product) {
            document.querySelector(".productName").textContent = product.name;
            document.querySelector(".productDescription").textContent = product.description;
            document.querySelector(".productCost").textContent = `${product.currency} ${product.cost}`;
            document.querySelector(".productSoldCount").textContent = `Cantidad de vendidos: ${product.soldCount}`;
            document.querySelector(".productImage").src = product.image;
        }
    })
    .catch(error => console.error('Error al cargar los datos del producto:', error));

    // 2. Cargar comentarios del producto
    fetch(PRODUCT_INFO_COMMENTS_URL)
    .then(res => {
        if (!res.ok) {
            throw new Error("Error al obtener los comentarios");
        }
        return res.json();
    })
    .then(data => {
        const commentsContainer = document.querySelector(".productComments");

        data.forEach(comment => {
            const commentElement = createCommentElement(comment.user, comment.dateTime, comment.description, comment.score);
            commentsContainer.appendChild(commentElement);
        });
    })
    .catch(error => {
        console.error("Error al cargar los comentarios:", error);
    });

    // 3. Envío de nuevo comentario
    document.getElementById("ratingForm").addEventListener('submit', function(event) {
        event.preventDefault();

        const userComment = document.getElementById("userComment").value;
        const userRating = document.getElementById("userRating").value;
        const username = localStorage.getItem("nombreUsuario");

        if (userRating === "0") {
            alert("Selecciona una calificación antes de enviar.");
            return;
        }

        const currentDateTime = new Date().toLocaleString();
        const newComment = createCommentElement(username, currentDateTime, userComment, userRating);
        document.querySelector(".productComments").appendChild(newComment);

        // Limpiar el formulario después de enviar
        document.getElementById("userComment").value = "";
        document.getElementById("userRating").value = "0";
        clearSelectedStars();
    });

    // 4. Cargar productos relacionados
    fetch(DATA_URL)
    .then(res => res.json())
    .then(data => {
        const productsArray = data.products;
        const product = productsArray.find(p => p.id === parseInt(productId));

        if (product) {
            const relatedProducts = productsArray.filter(p => p.id !== product.id).slice(0, 4);
            loadRelatedProducts(relatedProducts);
        }
    })
    .catch(error => console.error('Error al cargar los datos del producto:', error));

   

    // 5. Selección de calificación mediante estrellas
    const stars = document.querySelectorAll('.star');
    stars.forEach(star => {
        star.addEventListener('click', function() {
            let rating = this.getAttribute('data-value');
            document.getElementById("userRating").value = rating;

            // Remover selección previa
            stars.forEach(s => s.classList.remove('selected'));

            // Marcar las estrellas hasta la seleccionada
            for (let i = 0; i < rating; i++) {
                stars[i].classList.add('selected');
            }
        });
    });
});

// Función para crear el elemento de comentario en el DOM
function createCommentElement(user, date, description, score) {
    const commentElement = document.createElement("div");
    commentElement.classList.add("comment");

    const stars = generateStars(score);
    commentElement.innerHTML = `
        <p><strong>${user}</strong> - ${date}</p>
        <div class="stars">${stars}</div>
        <p>${description}</p>
    `;

    return commentElement;
}

// Función para generar las estrellas según el puntaje
function generateStars(score) {
    let stars = "";
    for (let i = 1; i <= 5; i++) {
        if (i <= score) {
            stars += `<span class="fa fa-star checked"></span>`;
        } else {
            stars += `<span class="fa fa-star"></span>`;
        }
    }
    return stars;
}

// Función para cargar productos relacionados en el DOM
function loadRelatedProducts(relatedProducts) {
    const container = document.getElementById('related-products-container');
    container.innerHTML = "";

    relatedProducts.forEach(product => {
        const productItem = document.createElement('div');
        productItem.classList.add('col-12', 'col-sm-6', 'col-md-4', 'col-lg-3');

        productItem.innerHTML = `
            <div class="card mb-4">
                <a href="product-info.html" onclick="setProductId(${product.id})">
                    <img class="card-img-top" src="${product.image}" alt="${product.name}">
                    <div class="card-body">
                        <p class="card-title">${product.name}</p>
                    </div>
                </a>
            </div>
        `;

        container.appendChild(productItem);
    });
}

function setProductId(id) {
    localStorage.setItem('productId', id);
}

const darkMode = document.querySelector(".dark-mode");
const body = document.body;

darkMode.addEventListener("click",()=>{
    body.classList.toggle("active");
});


// Entrega 6, Pauta 2 y agregar mas productos
const button = document.getElementById("containerbutton");

button.addEventListener("click", function() {
    const productId = localStorage.getItem("productId");

    // Recuperar el carrito actual del local storage
    let productCart = localStorage.getItem("productCart");

    // Si no existe o no es un array, inicializar como array vacío
    if (!productCart) {
        productCart = [];
    } else {
        // Intentar convertir el carrito recuperado en un array
        try {
            productCart = JSON.parse(productCart);
            // Asegurarse de que es un array
            if (!Array.isArray(productCart)) {
                productCart = [];
            }
        } catch (error) {
            // Si hubo un error en la conversión, inicializar como array vacío
            productCart = [];
        }
    }

    // Agregar el productId al carrito
    productCart.push(productId);

    // Guardar el carrito actualizado en el local storage
    localStorage.setItem('productCart', JSON.stringify(productCart));

    // Redirigir a la página del carrito
    window.location.href = "cart.html"; 
});
