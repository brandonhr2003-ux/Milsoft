 let productos = [];

fetch('./productos.json')
    .then(res => res.json())
    .then(data => {
        productos = data;
        renderizarProductos(productos);
    })
    .catch(error => console.error("Error al cargar JSON:", error));

function renderizarProductos(lista) {
    const contenedor = document.querySelector('#contenedor-productos');
    contenedor.innerHTML = '';
    lista.forEach(p => {
        const div = document.createElement('div');
        div.classList.add('producto');
        div.innerHTML = `
            <h3>${p.nombre}</h3>
            <p>Precio: $${p.precio}</p>
            <button>Añadir a la bolsa</button>
        `;
        contenedor.appendChild(div);
    });
}

const botones = document.querySelectorAll('.boton-categoria');
botones.forEach(boton => {
    boton.addEventListener('click', (e) => {
        const idSeleccionado = e.currentTarget.id;
        if (idSeleccionado === "todos") {
            renderizarProductos(productos);
        } else {
            const filtrados = productos.filter(p => p.categoria === idSeleccionado || p.seccion === idSeleccionado);
            renderizarProductos(filtrados);
        }
    });
});