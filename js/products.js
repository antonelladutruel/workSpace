const DATA_URL = 'https://japceibal.github.io/emercado-api/cats_products/101.json'

const container = document.getElementById("containerProduct");

  function showData(dataArray) {
    const container = document.getElementById('containerProduct'); // Asegúrate de tener un contenedor con este ID
    container.innerHTML = ''; // Limpiar el contenido previo
  
    for (const item of dataArray) {
      container.innerHTML += `
        <div class="col-md-6 mb-4">
          <div class="product">
            <img class="imgProduct img-fluid" src="${item.image}" alt="${item.name}">
            <p class="dataProduct mt-2">
              <strong>Nombre:</strong> ${item.name}
              <br>
              <strong>Descripción:</strong> ${item.description}
              <br>
              <strong>Precio:</strong> ${item.cost}
              <br>
              <strong>Cantidad vendidos:</strong> ${item.soldCount}
            </p>
          </div>
        </div>
      `;
    }
  }
  

fetch(DATA_URL)
.then(res => res.json())
.then(data => showData(data.products))
.catch(error => console.error())