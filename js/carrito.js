/** Uso un constructor para crear mis productos */
let cantidadTotal;
class Producto {
    constructor(nombre, precio, id, img, talle, cantidad) {
        this.nombre = nombre;
        this.precio = precio;
        this.id = id;
        this.img = img
        this.talle = talle
        this.cantidad = cantidad
    }
}
let valorTotal;
const productos = [];

/**USO DE OPERADORES AVANZADO */
const carrito = JSON.parse(localStorage.getItem('carrito')) || []




/**Pusheo mis objetos al array productos */
productos.push(new Producto("Remera Azul", 3000, 1, "https://www.digitalsport.com.ar/files/products/5f28411d5cabf-520358-500x500.jpg", "M"))
productos.push(new Producto("Remera Roja", 3000, 2, "https://imagesa1.lacoste.com/dw/image/v2/BCWL_PRD/on/demandware.static/-/Sites-master/default/dw7c296c1f/TH6709_240_20.jpg?imwidth=915&impolicy=product", "M"))
productos.push(new Producto("Remera Rosa", 3000, 3, "https://drifters.com.ar/uploads/product_image/25354/650w_DriftersPDP_APP_VN000GGG00-YUH_Shot1.jpg", "M"))
productos.push(new Producto("Remera Verde", 3000, 4, "https://http2.mlstatic.com/D_NQ_NP_791217-MLA47630098451_092021-O.jpg"))
productos.push(new Producto("Pantalon", 9000, 5, 'https://street47.vtexassets.com/arquivos/ids/175327-800-auto?v=637826230793800000&width=800&height=auto&aspect=true', "M"))
productos.push(new Producto("Camisa", 7000, 6, 'https://equus.vtexassets.com/arquivos/ids/193047-800-auto?v=637197098806570000&width=800&height=auto&aspect=true', "M"))
productos.push(new Producto("Campera", 1000, 7, 'https://equus.vtexassets.com/arquivos/ids/205655-800-auto?v=637516945504130000&width=800&height=auto&aspect=true', "M"))
productos.push(new Producto("Zapatillas", 12000, 8, "https://www.digitalsport.com.ar/files/products/5c5d8bde6cecf-181658-500x500.jpg", "M"))
productos.push(new Producto("Medias", 700, 9, "https://d3ugyf2ht6aenh.cloudfront.net/stores/063/239/products/medias-van-gogh1-f76040b8754a23fc9b15647246873183-1024-1024.jpg", "M"))
productos.push(new Producto("Sombrero", 1500, 10, 'https://imagesa1.lacoste.com/dw/image/v2/BCWL_PRD/on/demandware.static/-/Sites-master/default/dw47a652d3/RK2056_HDE_20.jpg?imwidth=915&impolicy=product', "M"))

/**Traigo todos los elementos del HTML */
const listaProductos = document.querySelector('#seccion-productos')
const sectionCarrito = document.querySelector('#cart-seccion')
const carritoContainer = document.querySelector('#carrito-container')
const carritoDiv = document.querySelector('#carrito')
const btnSeguir = document.querySelector('#btnSeguir')
const btnPagar = document.querySelector('#btnPay')
const btnVaciar = document.querySelector('#btnVaciar')
const btnCarrito = document.querySelector('#openCarrito')
const contadorCarrito = document.querySelector('#contadorCarrito')

const actualizarCantidad = () => {
    contadorCarrito.innerText = carrito.length
}

/**Creo mis productos en el DOM */
for (const producto of productos) {
    const article = document.createElement('article')
    article.className = 'item'
    article.innerHTML = `<h3> ${producto.nombre}</h3>      
                        <div> <img class="imagen" src = ${producto.img} alt = " "> </div>
                        <p class = "precio-text"> $${producto.precio} </p>
                        <p class = "talle-text"> ${producto.talle} </p>
                        <button class = 'btnAgregar'>Agregar Producto</button>`
    listaProductos.append(article)
    /**Le doy funcionalidad al boton agregar producto */
    article.querySelector("button").addEventListener('click', () => {
        Toastify({
            text: "Producto agregado al carrito",
            duration: 3000,
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
                color: "white"
              }
            
            }).showToast();
        carrito.push(producto)
        localStorage.setItem('carrito', JSON.stringify(carrito))
        actualizarCantidad()
    })
}

const eliminarDelCarrito = (id) => {
    const producto = carrito.find((prod) => prod.id === id)
    const indice = carrito.indexOf(producto)
    carrito.splice(indice, 1)
    agregarProducto()
    localStorage.setItem('carrito', JSON.stringify(carrito))
    actualizarCantidad() 
    Toastify({
        text: "Producto eliminado del carrito",
        duration: 3000,
        style: {
            background: "linear-gradient(to right,#DF0000 , #FF0000 )",
            color: "white"
          }
        
        }).showToast();
}
const agregarProducto = () => { 
valorTotal = carrito.reduce((valorAcc, item) => { return valorAcc + item.precio; }, 0);
    carritoDiv.innerHTML = ` <h4> El valor total es $${valorTotal} </h4>
                             <p> Los productos que seleccionaste son: ${carrito.length}</p>
                             <ul id ="lista-carrito"></ul>`
    /**Para cada elemento de mi array carrito creo un elemento li en el DOM */
    for (const item of carrito) {
        carritoDiv.querySelector("ul").innerHTML += `<li class = "elemento-carrito">${item.nombre}<img class="imagen-producto-carrito" src = ${item.img} alt = " "> $${item.precio}  <button onclick="eliminarDelCarrito(${item.id})" class ="eliminar" id="${item.id}">Eliminar</button></li>`
    } 
    carritoDiv.append(divBotones)
    divBotones.append(btnPagar, btnSeguir) 
    actualizarCantidad() }

    vaciarCarrito = () => { 
         carrito.length = 0
        carritoDiv.innerHTML = `<p> No hay nada en el carrito </p>` 
        carritoDiv.append(divBotones)
        divBotones.append(btnPagar, btnSeguir)  }

btnVaciar.addEventListener('click', () =>{  
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
btnPagar.addEventListener('click', () =>{
    
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
