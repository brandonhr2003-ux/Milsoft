let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
let listaProductosGlobal = [];

// Cargar productos
fetch('productos.json')
    .then(res => res.json())
    .then(data => {
        listaProductosGlobal = data;
        renderizar(listaProductosGlobal);
    })
    .catch(err => console.error("Error al cargar JSON:", err));

// Función de filtrado
function filtrar(categoria) {
    if (categoria === 'TODOS') {
        renderizar(listaProductosGlobal);
    } else {
        const filtrados = listaProductosGlobal.filter(p => 
            p.categoria.toUpperCase().trim() === categoria.toUpperCase().trim()
        );
        renderizar(filtrados);
    }
}

// Función que renderiza usando TUS clases originales
function renderizar(lista) {
    const contenedor = document.getElementById('contenedor-productos');
    contenedor.innerHTML = lista.map(p => {
        const itemEnCarrito = carrito.find(i => i.id === p.id);
        const disponibles = p.stock - (itemEnCarrito ? itemEnCarrito.cantidad : 0);
        
        return `
            <div class="card">
                <div class="category">${p.categoria}</div>
                <h3>${p.nombre}</h3>
                <div class="stock">Disponibles: ${disponibles}</div>
                <div class="price">$${p.precio}</div>
                <button onclick="agregar(${p.id}, '${p.nombre}', ${p.precio})" 
                        ${disponibles <= 0 ? 'disabled' : ''}>
                    ${disponibles <= 0 ? "Agotado" : "Añadir a la bolsa 🌸"}
                </button>
            </div>
        `;
    }).join('');
}

// Agregar al carrito
function agregar(id, nombre, precio) {
    let item = carrito.find(i => i.id === id);
    if (item) {
        item.cantidad++;
    } else {
        carrito.push({ id, nombre, precio, cantidad: 1 });
    }
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarUI();
    // Re-renderizamos para que el stock se actualice en pantalla
    renderizar(listaProductosGlobal); 
}

function actualizarUI() {
    const contador = document.getElementById('contador-carrito');
    if (contador) contador.innerText = carrito.reduce((a, b) => a + b.cantidad, 0);
}

actualizarUI();

function enviarPedidoWhatsApp() {
    if (carrito.length === 0) {
        alert("Tu carrito está vacío.");
        return;
    }

    // Creamos el mensaje con los productos
    let mensaje = "Hola, quisiera realizar el pedido de estos productos:\n\n";
    carrito.forEach(item => {
        mensaje += `- ${item.nombre} (x${item.cantidad})\n`;
    });
    
    // Codificamos el mensaje para que sea una URL válida
    const url = "https://wa.me/5591679278?text=" + encodeURIComponent(mensaje);
    
    // Abrimos el WhatsApp
    window.open(url, '_blank');
}