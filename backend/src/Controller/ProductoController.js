// Importar el modelo de productos
import ProductoModel from '../models/ProductoModel.js';

// Controlador para productos
const ProductoController = {
    // Obtener todos los productos
    getAll: async (req, res) => {
        try {
            const productos = await ProductoModel.getAll();
            res.json(productos);
        } catch (error) {
            console.error('Error en controlador getAll:', error);
            res.status(500).json({ error: 'Error al obtener productos' });
        }
    },

    // Obtener un producto por ID
    getById: async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const producto = await ProductoModel.getById(id);
            
            if (!producto) {
                return res.status(404).json({ error: 'Producto no encontrado' });
            }
            
            res.json(producto);
        } catch (error) {
            console.error('Error en controlador getById:', error);
            res.status(500).json({ error: 'Error al obtener el producto' });
        }
    },

    // Crear un nuevo producto
    create: async (req, res) => {
        try {
            const { nombre, categoria, cantidad, unidad, precio } = req.body;
            
            // Validación básica
            if (!nombre || !categoria || !cantidad || !unidad || !precio) {
                return res.status(400).json({ error: 'Todos los campos son obligatorios' });
            }
            
            const nuevoProducto = await ProductoModel.create({
                nombre,
                categoria,
                cantidad,
                unidad,
                precio
            });
            
            res.status(201).json(nuevoProducto);
        } catch (error) {
            console.error('Error en controlador create:', error);
            res.status(500).json({ error: 'Error al crear el producto' });
        }
    },

    // Actualizar un producto
    update: async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const { nombre, categoria, cantidad, unidad, precio } = req.body;
            
            // Validación básica
            if (!nombre || !categoria || !cantidad || !unidad || !precio) {
                return res.status(400).json({ error: 'Todos los campos son obligatorios' });
            }
            
            // Verificar si el producto existe
            const productoExistente = await ProductoModel.getById(id);
            if (!productoExistente) {
                return res.status(404).json({ error: 'Producto no encontrado' });
            }
            
            const productoActualizado = await ProductoModel.update(id, {
                nombre,
                categoria,
                cantidad,
                unidad,
                precio
            });
            
            res.json(productoActualizado);
        } catch (error) {
            console.error('Error en controlador update:', error);
            res.status(500).json({ error: 'Error al actualizar el producto' });
        }
    },

    // Eliminar un producto
    delete: async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            
            // Verificar si el producto existe
            const productoExistente = await ProductoModel.getById(id);
            if (!productoExistente) {
                return res.status(404).json({ error: 'Producto no encontrado' });
            }
            
            await ProductoModel.delete(id);
            res.json({ mensaje: 'Producto eliminado correctamente' });
        } catch (error) {
            console.error('Error en controlador delete:', error);
            res.status(500).json({ error: 'Error al eliminar el producto' });
        }
    }
};

export default ProductoController;