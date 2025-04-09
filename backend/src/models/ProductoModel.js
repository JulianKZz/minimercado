// Importar el pool de conexiones y el módulo SQL
import { poolPromise } from '../Config/Connection.js';
import sql from '../Config/Connection.js';

// Modelo para productos
const ProductoModel = {
    // Obtener todos los productos
    getAll: async () => {
        try {
            const pool = await poolPromise;
            const result = await pool.request().query('SELECT * FROM Productos');
            return result.recordset;
        } catch (error) {
            console.error('Error al obtener productos:', error);
            throw error;
        }
    },

    // Obtener un producto por ID
    getById: async (id) => {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('id', sql.Int, id)
                .query('SELECT * FROM Productos WHERE id = @id');
            return result.recordset[0];
        } catch (error) {
            console.error('Error al obtener producto por ID:', error);
            throw error;
        }
    },

    // Crear un nuevo producto
    create: async (producto) => {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('nombre', sql.VarChar(100), producto.nombre)
                .input('categoria', sql.VarChar(100), producto.categoria)
                .input('cantidad', sql.Int, producto.cantidad)
                .input('unidad', sql.VarChar(50), producto.unidad)
                .input('precio', sql.Decimal(10, 2), producto.precio)
                .query(`
                    INSERT INTO Productos (nombre, categoria, cantidad, unidad, precio)
                    OUTPUT INSERTED.*
                    VALUES (@nombre, @categoria, @cantidad, @unidad, @precio)
                `);
            return result.recordset[0];
        } catch (error) {
            console.error('Error al crear producto:', error);
            throw error;
        }
    },

    // Actualizar un producto
    update: async (id, producto) => {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('id', sql.Int, id)
                .input('nombre', sql.VarChar(100), producto.nombre)
                .input('categoria', sql.VarChar(100), producto.categoria)
                .input('cantidad', sql.Int, producto.cantidad)
                .input('unidad', sql.VarChar(50), producto.unidad)
                .input('precio', sql.Decimal(10, 2), producto.precio)
                .query(`
                    UPDATE Productos
                    SET nombre = @nombre,
                        categoria = @categoria,
                        cantidad = @cantidad,
                        unidad = @unidad,
                        precio = @precio
                    OUTPUT INSERTED.*
                    WHERE id = @id
                `);
            return result.recordset[0];
        } catch (error) {
            console.error('Error al actualizar producto:', error);
            throw error;
        }
    },

    // Eliminar un producto
    delete: async (id) => {
        try {
            const pool = await poolPromise;
            await pool.request()
                .input('id', sql.Int, id)
                .query('DELETE FROM Productos WHERE id = @id');
            return { success: true };
        } catch (error) {
            console.error('Error al eliminar producto:', error);
            throw error;
        }
    }
};

export default ProductoModel;