// Obtener el valor del carrito del localStorage
let productCart = localStorage.getItem("productCart");

// Asegúrate de que productCart sea un array
productCart = productCart ? JSON.parse(productCart) : [];

// Crear un objeto para contar las cantidades de cada producto
const productCount = {};

// Contar las cantidades de cada producto
productCart.forEach(productId => {
    productCount[productId] = (productCount[productId] || 0) + 1;
});

if (Object.keys(productCount).length === 0) {
    alert("No hay productos cargados en el carrito.");
} else {
    const categories = ['101', '102', '103', '104', '105', '106', '107', '108', '109']; // IDs de categorías
    const productList = document.querySelector(".productList");
    productList.innerHTML = ""; // Limpiar la lista antes de agregar los productos

    // Declarar `allProducts` fuera de la función para que esté disponible globalmente
    let allProducts = [];

    // Función para cargar productos de cada categoría
    const loadProductsFromCategories = (categories) => {
        const promises = categories.map(catId => {
            const DATA_URL = `https://japceibal.github.io/emercado-api/cats_products/${catId}.json`;
            return fetch(DATA_URL).then(res => res.json());
        });

        // Una vez que se carguen todos los productos
        Promise.all(promises)
            .then(dataArray => {
                allProducts = dataArray.flatMap(data => data.products); // Asignar todos los productos a la variable global

                // Recorrer cada productId en productCount
                Object.keys(productCount).forEach(productId => {
                    const product = allProducts.find(p => p.id === parseInt(productId));

                    if (product) {
                        // Crear un nuevo elemento para mostrar el producto
                        const productItem = document.createElement("li");
                        productItem.classList.add("product-item");

                        // Calcular el subtotal
                        const subtotal = product.cost * productCount[productId];

                        productItem.innerHTML = `
                            <img class="productImage" src="${product.image}" alt="Imagen del producto">
                            <div class="productName">Producto: ${product.name}</div>
                            <div class="productDescription">Descripción: ${product.description}</div>
                            <div class="productCost">Precio: ${product.currency} ${product.cost}</div>
                            <div class="productQuantity">
                                Cantidad: <input type="number" value="${productCount[productId]}" min="1" data-product-id="${productId}" class="quantity-input">
                            </div>
                            <div class="productSubtotal">Subtotal: ${product.currency} <span class="subtotal">${subtotal}</span></div>
                        `;

                        // Añadir el elemento a la lista
                        productList.appendChild(productItem);

                        // Agregar el evento de cambio en el input de cantidad
                        const quantityInput = productItem.querySelector('.quantity-input');
                        quantityInput.addEventListener('input', (e) => {
                            const newQuantity = parseInt(e.target.value);
                            if (newQuantity < 1) {
                                e.target.value = 1; // Evitar cantidades menores a 1
                            }
                            const newSubtotal = product.cost * newQuantity;
                            productItem.querySelector('.subtotal').textContent = newSubtotal;
                            // Actualizar el productCount y el localStorage si es necesario
                            productCount[productId] = newQuantity; // Actualizar el conteo
                            localStorage.setItem("productCart", JSON.stringify(productCart)); // Guardar el carrito actualizado
                            calculateTotalPrice(); // Actualizar el precio total
                        });
                    }
                });

                // Llamar a la función para calcular y mostrar el precio total en la consola
                calculateTotalPrice();
                updateCartBadge();
            })
            .catch(error => console.error('Error al cargar los datos de los productos:', error));
    };

    // Función para calcular el precio total del carrito
    const calculateTotalPrice = () => {
        let totalPrice = 0;

        Object.keys(productCount).forEach(productId => {
            const product = allProducts.find(p => p.id === parseInt(productId));

            if (product) {
                const subtotal = product.cost * productCount[productId]; // Subtotal por producto
                totalPrice += subtotal; // Sumar al total
            }
        });

        // Mostrar el precio total en el elemento HTML
        document.getElementById("totalPrice").textContent = `$ `+ totalPrice;
    };


    // Función para actualizar el badge del carrito con la cantidad de productos
    const updateCartBadge = () => {
        const totalProductCount = Object.values(productCount).reduce((acc, count) => acc + count, 0);
        const cartBadge = document.querySelector(".cart-badge");
        if (cartBadge) {
            cartBadge.textContent = totalProductCount > 99 ? "99+" : totalProductCount;
        }
    };

    // Llamar a la función para cargar los productos
    loadProductsFromCategories(categories);
}