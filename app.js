//VARIABLES
let todosLosProductos = document.querySelector (".productos");
let contenedorCarrito = document.querySelector (".offcanvas-body");


let comprarProductos = [];



//FUNCIONES
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

function leerContenido (producto) {
    const infoProducto = {
        imagen: producto.querySelector (".card-img-top[src]"),
        titulo: producto.querySelector (".card-title").textContent,
        precio: producto.querySelector (".card-text").textContent,
        id: producto.querySelector ("#btn-add-cart").getAttribute ("data-id")
    }
    comprarProductos= [...comprarProductos, infoProducto]
    loadHtml();
    console.log (infoProducto);
}


function loadHtml(){
    limpiarHTML ();
    comprarProductos.forEach(producto => {
        const {imagen,titulo,precio} = producto;
        const row = document.createElement ("div")
        row.classList.add("item");
        row.innerHTML = `
        <div class="cart-content text-center">
                      <div class="cart-box">
                        <img src="./assets/${producto.imagen}" alt="">
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


function limpiarHTML () {
    contenedorCarrito.innerHTML = " ";
 }
 

 contenedorCarrito.addEventListener("click", eliminarProducto);

 // Eliminar productos del carrito
 
 function eliminarProducto(e) {
   if (e.target.classList.contains("btn-delete")) {
     let productoID = e.target.getAttribute("data-id");
     comprarProductos = comprarProductos.filter(
       (producto) => producto.id !== productoID
     );
     loadHtml();
   }
 }