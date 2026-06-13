 function renderizarProductos(lista) {
    const contenedor = document.querySelector('#contenedor-productos');
    contenedor.innerHTML = '';
    
    lista.forEach(p => {
        const div = document.createElement('div');
        div.classList.add('producto'); // ESTA CLASE CONECTA CON EL CSS
        div.innerHTML = `
            <small>${p.seccion}</small>
            <h3>${p.nombre}</h3>
            <p>Disponibles: ${p.stock}</p>
            <p><strong>$${p.precio}</strong></p>
            <button class="btn-agregar">Añadir a la bolsa</button>
        `;
        contenedor.appendChild(div);
    });
}