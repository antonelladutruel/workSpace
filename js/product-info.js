//1. que encuentre el json
//2. que encuentre el product = id
//3. cargar para cada etiqueta html la info que trae el objeto

/*<div class="container" id="containercircle"></div>
      <ul class="productList">
        <li class="product-item">
          <img src="img/" alt="ImgProducto 1">
          <div id="containertitle">Producto:</div>
          <div class="description">Descripción:</div>
          <div class="price">$:</div>
          <div class="productssold">Cantidad de vendidos: </div>
          <input> <button id="containerbutton">
            <p class="text">add to cart</p>
          </button> </input>

        </li>
      </ul>
    </div>*/
    document.addEventListener('DOMContentLoaded', function() {
    const catId = localStorage.getItem('catID');
    const DATA_URL = `https://japceibal.github.io/emercado-api/cats_products/${catId}.json`;
    const productId = localStorage.getItem('productId');

    fetch(DATA_URL)
    .then(res => res.json())
    .then(data => {
        const productsArray = data.products;
        const product = productsArray.find(p => p.id === parseInt(productId));

        if (product) {
            // Mostrar la información del producto
            document.getElementsByClassName("productName").textContent = product.name;
            document.getElementsByClassName("productDescription").textContent = product.description;
            document.getElementsByClassName("productCost").textContent = `${product.currency} ${product.cost}`;
            document.getElementsByClassName("productSoldCount").textContent = `Cantidad de vendidos: ${product.soldCount}`;
            document.getElementsByClassName("productImage").src = product.image;
        }
    })
    .catch(error => console.error('Error al cargar los datos del producto:', error));
});
