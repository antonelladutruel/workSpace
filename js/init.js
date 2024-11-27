// Definir la base URL del servidor local
const BASE_URL = "http://localhost:3000";

// Rutas actualizadas para el servidor local
const CATEGORIES_URL = `${BASE_URL}/cat`; 
const PUBLISH_PRODUCT_URL = `${BASE_URL}/sell`; 
const PRODUCTS_URL = `${BASE_URL}/product/`;  
const PRODUCT_INFO_URL = `${BASE_URL}/product-info/`; 
const PRODUCT_INFO_COMMENTS_URL = `${BASE_URL}/product-comment/`;
const CART_INFO_URL = `${BASE_URL}/user-cart`; 
const CART_BUY_URL = `${BASE_URL}/cart`;
const EXT_TYPE = ".json"; 

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}