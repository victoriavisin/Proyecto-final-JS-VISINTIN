
// // STOCK DE PRODUCTOS 

// const stockProductos = [
//   {
//     id: 1,
//     nombre: "GTA 5",
//     cantidad: 1,
//     desc: "Acción/Aventura",
//     precio: 7000,
//     img: "assets/image/gta5.jpg",
//   },
//   {
//     id: 2,
//     nombre: "God of War",
//     cantidad: 1,
//     desc: "Acción/Aventura",
//     precio: 10000,
//     img: "assets/image/gow.jpg",
//   },
//   {
//     id: 3,
//     nombre: "HALO",
//     cantidad: 1,
//     desc: "Ciencia Ficción",
//     precio: 6500,
//     img: "assets/image/halo.jpg",
//   },
  
//   {
//     id: 4,
//     nombre: "Call Of Duty",
//     cantidad: 1,
//     desc: "Disparos en primera persona",
//     precio: 9200,
//     img: "assets/image/cod.jpg",
//   },
//   {
//     id: 5,
//     nombre: "FIFA 2023",
//     cantidad: 1,
//     desc: "Deportes",
//     precio: 17000,
//     img: "assets/image/fifa23.jpg",
//   },
//   {
//     id: 6,
//     nombre: "DETROIT",
//     cantidad: 1,
//     desc: "Ciencia Ficción",
//     precio: 6000,
//     img: "assets/image/detroit.jpg",
//   },
//   {
//     id: 7,
//     nombre: "Last Of Us",
//     cantidad: 1,
//     desc: "Ciencia Ficción",
//     precio: 8000,
//     img: "assets/image/lou.jpg",
//   },
//   {
//     id: 8,
//     nombre: "Red Dead Redemption 2",
//     cantidad: 1,
//     desc: "Acción/Aventura",
//     precio: 5200,
//     img: "assets/image/rdr2.jpg",
//   },
//   {
//     id: 9,
//     nombre: "Sims",
//     cantidad: 1,
//     desc: "Simulación Social",
//     precio: 4500,
//     img: "assets/image/sims.jpg",
//   },
//   {
//     id: 10,
//     nombre: "Uncharted 4",
//     cantidad: 1,
//     desc: "Ciencia Ficción",
//     precio: 11000,
//     img: "assets/image/uncharted4.jpg",
//   },
//   {
//     id: 11,
//     nombre: "Elden Ring",
//     cantidad: 1,
//     desc: "RPG",
//     precio: 9000,
//     img: "assets/image/elden.jpg",
//   },
//   {
//     id: 12,
//     nombre: "Mortal Kombat",
//     cantidad: 1,
//     desc: "Lucha",
//     precio: 13000,
//     img: "assets/image/mortal.jpg",
//   },

// ];
// ARRAY VACIO 

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// VARIABLES

const contenedor = document.querySelector ("#contenedor")
const carritoContenedor = document.querySelector ("#carritoContenedor")
const vaciarCarrito = document.querySelector ("#vaciarCarrito")
const precioTotal = document.querySelector ("#precioTotal")
const procesarCompra = document.querySelector("#procesarCompra");

// GUARDAR EN JSON

 document.addEventListener ("DOMContentLoaded" , () => {
 carrito =JSON.parce (localStorage.getItem ("carrito")) || []
 })
 fetch("./datos.json")
 .then((res) => res.json())
 .then((stockProductos) => {
 // AGREGO MIS PRODUCTOS AL HTML
stockProductos.forEach((prod) => {
  const { id, nombre, precio, desc, img, cantidad } = prod;
  if (contenedor) {
    contenedor.innerHTML += `
    <div class="card mt-3" style="width: 18rem;">
    <img class="card-img-top mt-3" src="${img}" alt="Card image cap">
    <div class="card-body text-center">
      <h5 class="card-title">${nombre}</h5>
      <p class="card-text">Precio: $ ${precio}</p>
      <p class="card-text-desc">Descripcion: ${desc}</p>
      <button class="btn btn-warning" onclick="agregarProducto(${id})">Comprar Producto</button>
    </div>
  </div>
    `;
  }
})
})







function agregarProducto(id){ // AUMENTO CANTIDAD
  
  const existe = carrito.some((prod) => prod.id === id)
  
  if(existe) {
    const prod = carrito.map (prod => {
      if(prod.id === id) {
        prod.cantidad++
      }
    })
  } else {
    const item =stockProductos.find((prod) => prod.id === id)
    carrito.push(item)
    
  }
  
  mostrarCarrito()
  
}







// MOSTRAR PRODUCTOS EN MI CARRITO 

const mostrarCarrito = () => {
  const modalBody = document.querySelector (".modal-body")

  modalBody.innerHTML = " "

  
  carrito.forEach ((prod) => {
      const { id, nombre, precio, desc, img, cantidad } = prod;
      modalBody.innerHTML += `
      <div class="modal-contenedor">
        <div>
        <img class="img-fluid img-carrito" src="${img}"/>
        </div>
        <div>
        <p>Producto: ${nombre}</p>
      <p>Precio: $ ${precio}</p>
      <p>Cantidad :${cantidad}</p>
      <button class="btn btn-danger"  onclick="eliminarProducto(${id})">Eliminar producto</button>
        </div>
      </div>
      
      `;
      localStorage.setItem("carrito", JSON.stringify(carrito))
    })

  
    
    

if (carrito.length === 0) { // MENSAJE AL CONSUMUDIDOR
  console.log("Nada");
  modalBody.innerHTML = `
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
    console.log("Ingrese un correo electrónic");
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
});

 
