 // 1. Declaración de variables
let productos = []; 

// 2. Carga inicial del JSON
fetch('./productos.json')
    .then(response => response.json())
    .then(data => {
        productos = data; // Guardamos todos los productos en la variable global
        renderizarProductos(productos); // Renderiza todo al abrir
    })
    .catch(error => console.error("Error cargando JSON:", error));

// 3. Función para pintar los productos en el HTML
function renderizarProductos(productosAFiltrar) {
    const contenedor = document.querySelector('#contenedor-productos');
    contenedor.innerHTML = ''; // Limpiamos el HTML anterior
    
    productosAFiltrar.forEach(producto => {
        const div = document.createElement('div');
        div.classList.add('producto');
        div.innerHTML = `
            <h3>${producto.nombre}</h3>
            <p>Precio: $${producto.precio}</p>
            <button>Agregar al carrito</button>
        `;
        contenedor.appendChild(div);
    });
}

// 4. Lógica de los botones de categoría
const botonesCategorias = document.querySelectorAll('.boton-categoria');

botonesCategorias.forEach(boton => {
    boton.addEventListener('click', (e) => {
        // Quitamos la clase 'active' de todos los botones (si la usas para estilo)
        botonesCategorias.forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');

        // Filtramos según el ID del botón que debe ser igual al JSON
        const categoriaSeleccionada = e.currentTarget.id;
        
        // Si el botón es "Todos", mostramos todo, si no, filtramos
        if (categoriaSeleccionada === "todos") {
            renderizarProductos(productos);
        } else {
            const filtrados = productos.filter(p => p.categoria === categoriaSeleccionada);
            renderizarProductos(filtrados);
        }
    });
});