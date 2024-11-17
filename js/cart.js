//Punto 3
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

                Object.keys(productCount).forEach(productId => {
                    const product = allProducts.find(p => p.id === parseInt(productId));

                    if (product) {
                        const productItem = document.createElement("li");
                        productItem.classList.add("product-item");

                        // Calcular el subtotal
                        const subtotal = product.cost * productCount[productId];

                        productItem.innerHTML = `
                            <img class="productImage" src="${product.image}" alt="Imagen del producto">
                            <div class="productName">${product.name}</div>
                            <div class="productDescription">Descripción: ${product.description}</div>
                            <div class="resume">
                            <div class="productCost">Precio: ${product.currency} ${product.cost}</div>
                            <div class="productQuantity">
                                Cantidad: <input type="number" value="${productCount[productId]}" min="1" data-product-id="${productId}" class="quantity-input">
                            </div>
                            <div class="productSubtotal">Subtotal: ${product.currency} <span class="subtotal">${subtotal}</span></div>
                            </div>
                            <button class="remove-product-btn" data-product-id="${productId}">Eliminar</button>                     <!-- Botón de eliminar -->
                        `;

                        productList.appendChild(productItem);

                        const quantityInput = productItem.querySelector('.quantity-input');
                        quantityInput.addEventListener('input', (e) => {
                            const newQuantity = parseInt(e.target.value);
                            if (newQuantity < 1) {
                                e.target.value = 1;
                            }
                            const newSubtotal = product.cost * newQuantity;
                            productItem.querySelector('.subtotal').textContent = newSubtotal;
                            productCount[productId] = newQuantity;
                            localStorage.setItem("productCart", JSON.stringify(productCart));
                            calculateTotalPrice();
                        });
                        
                        // Entrega 7 - desafiate
                        // Botón de eliminar producto
                        const removeButton = productItem.querySelector('.remove-product-btn');
                        removeButton.addEventListener('click', () => {
                            // Eliminar producto del carrito
                            productCart = productCart.filter(id => id !== productId);
                            localStorage.setItem("productCart", JSON.stringify(productCart));
                            productItem.remove(); // Eliminar el producto de la vista
                            productCount[productId] = 0; // Restablecer el contador de ese producto
                            calculateTotalPrice(); // Recalcular los totales
                            updateCartBadge(); // Actualizar el contador del carrito
                        });
                    }
                });

                calculateTotalPrice();
                updateCartBadge();
            })
            .catch(error => console.error('Error al cargar los datos de los productos:', error));
    };

    // Función para calcular el precio total del carrito
    const calculateTotalPrice = () => {
        let subtotal = 0;
        Object.keys(productCount).forEach(productId => {
            const product = allProducts.find(p => p.id === parseInt(productId));
            if (product) {
                subtotal += product.cost * productCount[productId];
            }
        });

        // Obtener el porcentaje del tipo de envío seleccionado
        const tipoEnvio = document.getElementById("tipoEnvio");
        const envioPorcentaje = parseFloat(tipoEnvio.value) || 0;

        // Calcular el costo de envío y el total
        const shippingCost = subtotal * (envioPorcentaje / 100);
        const totalPrice = subtotal + shippingCost;

        // Mostrar los valores en el HTML
        document.getElementById("subtotal").textContent = `$${subtotal.toFixed(2)}`;
        document.getElementById("shippingCost").textContent = `$${shippingCost.toFixed(2)}`;
        document.getElementById("totalPrice").textContent = `$${totalPrice.toFixed(2)}`;
    };

    // Escuchar cambios en el tipo de envío
    const tipoEnvio = document.getElementById("tipoEnvio");
    tipoEnvio.addEventListener("change", calculateTotalPrice);

    // Función para actualizar el badge del carrito con la cantidad de productos - Entrega 7 - Desafiate
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

fetch("https://gist.githubusercontent.com/fedebabrauskas/b708c2a1b7a29af94927ad0e8d6d6a27/raw/b0c544d53c82de298ccedb824f8dd5e5ef5477e7/localidades.json")
  .then(res => res.json())
  .then(data => {
    const departamentosSelect = document.getElementById("departamento");
    const localidadesSelect = document.getElementById("localidad"); 

    // Agregar opciones de departamentos con el id como valor
    data.forEach(department => {
      const option = document.createElement("option");
      option.value = department.id;  // Usar el id del departamento como valor
      option.textContent = department.name;
      departamentosSelect.appendChild(option);
    });

    // Guardar el id seleccionado en localStorage al cambiar la selección
    departamentosSelect.addEventListener("change", function() {
      const selectedDepartmentId = this.value;
      localStorage.setItem("selectedDepartmentId", selectedDepartmentId); // Guardar en localStorage

      const selectedDepartment = data.find(department => department.id === parseInt(selectedDepartmentId));

      // Limpiar las opciones de localidades antes de agregar las nuevas
      localidadesSelect.innerHTML = "<option value=''>Seleccione una localidad</option>";

      // Si se encuentra el departamento, agregar las localidades como opciones
      if (selectedDepartment) {
        const towns = selectedDepartment.towns;
        towns.forEach(town => {
          const option = document.createElement("option");
          option.value = town.id;  // Usar el id de la localidad como valor
          option.textContent = town.name;
          localidadesSelect.appendChild(option);
        });
      } else {
        console.log("Departamento no encontrado.");
      }
    });
  })
  .catch(error => console.error("Error al obtener los datos:", error));

// Obtener el botón de compra
const buttonBuy = document.getElementById("buttonBuy");

buttonBuy.addEventListener("click", () => {
    const direccion = document.getElementById("direccion").value.trim();
    const numero = document.getElementById("numero").value.trim();
    const esquina = document.getElementById("esquina").value.trim();

    const tipoEnvio = document.getElementById("tipoEnvio").value;
    const departamento = document.getElementById("departamento").value;
    const localidad = document.getElementById("localidad").value;
    const formaPago = document.getElementById("formaPago").value;

    // Validación de cantidad de productos
    let allQuantitiesValid = true;
    Object.keys(productCount).forEach(productId => {
        if (productCount[productId] <= 0) {
            allQuantitiesValid = false;
        }
    });

    // Validaciones adicionales antes de proceder con la compra
    if (!direccion || !numero || !esquina) {
        alert("Por favor, complete todos los campos de dirección.");
        return;
    }

    if (!tipoEnvio) {
        alert("Por favor, seleccione un tipo de envío.");
        return;
    }

    if (!departamento) {
        alert("Por favor, seleccione un departamento.");
        return;
    }

    if (!localidad) {
        alert("Por favor, seleccione una localidad.");
        return;
    }

    if (!allQuantitiesValid) {
        alert("La cantidad de productos debe ser mayor a 0.");
        return;
    }

    if (!formaPago) {
        alert("Por favor, seleccione un método de pago.");
        return;
    }

    // Si todo está correcto, procesar la compra
    alert("Compra realizada con éxito. ¡Gracias por tu compra!");
});


const darkMode = document.querySelector(".dark-mode");
const body = document.body;

darkMode.addEventListener("click",()=>{
    body.classList.toggle("active");
});