import express from 'express';
import ProductoController from '../Controller/ProductoController.js';

const router = express.Router();

// Ruta para obtener todos los productos
router.get('/productos', ProductoController.getAll);

// Ruta para obtener un producto por ID
router.get('/productos/:id', ProductoController.getById);

// Ruta para crear un nuevo producto
router.post('/productos', ProductoController.create);

// Ruta para actualizar un producto
router.put('/productos/:id', ProductoController.update);

// Ruta para eliminar un producto
router.delete('/productos/:id', ProductoController.delete);

export default router;