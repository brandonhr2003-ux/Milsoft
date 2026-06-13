// Estado global de la tienda
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
let listaProductosGlobal = [];

// 1. Cargar productos desde el JSON
async function cargarProductos() {
    try {
        const res = await fetch('productos.json');
        listaProductosGlobal = await res.json();
        renderizar(listaProductosGlobal);
    } catch (err) {
        console.error("Error al cargar productos:", err);
    }
}

// 2. Motor de Renderizado (Aquí es donde ocurre la magia visual)

function renderizar(lista) {
    const contenedor = document.getElementById('contenedor-productos');
    
    if (lista.length === 0) {
        contenedor.innerHTML = "<p>No hay productos en esta categoría.</p>";
        return;
    }

    contenedor.innerHTML = lista.map(p => `
        <div class="card">
            <img src="${p.imagen || 'placeholder.jpg'}" alt="${p.nombre}" class="producto-img">
            <div class="card-info">
                <span class="categoria-tag">${p.categoria}</span>
                <h3>${p.nombre}</h3>
                <p class="precio">$${p.precio.toFixed(2)}</p>
                <button class="btn-anadir" onclick="agregar(${p.id}, '${p.nombre}', ${p.precio})">
                    Añadir a la bolsa
                </button>
            </div>
        </div>
    `).join('');
}
// 3. Lógica de Filtros (Profesional)
function filtrar(categoria) {
    // 1. Convertimos la categoría seleccionada a mayúsculas para comparar
    const cat = categoria.toUpperCase().trim();
    
    // 2. Si es 'TODOS', renderizamos todo, sino filtramos
    if (cat === 'TODOS') {
        renderizar(listaProductosGlobal);
    } else {
        const filtrados = listaProductosGlobal.filter(p => 
            p.categoria.toUpperCase().trim() === cat
        );
        renderizar(filtrados);
    }
    
    // 3. Cerramos el menú después de elegir (para que se vea más profesional)
    toggleMenu(); 
}

// 4. Gestión del Carrito
function agregar(id, nombre, precio) {
    let item = carrito.find(i => i.id === id);
    item ? item.cantidad++ : carrito.push({ id, nombre, precio, cantidad: 1 });
    
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarUI();
    
    // Feedback visual profesional (opcional: podrías agregar un alert elegante o un toast)
    console.log(`${nombre} añadido a la bolsa`);
}

function actualizarUI() {
    const contador = document.getElementById('contador-carrito');
    const totalItems = carrito.reduce((a, b) => a + b.cantidad, 0);
    if (contador) contador.innerText = totalItems;
}

// 5. Flujo de Compra
function enviarPedidoWhatsApp() {
    if (carrito.length === 0) return alert("Bolsa vacía");
    
    let resumen = carrito.map(i => `${i.nombre} (x${i.cantidad})`).join(", ");
    let mensaje = `Hola! Quiero pedir: ${resumen}.`;
    
    window.open(`https://wa.me/5591679278?text=${encodeURIComponent(mensaje)}`, '_blank');
}

// Inicializar
cargarProductos();
actualizarUI();