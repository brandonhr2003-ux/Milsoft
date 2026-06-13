 let productos = [];

// 1. Cargar productos
fetch('./productos.json')
    .then(res => res.json())
    .then(data => {
        productos = data;
        renderizarProductos(productos);
    })
    .catch(error => console.error("Error al cargar JSON:", error));

// 2. Función para renderizar tarjetas
function renderizarProductos(lista) {
    const contenedor = document.querySelector('#contenedor-productos');
    contenedor.innerHTML = ''; // Limpiamos antes de pintar
    
    lista.forEach(p => {
        const div = document.createElement('div');
        div.classList.add('producto'); // IMPORTANTE: Esta clase activa el diseño CSS
        div.innerHTML = `
            <small>${p.seccion}</small>
            <h3>${p.nombre}</h3>
            <p>Disponibles: ${p.stock}</p>
            <p>$${p.precio}</p>
            <button class="btn-agregar">Añadir a la bolsa</button>
        `;
        contenedor.appendChild(div);
    });
}

// 3. Lógica de los botones
const botones = document.querySelectorAll('.boton-categoria');
botones.forEach(boton => {
    boton.addEventListener('click', (e) => {
        const id = e.currentTarget.id;
        if (id === "todos") {
            renderizarProductos(productos);
        } else {
            const filtrados = productos.filter(p => p.categoria === id || p.seccion === id);
            renderizarProductos(filtrados);
        }
    });
});