// src/Controller/TeamController.js
import { poolPromise } from '../Config/Connection.js';
import sql from 'mssql';

export const getWaiters = async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .query('SELECT id, nombre, edad, experiencia FROM waiters');
        res.json(result.recordset);
    } catch (error) {
        console.error('Error al obtener meseros:', error);
        res.status(500).json({ 
            message: 'Error al obtener los meseros',
            error: error.message 
        });
    }
};

export const getChefs = async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .query('SELECT id, nombre, especialidad, años_experiencia FROM chefs');
        res.json(result.recordset);
    } catch (error) {
        console.error('Error al obtener chefs:', error);
        res.status(500).json({ 
            message: 'Error al obtener los chefs',
            error: error.message 
        });
    }
};

export const getBestCustomers = async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .query('SELECT id, nombre, total_compras, visitas FROM best_customers');
        res.json(result.recordset);
    } catch (error) {
        console.error('Error al obtener mejores clientes:', error);
        res.status(500).json({ 
            message: 'Error al obtener los mejores clientes',
            error: error.message 
        });
    }
};
// Función para actualizar un mesero
export const updateWaiter = async (req, res) => {
    try {
      const { id, nombre, edad, experiencia } = req.body;
      const pool = await poolPromise;
      const result = await pool.request()
        .input('id', sql.Int, id)
        .input('nombre', sql.NVarChar, nombre)
        .input('edad', sql.Int, edad)
        .input('experiencia', sql.Int, experiencia)
        .query(`
          UPDATE waiters
          SET nombre = @nombre, edad = @edad, experiencia = @experiencia
          WHERE id = @id
        `);
  
      if (result.rowsAffected[0] > 0) {
        res.json({ message: 'Mesero actualizado exitosamente' });
      } else {
        res.status(404).json({ message: 'Mesero no encontrado' });
      }
    } catch (error) {
      console.error('Error al actualizar mesero:', error);
      res.status(500).json({
        message: 'Error al actualizar el mesero',
        error: error.message
      });
    }
  };
  
  // Función para eliminar un mesero
  export const deleteWaiter = async (req, res) => {
    try {
      const { id } = req.params;
      const pool = await poolPromise;
      const result = await pool.request()
        .input('id', sql.Int, id)
        .query('DELETE FROM waiters WHERE id = @id');
  
      if (result.rowsAffected[0] > 0) {
        res.json({ message: 'Mesero eliminado exitosamente' });
      } else {
        res.status(404).json({ message: 'Mesero no encontrado' });
      }
    } catch (error) {
      console.error('Error al eliminar mesero:', error);
      res.status(500).json({
        message: 'Error al eliminar el mesero',
        error: error.message
      });
    }
  };
  
  // Función para actualizar un chef
  export const updateChef = async (req, res) => {
    try {
      const { id, nombre, especialidad, años_experiencia } = req.body;
      const pool = await poolPromise;
      const result = await pool.request()
        .input('id', sql.Int, id)
        .input('nombre', sql.NVarChar, nombre)
        .input('especialidad', sql.NVarChar, especialidad)
        .input('años_experiencia', sql.Int, años_experiencia)
        .query(`
          UPDATE chefs
          SET nombre = @nombre, especialidad = @especialidad, años_experiencia = @años_experiencia
          WHERE id = @id
        `);
  
      if (result.rowsAffected[0] > 0) {
        res.json({ message: 'Chef actualizado exitosamente' });
      } else {
        res.status(404).json({ message: 'Chef no encontrado' });
      }
    } catch (error) {
      console.error('Error al actualizar chef:', error);
      res.status(500).json({
        message: 'Error al actualizar el chef',
        error: error.message
      });
    }
  };
  
  // Función para eliminar un chef
  export const deleteChef = async (req, res) => {
    try {
      const { id } = req.params;
      const pool = await poolPromise;
      const result = await pool.request()
        .input('id', sql.Int, id)
        .query('DELETE FROM chefs WHERE id = @id');
  
      if (result.rowsAffected[0] > 0) {
        res.json({ message: 'Chef eliminado exitosamente' });
      } else {
        res.status(404).json({ message: 'Chef no encontrado' });
      }
    } catch (error) {
      console.error('Error al eliminar chef:', error);
      res.status(500).json({
        message: 'Error al eliminar el chef',
        error: error.message
      });
    }
  };
  
  // Función para actualizar un cliente
  export const updateCustomer = async (req, res) => {
    try {
      const { id, nombre, total_compras, visitas } = req.body;
      const pool = await poolPromise;
      const result = await pool.request()
        .input('id', sql.Int, id)
        .input('nombre', sql.NVarChar, nombre)
        .input('total_compras', sql.Decimal, total_compras)
        .input('visitas', sql.Int, visitas)
        .query(`
          UPDATE best_customers
          SET nombre = @nombre, total_compras = @total_compras, visitas = @visitas
          WHERE id = @id
        `);
  
      if (result.rowsAffected[0] > 0) {
        res.json({ message: 'Cliente actualizado exitosamente' });
      } else {
        res.status(404).json({ message: 'Cliente no encontrado' });
      }
    } catch (error) {
      console.error('Error al actualizar cliente:', error);
      res.status(500).json({
        message: 'Error al actualizar el cliente',
        error: error.message
      });
    }
  };
  
  // Función para eliminar un cliente
  export const deleteCustomer = async (req, res) => {
    try {
      const { id } = req.params;
      const pool = await poolPromise;
      const result = await pool.request()
        .input('id', sql.Int, id)
        .query('DELETE FROM best_customers WHERE id = @id');
  
      if (result.rowsAffected[0] > 0) {
        res.json({ message: 'Cliente eliminado exitosamente' });
      } else {
        res.status(404).json({ message: 'Cliente no encontrado' });
      }
    } catch (error) {
      console.error('Error al eliminar cliente:', error);
      res.status(500).json({
        message: 'Error al eliminar el cliente',
        error: error.message
      });
    }
  };
  // src/Controller/TeamController.js
// ... (código existente) ...

// Función para crear un chef
export const createChef = async (req, res) => {
  try {
      const { nombre, especialidad, años_experiencia } = req.body;
      const pool = await poolPromise;
      const result = await pool.request()
          .input('nombre', sql.NVarChar, nombre)
          .input('especialidad', sql.NVarChar, especialidad)
          .input('años_experiencia', sql.Int, años_experiencia)
          .query(`
              INSERT INTO chefs (nombre, especialidad, años_experiencia)
              VALUES (@nombre, @especialidad, @años_experiencia);
              SELECT SCOPE_IDENTITY() AS id;
          `);

      const newChef = {
          id: result.recordset[0].id,
          nombre,
          especialidad,
          años_experiencia
      };

      res.status(201).json(newChef);
  } catch (error) {
      console.error('Error al crear chef:', error);
      res.status(500).json({
          message: 'Error al crear el chef',
          error: error.message
      });
  }
};

// Función para crear un mesero
export const createWaiter = async (req, res) => {
  try {
      const { nombre, edad, experiencia } = req.body;
      const pool = await poolPromise;
      const result = await pool.request()
          .input('nombre', sql.NVarChar, nombre)
          .input('edad', sql.Int, edad)
          .input('experiencia', sql.Int, experiencia)
          .query(`
              INSERT INTO waiters (nombre, edad, experiencia)
              VALUES (@nombre, @edad, @experiencia);
              SELECT SCOPE_IDENTITY() AS id;
          `);

      const newWaiter = {
          id: result.recordset[0].id,
          nombre,
          edad,
          experiencia
      };

      res.status(201).json(newWaiter);
  } catch (error) {
      console.error('Error al crear mesero:', error);
      res.status(500).json({
          message: 'Error al crear el mesero',
          error: error.message
      });
  }
};

// Función para crear un cliente
export const createCustomer = async (req, res) => {
  try {
      const { nombre, total_compras, visitas } = req.body;
      const pool = await poolPromise;
      const result = await pool.request()
          .input('nombre', sql.NVarChar, nombre)
          .input('total_compras', sql.Decimal, total_compras)
          .input('visitas', sql.Int, visitas)
          .query(`
              INSERT INTO best_customers (nombre, total_compras, visitas)
              VALUES (@nombre, @total_compras, @visitas);
              SELECT SCOPE_IDENTITY() AS id;
          `);

      const newCustomer = {
          id: result.recordset[0].id,
          nombre,
          total_compras,
          visitas
      };

      res.status(201).json(newCustomer);
  } catch (error) {
      console.error('Error al crear cliente:', error);
      res.status(500).json({
          message: 'Error al crear el cliente',
          error: error.message
      });
  }
};