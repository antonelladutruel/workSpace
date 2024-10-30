
// Obtener el valor del carrito del localStorage
let productCart = localStorage.getItem("productCart");

// Asegúrate de que productCart sea un array
productCart = productCart ? JSON.parse(productCart) : [];

if (productCart.length === 0) {
    alert("No hay productos cargados en el carrito.");
} else {
    const catId = localStorage.getItem('catID');
    const DATA_URL = `https://japceibal.github.io/emercado-api/cats_products/${catId}.json`;

    // 1. Cargar información de los productos
    fetch(DATA_URL)
        .then(res => res.json())
        .then(data => {
            const productsArray = data.products;

            // Crear un contenedor para los productos
            const productList = document.querySelector(".productList");
            productList.innerHTML = ""; // Limpiar la lista antes de agregar los productos

            // Recorrer cada productId en el carrito
            productCart.forEach(productId => {
                const product = productsArray.find(p => p.id === parseInt(productId));

                if (product) {
                    // Crear un nuevo elemento para mostrar el producto
                    const productItem = document.createElement("li");
                    productItem.classList.add("product-item");

                    productItem.innerHTML = `
                        <img class="productImage" src="${product.image}" alt="Imagen del producto">
                        <div class="productName">Producto: ${product.name}</div>
                        <div class="productDescription">Descripción: ${product.description}</div>
                        <div class="productCost">Precio: ${product.currency} ${product.cost}</div>
                    `;

                    // Añadir el elemento a la lista
                    productList.appendChild(productItem);
                }
            });
        })
        .catch(error => console.error('Error al cargar los datos de los productos:', error));
}

button.addEventListener("click", function() {
    const productId = localStorage.getItem("productId");
    
    // Obtener el carrito del localStorage
    let productCart = localStorage.getItem("productCart");
    productCart = productCart ? JSON.parse(productCart) : [];

    // Agregar el nuevo productId al carrito
    if (!productCart.includes(productId)) { // Evita duplicados si no lo deseas
        productCart.push(productId);
    }

    localStorage.setItem("productCart", JSON.stringify(productCart));

    window.location.href = "cart.html"; 
});