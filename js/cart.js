const productCart = JSON.parse(localStorage.getItem("productCart") || "[]");

// Buscar si el producto ya existe en el carrito basado en el 'id'
const existingProduct = productCart.find(p => p.productCart === product.productCart);

if (!existingProduct) {
    console.log("Producto no existente en el carrito");
} else {
    console.log("Producto encontrado en el carrito:", existingProduct);
}
