function crearCards(array) {
  for (let producto of array) {
    const article = document.createElement('article')
    article.className = 'item'
    article.innerHTML = `<h3> ${producto.nombre}</h3>      
                      <div> <img class="imagen" src = ${producto.img} alt = " "> </div>
                      <p class = "precio-text"> $${producto.precio} </p>
                      <p class = "talle-text"> ${producto.talle} </p>
                      <button id = "${producto.id}" class = 'btnAgregar'>Agregar Producto</button>`
    listaProductos.append(article)
    /**Le doy funcionalidad al boton agregar producto */
    const btnAgregar = article.querySelector("button")
    btnAgregar.addEventListener('click', () => {
      const productoEnCarrito = carrito.find((prod) => prod.id === producto.id)
      if (productoEnCarrito) {
        Toastify({
          text: "El producto ya está en el carrito",
          duration: 3000,
          style: {
            background: "linear-gradient(to right,#DF0000 , #FF0000 )",
            color: "white"
          }

        }).showToast();
      } else {
        toastAgregado()
        carrito.push(producto)
        actualizarCantidad()
        localStorage.setItem('carrito', JSON.stringify(carrito))

      }
      localStorage.setItem('carrito', JSON.stringify(carrito))
      deshabilitarBtns()
    })
  }
  deshabilitarBtns()
}

    /**FUNCION PARA DESACTIVAR BOTONES */
    function deshabilitarBtns () { 
    const btnAgregar = document.querySelectorAll(".btnAgregar")
  const carritoLS = JSON.parse(  localStorage.getItem('carrito'))
  for (const item of carritoLS) {
    for (const boton of btnAgregar) {
      if (item.id == boton.id){
        boton.setAttribute("disabled", true); // Desactivo el Boton.
        boton.innerHTML = "Agregado";
      }
      
    }
  }
    }







/**Uso de fetch para traer la base de datos de los productos */
const listaProductos = document.querySelector('#seccion-productos')
fetch("../productos.json")
  .then((resp) => resp.json())
  .then(function (data) {
    const productos = data
   
    /**creo mis productos en el DOM */
    crearCards(productos)
  
    deshabilitarBtns()

    /**BARRA DE BUSQUEDA */
    const botonSubmit = document.querySelector("#boton-submit")
    botonSubmit.addEventListener("click", function (e) {
      
      /**Prevent default para que la pagine no se recargue */
      e.preventDefault();
      let busqueda = document.querySelector("#input-buscador").value.toUpperCase();
      const resultados = productos.filter((item) => item.nombre.toUpperCase().includes(busqueda));
      if (resultados.length > 0) {
        listaProductos.innerHTML = " "
        crearCards(resultados)
      }else{
        listaProductos.innerHTML = `<p> No se encontró, volve al <a href="../pages/productos.html"> inicio</a>  <p>`
      }
    });
  })

  .catch(function (error) {
    console.log(error);
  });




  

let cantidadTotal;
let valorTotal;

/**USO DE OPERADORES AVANZADO PARA CHEQUEAR SI EXISTE UN CARRITO EN LOCALSTORAGE*/
const carrito = JSON.parse(localStorage.getItem('carrito')) || []

/**funcion de toast */
const toastAgregado = () => {
  Toastify({
    text: "Producto agregado al carrito",
    duration: 3000,
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
      color: "white"
    }

  }).showToast();

}

const toastEliminado = () => {
  Toastify({
    text: "Producto eliminado del carrito",
    duration: 3000,
    style: {
      background: "linear-gradient(to right,#DF0000 , #FF0000 )",
      color: "white"
    }

  }).showToast();
}





/**Traigo todos los elementos del HTML */
const sectionCarrito = document.querySelector('#cart-seccion')
const carritoContainer = document.querySelector('#carrito-container')
const carritoDiv = document.querySelector('#carrito')
const btnSeguir = document.querySelector('#btnSeguir')
const btnPagar = document.querySelector('#btnPay')
const btnVaciar = document.querySelector('#btnVaciar')
const btnCarrito = document.querySelector('#openCarrito')
const contadorCarrito = document.querySelector('#contadorCarrito')





/**Funcion que actualiza la cantidad de productos del carrito para que el span cambie */
const actualizarCantidad = () => {
  contadorCarrito.innerText = carrito.reduce((valorAcc, item) => { return valorAcc + item.cantidad; }, 0);
}

/**Funcion para eliminar toda la cantidad del producto del carrito */
const eliminarDelCarrito = (id) => {
  toastEliminado()
  const producto = carrito.find((prod) => prod.id === id)
  const indice = carrito.indexOf(producto)
  carrito.splice(indice, 1)
  agregarProducto()
  localStorage.setItem('carrito', JSON.stringify(carrito))
  actualizarCantidad()
  const boton = document.getElementById(`${id}`)
  boton.removeAttribute("disabled")
  boton.innerHTML = "Agregar Producto"
}



function actualizarValor(carrito) {
  valorTotal = carrito.reduce((valorAcc, item) => { return valorAcc + item.precio * item.cantidad; }, 0);
  return valorTotal
}



function bajarCantidad(id) {
  const producto = carrito.find((prod) => prod.id === id)
  producto.cantidad -= 1
  if (producto.cantidad === 0) {
    const indice = carrito.indexOf(producto)
    carrito.splice(indice, 1)
  }

  localStorage.setItem('carrito', JSON.stringify(carrito))
  toastEliminado()
  agregarProducto()
}

function subirCantidad(id) {
  const productoEnCarrito = carrito.find((prod) => prod.id === id)

  if (productoEnCarrito) {
    productoEnCarrito.cantidad += 1
  } else {
    const producto = stockProductos.find((prod) => prod.id === id)

    carrito.push({
      ...producto,
      cantidad: 1
    })
  }
  localStorage.setItem('carrito', JSON.stringify(carrito))
  toastAgregado()
  agregarProducto()
}

/**Funcion que agrega el producto al carrito */
const agregarProducto = () => {
  carritoDiv.innerHTML = ` <h4 id = "valor"> El valor total es $${actualizarValor(carrito)} </h4>
                             <ul id ="lista-carrito"></ul>`
  /**Para cada elemento de mi array carrito creo un elemento li en el DOM */
  for (const item of carrito) {
    carritoDiv.querySelector("ul").innerHTML += `<li class = "elemento-carrito">${item.nombre}<img class="imagen-producto-carrito" src = ${item.img} alt = " "> $${item.precio} ${item.talle} <button onclick="subirCantidad(${item.id})">+</button> <button onclick="bajarCantidad(${item.id})">-</button> <span id ="cant${item.id}">${item.cantidad} </span><button onclick="eliminarDelCarrito(${item.id})" class ="eliminar" id="${item.id}"><img src="../img/clarity_trash-line.png" alt=""></button></li> `
  }
  carritoDiv.append(divBotones)
  divBotones.append(btnPagar, btnSeguir)
  actualizarCantidad()
}

/**Funcion para vaciar el carrito completamente */
vaciarCarrito = () => {
  carrito.length = 0
  carritoDiv.innerHTML = `<p> No hay nada en el carrito </p>`
  carritoDiv.append(divBotones)
  divBotones.append(btnPagar, btnSeguir)
}

btnVaciar.addEventListener('click', () => {
  /**Uso de libreria */
  Swal.fire({
    title: 'Seguro queres vaciar?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Listo!',
        'Tu carrito fue borrado',
        'success'
      )
      vaciarCarrito()
      actualizarCantidad()
      localStorage.setItem('carrito', JSON.stringify(carrito))
    }
  })

})


/**Creo el modulo carrito*/
/**Boton que activa el modulo carrito */
btnCarrito.addEventListener('click', () => {
  carritoContainer.classList.add('carrito-container-active')
  agregarProducto()

})
sectionCarrito.append(btnCarrito)
const divBotones = document.querySelector('#divBotones')

/**Boton que desactiva el modulo carrito */
btnSeguir.addEventListener('click', () => {
  carritoContainer.classList.remove('carrito-container-active')
})
divBotones.append(btnPagar, btnSeguir)
btnPagar.addEventListener('click', () => {
  /**Uso de libreria */
  Swal.fire({
    title: 'Seguro quieres terminar la compra?',
    imageUrl: 'https://cdni.iconscout.com/illustration/premium/thumb/skateboard-delivery-4490983-3726874.png',
    imageWidth: 400,
    imageHeight: 300,
    imageAlt: 'Custom image',
    showCancelButton: true,
    confirmButtonColor: '#41EB2D',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Listo!',
        'Tu compra fue aprobada',
        'success'
      )
      vaciarCarrito()
      actualizarCantidad()
      localStorage.setItem('carrito', JSON.stringify(carrito))
    }
  })
})






agregarProducto()
