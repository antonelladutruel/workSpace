document.addEventListener('DOMContentLoaded', function() {
    const catId = localStorage.getItem('catID');
    const DATA_URL = `https://japceibal.github.io/emercado-api/cats_products/${catId}.json`;
    const productId = localStorage.getItem('productId');
    const PRODUCT_INFO_COMMENTS_URL = `https://japceibal.github.io/emercado-api/products_comments/${productId}.json`;

    // Fetch para obtener los comentarios del producto
    fetch(PRODUCT_INFO_COMMENTS_URL)
    .then(res => {
        if (!res.ok) {
            throw new Error("Error al obtener los comentarios");
        }
        return res.json();
    })
    .then(data => {
        // Mostrar los comentarios en el HTML
        const commentsContainer = document.querySelector(".productComments");

        data.forEach(comment => {
            const commentElement = document.createElement("div");
            commentElement.classList.add("comment");

            // Generar las estrellas basadas en la puntuación del comentario
            const stars = generateStars(comment.score);

            commentElement.innerHTML = `
                <p><strong>${comment.user}</strong> - ${comment.dateTime}</p>
                <div class="stars">${stars}</div>
                <p>${comment.description}</p>
            `;

            commentsContainer.appendChild(commentElement);
        });
    })
    .catch(error => {
        console.error("Error al cargar los comentarios:", error);
    });

function generateStars(score) {
    let stars = "";
    
    for (let i = 1; i <= 5; i++) {
        if (i <= score) {
            stars += `<span class="fa fa-star checked"></span>`; // Estrella seleccionada (checked)
        } else {
            stars += `<span class="fa fa-star"></span>`; // Estrella sin seleccionar
        }
    }

    return stars;
}

    // Fetch para obtener la información del producto
    fetch(DATA_URL)
    .then(res => res.json())
    .then(data => {
        const productsArray = data.products;
        const product = productsArray.find(p => p.id === parseInt(productId));

        if (product) {
            // Mostrar la información del producto en las etiquetas HTML correspondientes
            document.querySelector(".productName").textContent = product.name;
            document.querySelector(".productDescription").textContent = product.description;
            document.querySelector(".productCost").textContent = `${product.currency} ${product.cost}`;
            document.querySelector(".productSoldCount").textContent = `Cantidad de vendidos: ${product.soldCount}`;
            document.querySelector(".productImage").src = product.image;
        }
    })
    .catch(error => console.error('Error al cargar los datos del producto:', error));
});

// Validación de usuario registrado
document.addEventListener('DOMContentLoaded', function() {
    const currentPath = window.location.pathname;
    const loginPagePath = "/login.html";  

    if (currentPath !== loginPagePath) {
        const username = localStorage.getItem("nombreUsuario");
        const password = localStorage.getItem("contraseña");

        if (!username || !password) {
            alert("Debes iniciar sesión para acceder a esta página.");
            window.location.href = "login.html"; 
        }
    }
});

// Funcion para agregar productos relacionados

document.addEventListener('DOMContentLoaded', function() {
    const catId = localStorage.getItem('catID');
    const DATA_URL = `https://japceibal.github.io/emercado-api/cats_products/${catId}.json`;
    const productId = localStorage.getItem('productId');

    // Fetch para obtener la información del producto y mostrar productos relacionados
    fetch(DATA_URL)
    .then(res => res.json())
    .then(data => {
        const productsArray = data.products;
        const product = productsArray.find(p => p.id === parseInt(productId));

        if (product) {
            // Mostrar la información del producto en las etiquetas HTML correspondientes
            document.querySelector(".productName").textContent = product.name;
            document.querySelector(".productDescription").textContent = product.description;
            document.querySelector(".productCost").textContent = `${product.currency} ${product.cost}`;
            document.querySelector(".productSoldCount").textContent = `Cantidad de vendidos: ${product.soldCount}`;
            document.querySelector(".productImage").src = product.image;

            // Cargar productos relacionados (puedes personalizar la lógica para definir qué productos mostrar)
            const relatedProducts = productsArray.filter(p => p.id !== product.id).slice(0, 4); // Muestra 4 productos relacionados
            loadRelatedProducts(relatedProducts);
        }
    })
    .catch(error => console.error('Error al cargar los datos del producto:', error));
});

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