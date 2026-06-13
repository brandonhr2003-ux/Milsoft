 let productos = [];

// 1. Cargar productos desde el JSON
fetch('./productos.json')
    .then(res => res.json())
    .then(data => {
        productos = data;
        renderizarProductos(productos);
    })
    .catch(err => console.error("Error al cargar JSON:", err));

// 2. Función para pintar los productos
function renderizarProductos(lista) {
    const contenedor = document.querySelector('#contenedor-productos');
    contenedor.innerHTML = '';
    
    lista.forEach(p => {
        const div = document.createElement('div');
        div.classList.add('producto');
        div.innerHTML = `
            <small>${p.seccion}</small>
            <h3>${p.nombre}</h3>
            <p>Disponibles: ${p.stock}</p>
            <p>$${p.precio}</p>
            <button>Añadir a la bolsa</button>
        `;
        contenedor.appendChild(div);
    });
}

// 3. Lógica de filtrado (funciona para categorías y subsecciones)
const botones = document.querySelectorAll('.boton-categoria');

botones.forEach(boton => {
    boton.addEventListener('click', (e) => {
        const idSeleccionado = e.currentTarget.id;

        if (idSeleccionado === "todos") {
            renderizarProductos(productos);
        } else {
            const filtrados = productos.filter(p => 
                p.categoria === idSeleccionado || p.seccion === idSeleccionado
            );
            renderizarProductos(filtrados);
        }
    });
});