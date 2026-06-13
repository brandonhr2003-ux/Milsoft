 let productos = [];

console.log("Intentando cargar productos...");

fetch('productos.json') 
    .then(res => {
        console.log("Respuesta recibida, status:", res.status);
        return res.json();
    })
    .then(data => {
        console.log("Datos obtenidos:", data);
        productos = data;
        renderizarProductos(productos);
    })
    .catch(err => console.error("Error crítico al cargar JSON:", err));
    
function renderizarProductos(lista) {
    const contenedor = document.querySelector('#contenedor-productos');
    if (!contenedor) return; // Seguridad extra
    contenedor.innerHTML = '';
    
    lista.forEach(p => {
        const div = document.createElement('div');
        div.classList.add('producto');
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
