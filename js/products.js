const DATA_URL = 'https://japceibal.github.io/emercado-api/cats_products/101.json'

const container = document.getElementById("containerProduct");


//Función para recorrer Array
function showData(dataArray) {
    for (const item of dataArray) {
      container.innerHTML += `
      <img class="imgProduct"src=${item.image} alt=${item.name}>
      <p class="dataProduct">
      Nombre: ${item.name}
      <br>
      Descripción:${item.description}
      <br>
      Precio:${item.cost}
      <br>
      Cantidad vendidos:${item.soldCount}
      </p>
      `;
    }
  }

  //Realizamos petición a URL indicada
fetch(DATA_URL) 
.then(res => res.json())
.then(data => showData(data.products))
.catch(error => console.error())


