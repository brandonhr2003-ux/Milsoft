 import express from 'express';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

// RUTA 1: Prueba inicial
app.get('/', (req, res) => {
    res.send('Servidor de Milsoft.mx corriendo con todo el power');
});

// RUTA 2: Obtener todos los cosméticos e insumos desde el JSON
app.get('/api/productos', (req, res) => {
    try {
        const data = fs.readFileSync('./productos.json', 'utf8');
        const productos = JSON.parse(data);
        res.json(productos);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al leer la base de datos de productos, broder" });
    }
});

// RUTA 3: Recibir la orden, descontar el inventario real en JSON y calcular total
app.post('/api/checkout', (req, res) => {
    const { productosPedido } = req.body;

    if (!productosPedido || productosPedido.length === 0) {
        return res.status(400).json({ exito: false, mensaje: "El pedido está vacío, broder" });
    }

    try {
        // 1. Leer el inventario físico actual desde el JSON
        const dataInventario = fs.readFileSync('./productos.json', 'utf8');
        let productosInventario = JSON.parse(dataInventario);

        // 2. Descontar las piezas del stock del inventario real
        for (const itemCarrito of productosPedido) {
            const productoInven = productosInventario.find(p => p.id === itemCarrito.id);
            
            if (productoInven) {
                // Validación de seguridad por si acaso en el backend
                if (productoInven.stock >= itemCarrito.cantidad) {
                    productoInven.stock -= itemCarrito.cantidad;
                } else {
                    return res.status(400).json({ exito: false, mensaje: `No hay suficiente stock físico de ${itemCarrito.nombre}` });
                }
            }
        }

        // 3. Escribir los nuevos números de stock de vuelta en el archivo productos.json
        fs.writeFileSync('./productos.json', JSON.stringify(productosInventario, null, 2), 'utf8');

        // 4. Calcular el dinero total
        const total = productosPedido.reduce((sum, item) => sum + (Number(item.precio) * Number(item.cantidad)), 0);

        console.log("¡Venta procesada y stock descontado en el disco duro! 💄");
        console.log(`Total cobrado: $${total}`);

        res.json({
            exito: true,
            mensaje: "¡Compra confirmada! El inventario ha sido actualizado en el sistema.",
            total: total
        });

    } catch (error) {
        console.error("Falla masiva al actualizar el inventario:", error);
        res.status(500).json({ exito: false, mensaje: "Error interno al procesar el stock en el backend" });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor espartano escuchando en el puerto ${PORT}`);
});