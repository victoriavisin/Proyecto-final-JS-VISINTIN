//VARIABLES
let todosLosProductos = document.querySelector (".productos");
let contenedorCarrito = document.querySelector (".offcanvas-body");

// ARRAY

let comprarProductos = [];



//FUNCIONES


// Agregar productos del carrito

loadEventListenrs ();
function loadEventListenrs () {
    todosLosProductos.addEventListener("click", agregarProducto);
}

function agregarProducto (e) {
    e.preventDefault ();
    if (e.target.classList.contains("btn")) {
        const selectProduct = e.target.parentElement
        leerContenido(selectProduct);
    }
    
}

// Leer productos

function leerContenido (producto) {
    const infoProducto = {
        imagen: producto.querySelector (".imagen-item [src]"),
        titulo: producto.querySelector (".card-title").textContent,
        precio: producto.querySelector (".card-text").textContent,
        id: producto.querySelector ("#btn-add-cart").getAttribute ("data-id")
    }
    comprarProductos= [...comprarProductos, infoProducto]
    loadHtml();
    //console.log (infoProducto);
}

// Cargar los productos al carrito

function loadHtml(){
    limpiarHTML ();
    comprarProductos.forEach(producto => {
        const {imagen,titulo,precio} = producto;
        const row = document.createElement ("div")
        row.classList.add("item");
        row.innerHTML = `
        <div class="cart-content text-center">
                      <div class="cart-box">
                      <img src="${producto.imagen}" alt="">
                        <div class="detail-box">
                          <div class="cart-title">${producto.titulo}</div>
                          <div class="cart-price">${producto.precio}</div>
                          <input type="number" value="1" class="cart-cantidad">
                        </div>
                        <button type="button" data-id="${producto.id}" class="btn-delete btn-danger mt-3">Eliminar</button>
                      </div>
                    </div>
                    </div> 
        `
       contenedorCarrito.appendChild (row);
       
       
       
    });


}

// Funcion para limpiar HTML


function limpiarHTML () {
    contenedorCarrito.innerHTML = " ";
 }
 
 // Eliminar productos del carrito

 contenedorCarrito.addEventListener("click", eliminarProducto);

 
 function eliminarProducto(e) {
   if (e.target.classList.contains("btn-delete")) {
     let productoID = e.target.getAttribute("data-id");
     comprarProductos = comprarProductos.filter(
       (producto) => producto.id !== productoID
     );
     loadHtml();
     
   }
 }

 // Sumar total

 function updateTotal () {
  let total = 0;

  const carritoTotal = document.querySelector (".total");

  const carritoItems = document.querySelector (".productos");

  carritoItems.forEach((itemCarrito) => {
    const carritoPrecioElemento = carritoItems.querySelector (".card-text");

    console.log (carritoTotal, carritoPrecioElemento)

  });


}
