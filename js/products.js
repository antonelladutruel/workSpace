const ORDER_ASC_BY_COST = "CostAsc"; 
const ORDER_DESC_BY_COST = "CostDesc"; 
const ORDER_BY_SOLD_COUNT = "SoldCount"; 
const catId = localStorage.getItem('catID');
const DATA_URL = `https://japceibal.github.io/emercado-api/cats_products/${catId}.json`;
const container = document.getElementById("containerProduct");
let currentProductsArray = []; 
let currentSortCriteria = undefined; 
let minPrice = undefined; 
let maxPrice = undefined;

function sortProducts(criteria, array){
  let result = [];
  if (criteria === ORDER_ASC_BY_COST)
  {
      result = array.sort(function(a, b) {
          if ( a.name < b.name ){ return -1; }
          if ( a.name > b.name ){ return 1; }
          return 0;
      });
  }else if (criteria === ORDER_DESC_BY_COST){
      result = array.sort(function(a, b) {
          if ( a.name > b.name ){ return -1; }
          if ( a.name < b.name ){ return 1; }
          return 0;
      });
    }  else if (criteria === ORDER_BY_SOLD_COUNT) {
        result = array.sort((a, b) => {
            const aCount = parseInt(a.soldCount, 10);
            const bCount = parseInt(b.soldCount, 10);

            if (aCount > bCount) return -1;
            if (aCount < bCount) return 1;
            return 0;
        });
    }
    return result;
}

function showProductsList() {
  let htmlContentToAppend = "";
  container.innerHTML = '';

  for (let i = 0; i < currentProductsArray.length; i++) {
      let product = currentProductsArray[i];

      // Filtro por precio mínimo y máximo
      if (((minPrice == undefined) || (product.cost >= minPrice)) &&
          ((maxPrice == undefined) || (product.cost <= maxPrice))) {

          htmlContentToAppend += `
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
                              </div>;
            `;
        }
    }

    container.innerHTML = htmlContentToAppend;
}


  
function sortAndShowProducts(sortCriteria, productsArray){
  currentSortCriteria = sortCriteria;

  if(productsArray != undefined){
    currentProductsArray = productsArray     }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray );

showProductsList();

};



document.addEventListener('DOMContentLoaded', function () {
  
    fetch(DATA_URL)
    .then(res => res.json())
    .then(data => {
        currentProductsArray = data.products;
        showProductsList()})
        .catch(error => console.error());
    });