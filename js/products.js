
//const filter = getElementById("rangeFilterCount");
const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_PROD_COUNT = "Cant.";
let currentProductsArray = [];
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;

function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME)
    {
        result = array.sort(function(a, b) {
            if ( a.name < b.name ){ return -1; }
            if ( a.name > b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_NAME){
        result = array.sort(function(a, b) {
            if ( a.name > b.name ){ return -1; }
            if ( a.name < b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_COUNT){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.productCount);
            let bCount = parseInt(b.productCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

function setCatID(id) {
  localStorage.setItem("catID", id);
  window.location = "products.html"
}

function showProductsList(){

  let htmlContentToAppend = "";
  for(let i = 0; i < currentProductsArray.length; i++){
      let product = currentProductsArray[i];

      if (((minCount == undefined) || (minCount != undefined && parseInt(product.productCount) >= minCount)) &&
          ((maxCount == undefined) || (maxCount != undefined && parseInt(product.productCount) <= maxCount))){

          htmlContentToAppend += `
          <div onclick="setCatID(${product.id})" class="list-group-item list-group-item-action cursor-active">
              <div class="row">
                  <div class="col-3">
                      <img src="${product.imgSrc}" alt="${product.description}" class="img-thumbnail">
                  </div>
                  <div class="col">
                      <div class="d-flex w-100 justify-content-between">
                          <h4 class="mb-1">${product.name}</h4>
                          <small class="text-muted">${product.productCount} artículos</small>
                      </div>
                      <p class="mb-1">${product.description}</p>
                  </div>
              </div>
          </div>
          `
      }

      document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
  }
}

function sortAndShowCategories(sortCriteria, categoriesArray){
  currentSortCriteria = sortCriteria;

  if(productsArray != undefined){
      currentProductsArray = categoriesArray;
  }

  currentCategoriesArray = sortCategories(currentSortCriteria, currentCategoriesArray);

  //Muestro las categorías ordenadas
  showCategoriesList();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
  DATA_URL.then(function(resultObj){
      if (resultObj.status === "ok"){
          currentCategoriesArray = resultObj.data
          showCategoriesList()
          //sortAndShowCategories(ORDER_ASC_BY_NAME, resultObj.data);
      }
  });

  document.getElementById("sortAsc").addEventListener("click", function(){
      sortAndShowCategories(ORDER_ASC_BY_NAME);
  });

  document.getElementById("sortDesc").addEventListener("click", function(){
      sortAndShowCategories(ORDER_DESC_BY_NAME);
  });

  document.getElementById("sortByCount").addEventListener("click", function(){
      sortAndShowCategories(ORDER_BY_PROD_COUNT);
  });

  document.getElementById("clearRangeFilter").addEventListener("click", function(){
      document.getElementById("rangeFilterCountMin").value = "";
      document.getElementById("rangeFilterCountMax").value = "";

      minCount = undefined;
      maxCount = undefined;

      showCategoriesList();
  });

  document.getElementById("rangeFilterCount").addEventListener("click", function(){
      //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
      //de productos por categoría.
      minCount = document.getElementById("rangeFilterCountMin").value;
      maxCount = document.getElementById("rangeFilterCountMax").value;

      if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
          minCount = parseInt(minCount);
      }
      else{
          minCount = undefined;
      }

      if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
          maxCount = parseInt(maxCount);
      }
      else{
          maxCount = undefined;
      }

      showCategoriesList();
  });
});

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