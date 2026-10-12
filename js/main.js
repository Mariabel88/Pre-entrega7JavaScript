// 1. Array inicial de objetos literales (LUMEN)
let catalogoLumen =[
    {id: 1, nombre: "Tira LED Cálida 2700K", precio: 1500, stock: 10},
    {id: 2, nombre: "Tira LED RGB Neón", precio: 2500, stock: 8},
    {id: 3, nombre: "Panel LED Embutir 18W", precio: 12000, stock: 15},
    {id: 4, nombre: "Lámpara de Pie Nórdica", precio: 3400, stock: 9},
    {id: 5, nombre: "Perfil de Aluminio Difusor", precio: 800, stock: 20}
];

// 2. Selección de nodos del DOM (como vimos en clase)
const contenedorProductos = document.getElementById("contenedor-productos");
const formularioProducto = document.getElementById("formulario-producto");
const inputNombre = document.getElementById("input-nombre");
const inputPrecio = document.getElementById("input-precio");
const inputStock = document.getElementById("input-stock");
const inputBusqueda = document.getElementById("input-busqueda");
const mensajeFeedback = document.getElementById("mensaje-feedback");


// 3. Renderizado del catálogo en el DOM
function renderizarProductos(lista) {
  contenedorProductos.innerHTML = "";

  if (lista.length === 0) {
    contenedorProductos.innerHTML = "<p>No hay productos para mostrar.</p>";
    return;
  }

  lista.forEach(producto => {
    contenedorProductos.innerHTML += `
    <div class= "tarjeta-producto">
      <h3>${producto.nombre}</h3>
      <p><strong>Precio:</strong> $${producto.precio}</p>
      <p><strong>Stock:</strong> ${producto.stock} unidades</p>
      <button class="btn-eliminar" data-id="${producto.id}">Eliminar</button>
    </div>
    `;
  
  });

  // Asignamos el evento click a los botones generados
  asignarEventosEliminar();
}

// 4. Función para escuchar el click en cada botón "Eliminar"
function asignarEventosEliminar() {
  const botonesEliminar = document.querySelectorAll(".btn-eliminar");

  botonesEliminar.forEach(boton => {
    boton.addEventListener("click", (evento) => {
      const idSeleccionado = parseInt(evento.target.getAttribute("data-id"), 10);
      eliminarProducto(idSeleccionado);
    });
  });
}


// 5. Función para eliminar del array y refrescar la vista
function eliminarProducto(id) {
  catalogoLumen = catalogoLumen.filter(producto => producto.id !== id);
  mensajeFeedback.textContent = "Producto eliminado correctamente.";
  renderizarProductos(catalogoLumen);
}


// 6. Evento SUBMIT del formulario para agregar un producto
formularioProducto.addEventListener("submit", evento =>{
    evento.preventDefault(); // Con esto evitamos que la página se recargue

    const nombreValor= inputNombre.value.trim();
    const precioValor= parseFloat(inputPrecio.value);
    const stockValor= parseInt(inputStock.value, 10);

    if(nombreValor !==""&& !isNaN(precioValor)&& !isNaN(stockValor)){
        const nuevoProducto={
            id:Date.now(), // IDúnico temporal
            nombre:nombreValor,
            precio:precioValor,
            stock:stockValor
        };

        catalogoLumen.push(nuevoProducto);
        formularioProducto.reset();
        inputBusqueda.value ="";
        mensajeFeedback.textContent = "¡Producto agregado con éxito!";
        renderizarProductos(catalogoLumen);
    }else{
        mensajeFeedback.textContent= "Por favor, completa todos los campos.";
    }
});


// 7. Evento de teclado (INPUT) en el buscador para filtar en vivo
inputBusqueda.addEventListener("input", () => {
  const termino = inputBusqueda.value.toLowerCase().trim();
  
  const filtrados = catalogoLumen.filter(producto =>
    producto.nombre.toLowerCase().includes(termino)
  );
  renderizarProductos(filtrados);
});
// 8. Carga inicial
renderizarProductos(catalogoLumen);ga inicial
renderizarProductos(catalogoLumen);
