/** Uso un constructor para crear mis productos */
let cantidadTotal;
class Producto {
    constructor(nombre, precio, id, img, cantidad) {
        this.nombre = nombre;
        this.precio = precio;
        this.id = id;
        this.img = img
        this.cantidad = cantidad
    }
    agregarUnidadAlStock() {
        return this.cantidad++;
      }
     
}
let valorTotal;
const productos = [];
const carrito = []
const guardarCarrito = (clave, valor) => {localStorage.setItem(clave, valor)}


/**Pusheo mis objetos al array productos */
productos.push(new Producto("Remera Azul", 3000, 1, "https://www.digitalsport.com.ar/files/products/5f28411d5cabf-520358-500x500.jpg"))
productos.push(new Producto("Remera Roja", 3000, 2, "https://imagesa1.lacoste.com/dw/image/v2/BCWL_PRD/on/demandware.static/-/Sites-master/default/dw7c296c1f/TH6709_240_20.jpg?imwidth=915&impolicy=product"))
productos.push(new Producto("Remera Rosa", 3000, 3, "https://drifters.com.ar/uploads/product_image/25354/650w_DriftersPDP_APP_VN000GGG00-YUH_Shot1.jpg"))
productos.push(new Producto("Remera Verde", 3000, 4, "https://http2.mlstatic.com/D_NQ_NP_791217-MLA47630098451_092021-O.jpg"))
productos.push(new Producto("Pantalon", 9000, 5, 'https://street47.vtexassets.com/arquivos/ids/175327-800-auto?v=637826230793800000&width=800&height=auto&aspect=true'))
productos.push(new Producto("Camisa", 7000, 6, 'https://equus.vtexassets.com/arquivos/ids/193047-800-auto?v=637197098806570000&width=800&height=auto&aspect=true'))
productos.push(new Producto("Campera", 1000, 7, 'https://equus.vtexassets.com/arquivos/ids/205655-800-auto?v=637516945504130000&width=800&height=auto&aspect=true'))
productos.push(new Producto("Zapatillas", 12000, 8, "https://www.digitalsport.com.ar/files/products/5c5d8bde6cecf-181658-500x500.jpg"))
productos.push(new Producto("Medias", 700, 9, "https://d3ugyf2ht6aenh.cloudfront.net/stores/063/239/products/medias-van-gogh1-f76040b8754a23fc9b15647246873183-1024-1024.jpg"))
productos.push(new Producto("Sombrero", 1500, 10, 'https://imagesa1.lacoste.com/dw/image/v2/BCWL_PRD/on/demandware.static/-/Sites-master/default/dw47a652d3/RK2056_HDE_20.jpg?imwidth=915&impolicy=product'))

/**Traigo todos los elementos del HTML */
const listaProductos = document.querySelector('#seccion-productos')
const modalContainer = document.querySelector('#modal-container')
const modal = document.querySelector('#modal')
const cerrarModal = document.querySelector('#modal-close')
const sectionCarrito = document.querySelector('#cart-seccion')
const carritoContainer = document.querySelector('#carrito-container')
const carritoDiv = document.querySelector('#carrito')
const btnSeguir = document.querySelector('#btnSeguir')
const btnPagar = document.querySelector('#btnPay')
const btnCarrito = document.querySelector('#openCarrito')

/**Traigo el modal de 'Producto agregado al carrito' */
/**Este boton cierra el modal */
cerrarModal.addEventListener('click', () => {
    modalContainer.classList.remove('modal-container-active')
})

/**Creo mis productos en el DOM */
for (const producto of productos) {
    const article = document.createElement('article')
    article.className = 'item'
    article.innerHTML = `<h3> ${producto.nombre}</h3>      
                        <div> <img class="imagen" src = ${producto.img} alt = " "> </div>
                        <p class = "precio-text"> $${producto.precio} </p>
                        <button class = 'btnAgregar'>Agregar Producto</button>`
    listaProductos.append(article)
    /**Le doy funcionalidad al boton agregar producto */
    article.querySelector("button").addEventListener('click', () => {
        modalContainer.classList.add('modal-container-active')
        carrito.push(producto)
    })
}


/**Creo el modulo carrito*/
/**Boton que activa el modulo carrito */
btnCarrito.addEventListener('click', () => {
    carritoContainer.classList.add('carrito-container-active')
    valorTotal = carrito.reduce((valorAcc, item) => { return valorAcc + item.precio; }, 0);
    carritoDiv.innerHTML = ` <h4> El valor total es $${valorTotal} </h4>
                             <p> Los productos que seleccionaste son: ${carrito.length}</p>
                             <ul id ="lista-carrito"></ul>`
    /**Para cada elemento de mi array carrito creo un elemento li en el DOM */
    for (const item of carrito) {
        carritoDiv.querySelector("ul").innerHTML += `<li class = "elemento-carrito">${item.nombre}<img class="imagen-producto-carrito" src = ${item.img} alt = " "> $${item.precio} ${item.cantidad}</li>`
    }
    carritoDiv.append(divBotones)
    divBotones.append(btnPagar, btnSeguir)
})
sectionCarrito.append(btnCarrito)
const divBotones = document.querySelector('#divBotones')

/**Boton que desactiva el modulo carrito */
btnSeguir.addEventListener('click', () => {
    carritoContainer.classList.remove('carrito-container-active')
})
divBotones.append(btnPagar, btnSeguir)

const buscarProducto = (id) => {
    return productos.find(prod => prod.id === id) || {error: "No se encontró el producto"}
}
