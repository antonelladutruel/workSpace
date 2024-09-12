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

function sortProducts(criteria, array) {
    let result = [];
    if (criteria === ORDER_ASC_BY_COST) {
        result = array.sort(function(a, b) {
            if (a.cost < b.cost) { return -1; }
            if (a.cost > b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_DESC_BY_COST) {
        result = array.sort(function(a, b) {
            if (a.cost > b.cost) { return -1; }
            if (a.cost < b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_BY_SOLD_COUNT) {
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
                        <img class="imgProduct" src="${product.image}" alt="${product.name}">
                    </div>
                
                    <div class="productName" class="genericProductInfo">
                    ${product.name}
                    </div>
        
                    <div class="productData">
                        <div class="productDescription" class="genericProductInfo">
                            ${product.description}
                        </div>
        
                        <div class="productCost" class="genericProductInfo">
                            <p><span class="price">US$ </span>${product.cost}</p>
                        </div>
        
                        <div class="productSoldCount" class="genericProductInfo">
                            <p><span class="productSoldCountItem">Cantidad de vendidos: </span>${product.soldCount}</p> 
                        </div>
                    </div>
                </div>
            `;
        }
    }

    container.innerHTML = htmlContentToAppend;
}

function sortAndShowProducts(sortCriteria, productsArray) {
    currentSortCriteria = sortCriteria;

    if (productsArray != undefined) {
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);
    showProductsList();
}


document.addEventListener('DOMContentLoaded', function () {

  document.getElementById("sortAsc").addEventListener("click", function(){
    sortAndShowProducts(ORDER_ASC_BY_COST);
});

document.getElementById("sortDesc").addEventListener("click", function(){
    sortAndShowProducts(ORDER_DESC_BY_COST);
});

document.getElementById("sortByCount").addEventListener("click", function(){
    sortAndShowProducts(ORDER_BY_SOLD_COUNT);
});

document.getElementById("clearRangeFilter").addEventListener("click", function(){
    document.getElementById("rangeFilterCountMin").value = "";
    document.getElementById("rangeFilterCountMax").value = "";

    minPrice = undefined;
    maxPrice = undefined;

    showProductsList();
});

document.getElementById("rangeFilterCount").addEventListener("click", function(){
    //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
    //de productos por categoría.
    minPrice = document.getElementById("rangeFilterCountMin").value;
    maxPrice = document.getElementById("rangeFilterCountMax").value;

    if ((minPrice != undefined) && (minPrice != "") && (parseInt(minPrice)) >= 0){
        minPrice = parseInt(minPrice);
    }
    else{
        minPrice = undefined;
    }

    if ((maxPrice != undefined) && (maxPrice != "") && (parseInt(maxPrice)) >= 0){
        maxPrice = parseInt(maxPrice);
    }
    else{
        maxPrice = undefined;
    }

    showProductsList();
});

document.getElementById("productSearch").addEventListener("input", function() {
    const query = this.value.toLowerCase();
    const filteredProducts = currentProductsArray.filter(product =>
        product.name.toLowerCase().includes(query) || product.description.toLowerCase().includes(query)
    );
    showProductsList(filteredProducts);
});


    fetch(DATA_URL)
        .then(res => res.json())
        .then(data => {
            currentProductsArray = data.products;
            showProductsList();
        })
        .catch(error => console.error());
});
