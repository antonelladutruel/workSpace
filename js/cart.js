// Obtener el valor del carrito del localStorage
let productCart = localStorage.getItem("productCart");

if (!productCart) {
    alert("No hay productos cargados en el carrito.");
};


const catId = localStorage.getItem('catID');
    const productId = localStorage.getItem('productId');
    const DATA_URL = `https://japceibal.github.io/emercado-api/cats_products/${catId}.json`;

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
            document.querySelector(".productImage").src = product.image;
            
        }
        else {
            document.querySelector(".card").classList.add("hidden"); // Oculta la tarjeta si no hay producto
        }
    })
    .catch(error => console.error('Error al cargar los datos del producto:', error));


