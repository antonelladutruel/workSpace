
/*function setCatID(id) {
  localStorage.setItem("catID", id);
  const catId = localStorage.getItem('catID');
  console.log(catId);
  window.location = "products.html"
};*/



document.addEventListener('DOMContentLoaded', function () {


  const catId = localStorage.getItem('catID');
  
  
  const DATA_URL = `https://japceibal.github.io/emercado-api/cats_products/${catId}.json`;
  const container = document.getElementById("containerProduct");


  function showData(dataArray) {

    if (dataArray.length === 0) {
      const emptyCat = document.createElement('h3');
      emptyCat.classList.add("m-3");
      emptyCat.textContent = 'No se encontraron productos para esta categoría';

      container.appendChild(emptyCat);

    } else {

      container.innerHTML = '';

      for (const item of dataArray) {
        container.innerHTML += `
        <div class="col-md-6 col-mb-4 mb-4">
          <div class="imgProductCnt">
              <img class="imgProduct" src=${item.image} alt=${item.name}>
          </div>
        
          <div class="productName" class="genericProductInfo">
          ${item.name}
          </div>

          <div class="productData">
            <div class="productDescription" class="genericProductInfo">
              ${item.description}
            </div>

            <div class="productCost" class="genericProductInfo">
             <p><span class="price">US$ </span>${item.cost} </p>
            </div>

            <div class="productSoldCount" class="genericProductInfo">
              <p><span class="productSoldCountItem">Cantidad de vendidos: </span>${item.soldCount} </p> 
            </div>
          </div>
        </div>`;
      }
    }
  }


  fetch(DATA_URL)
    .then(res => res.json())
    .then(data => showData(data.products))
    .catch(error => console.error());

},
);