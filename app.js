// ARRAY VACIO 

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// VARIABLES

const contenedor = document.querySelector ("#contenedor")
const carritoContenedor = document.querySelector ("#carritoContenedor")
const vaciarCarrito = document.querySelector ("#vaciarCarrito")
const precioTotal = document.querySelector ("#precioTotal")
const procesarCompra = document.querySelector("#procesarCompra");
const contendorCarrito = document.querySelector (".modal-body")

//USO FETCH PARA LLAMAR LOS PRODUCTOS DESDE UN JSON

const url = "./datos.json"
fetch(url)
.then(res=> res.json ())
.then(stockProductos => renderizar(stockProductos))

function renderizar (productos) {
  productos.forEach (prod => {
    contenedor.innerHTML += `
      <div class="card mt-3" style="width: 18rem;">
           <img class="card-img-top mt-3" src="${prod.img}" alt="Card image cap">
        <div class="card-body text-center">
          <h5 class="card-title">${prod.nombre}</h5>
          <p class="card-text">Precio: $ ${prod.precio}</p>
          <p class="card-text-desc">Descripcion: ${prod.desc}</p>
          <button class="btn-comprar btn-warning" id="${prod.id}" type= "button">Comprar Producto</button>
        </div>
      </div>
      `;
  })

  const btnsCompra = document.querySelectorAll (".btn-comprar")
    btnsCompra.forEach(btn => btn.addEventListener('click', (e) => agregarProducto (e, productos,e.target.id)))

}




//AGREGO PRODUCTOS AL CARRITO


const agregarProducto = (e,productos) => {
  const productoElegido = productos.find(prod => prod.id === parseInt(e.target.id))
  const productoEnCarrito = carrito.find((prod) => prod.id === productoElegido.id);
  if (productoEnCarrito) {
    productoEnCarrito.cantidad++;
  } else {
    carrito.push(productoElegido);
  }
  mostrarCarrito();
};



// MOSTRAR PRODUCTOS EN MI CARRITO 

function mostrarCarrito () {
  let aux = '';
  carrito.forEach (prod => {
    aux += `
          <div class="modal-contenedor">
              <div>
                <img class="img-fluid img-carrito" src="${prod.img}"/>
              </div>
            <div>
              <p>Producto: ${prod.nombre}</p>
              <p>Precio: $ ${prod.precio}</p>
              <p>Cantidad :${prod.cantidad}</p>
              <button class="btn btn-danger"  onclick="eliminarProducto(${prod.id})">Eliminar producto</button>
            </div>
          </div>
          `;
          localStorage.setItem("carrito", JSON.stringify(carrito))
  })

  contendorCarrito.innerHTML = aux

  
  
  
if (carrito.length === 0) { // MENSAJE AL CONSUMUDIDOR
  console.log("Nada");
  contendorCarrito.innerHTML = `
  <p class="text-center parrafo">¡Tu carrito esta vacio!</p>
  `;
} else {
  console.log("Algo");
}

carritoContenedor.textContent = carrito.length; // SUMATORIA DE PRODUCTOS

precioTotal.innerText = carrito.reduce ((acc, prod) => acc + prod.cantidad * prod.precio, 0,)


guardarStorage ()


}


// ELIMINO PRODUCTOS 

function eliminarProducto(id) {
  const producId = id;
  carrito = carrito.filter((produc) => produc.id !== producId);
  mostrarCarrito();
}

//LE DOY FUNCIONALIDAD AL BTN DE VACIAR PRODUCTOS

vaciarCarrito.addEventListener ("click", () => {
  carrito.length = []
  mostrarCarrito ();
})

// FUNCION DE GUARDAR EN STORAGE

function guardarStorage () {
  localStorage.setItem("carrito", JSON.stringify(carrito))
  
}

mostrarCarrito()

JSON.parse(localStorage.getItem("carrito"))

// FUNCION DE BOTON COMPRAR Y AGREGO ALERT DE LIBRERIA

if (procesarCompra) {
  procesarCompra.addEventListener("click", () => {
    if (carrito.length === 0) {
      Swal.fire({
        title: "¡Tu carrito está vacio!",
        text: "Compra algo para continuar con la compra",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    } else {
      Swal.fire({
          title: "¡Compra Realizada!",
          text: "Muchas gracias por su compra",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
    }
  });
}


 
//////////////////FORMULARIO/////////////

 //Creo variables
let nombreFormulario = document.querySelector("#nombre");
let correoFormulario = document.querySelector("#correo");


//Eventos del Form
nombreFormulario.addEventListener("input", function () {
  
  if (nombreFormulario.value === "") {
    console.log("Ingrese un nombre");
  }
});

correoFormulario.addEventListener("input", function () {
  
  if (correoFormulario.value === "") {
    console.log("Ingrese un correo electrónico");
  }
});

// Variables para crear el alert

let formulario = document.querySelector("#formulario");

let info = document.querySelector(".enviar");


const pintarInfo = formulario.addEventListener("submit", function (e) {
  e.preventDefault();
  info.innerHTML = `
  <div class="alert alert-warning" role="alert">
<h5> Muchas gracias ${nombreFormulario.value} por su consulta, te responderemos a ${correoFormulario.value} a la brevedad.</h5></div>`;
})



