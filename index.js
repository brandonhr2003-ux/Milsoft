 document.addEventListener("DOMContentLoaded", () => {
    // Esta función carga el archivo JSON directamente
    fetch('./productos.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo cargar el archivo de productos');
            }
            return response.json();
        })
        .then(productos => {
            renderizarProductos(productos);
        })
        .catch(error => {
            console.error('Error:', error);
            const container = document.getElementById('contenedor-productos');
            if (container) {
                container.innerHTML = '<p>Error al cargar productos. Intenta más tarde.</p>';
            }
        });
});

function renderizarProductos(productos) {
    const contenedor = document.getElementById('contenedor-productos');
    if (!contenedor) return;

    contenedor.innerHTML = ''; // Limpiar antes de pintar

    productos.forEach(producto => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <h3>${producto.nombre}</h3>
            <p>Disponibles: ${producto.stock}</p>
            <p>$${producto.precio}</p>
            <button onclick="alert('Agregado: ${producto.nombre}')">Añadir a la bolsa 🌸</button>
        `;
        contenedor.appendChild(card);
    });
}