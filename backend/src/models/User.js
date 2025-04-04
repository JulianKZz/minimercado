// src/models/User.js
import sql from 'mssql';
import { poolPromise } from '../Config/Connection.js'; // Asegúrate de que la ruta sea correcta

class User {
  constructor(email, password) {
    this.email = email;
    this.password = password;
    this.createdAt = new Date(); // Almacena la fecha y hora actual
    this.updatedAt = new Date(); // Almacena la fecha y hora actual
  }

  // Método para guardar un nuevo usuario en la base de datos
  static async create(user) {
    try {
      const pool = await poolPromise; // Obtener el pool de conexiones
      const result = await pool.request()
        .input('email', sql.NVarChar(255), user.email)
        .input('password', sql.NVarChar(255), user.password) // Guarda la contraseña como está
        .input('createdAt', sql.DateTimeOffset, user.createdAt) // Guarda la fecha de creación
        .input('updatedAt', sql.DateTimeOffset, user.updatedAt) // Guarda la fecha de actualización
        .query(`
          INSERT INTO Users (email, password, createdAt, updatedAt) 
          VALUES (@email, @password, @createdAt, @updatedAt)
        `); // Asegúrate de que la tabla y columnas coincidan con tu base de datos
      return result;
    } catch (error) {
      console.error('Error al crear usuario:', error);
      throw error;
    }
  }

  // Método para obtener todos los usuarios
  static async getAll() {
    try {
      const pool = await poolPromise;
      const result = await pool.request().query('SELECT * FROM Users'); // Ajusta la tabla según tu base de datos
      return result.recordset; // Retorna el conjunto de registros
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      throw error;
    }
  }

  // Método actualizado para obtener un usuario por ID y email
  static async findByIdAndEmail(id, email) {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('id', sql.Int, id)
        .input('email', sql.NVarChar(255), email)
        .query('SELECT * FROM Users WHERE id = @id AND email = @email');
      return result.recordset[0];
    } catch (error) {
      console.error('Error al buscar usuario por ID y email:', error);
      throw error;
    }
  }

static async findByEmail(email) {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('email', sql.NVarChar(255), email)
      .query('SELECT * FROM Users WHERE email = @email');
    return result.recordset[0]; // Retorna el primer usuario encontrado o undefined si no existe
  } catch (error) {
    console.error('Error al buscar usuario por email:', error);
    throw error;
  }
}


// src/models/User.js
// Agrega este método en la clase User
// Actualiza la contraseña usando el ID y el email
static async updatePassword(user) {
  try {
      const pool = await poolPromise;
      await pool.request()
          .input('id', sql.Int, user.id)
          .input('newPassword', sql.NVarChar(255), user.password)
          .query(`
              UPDATE Users 
              SET password = @newPassword, updatedAt = GETDATE() 
              WHERE id = @id
          `);
  } catch (error) {
      console.error('Error al actualizar la contraseña:', error);
      throw error;
  }
}

}

export default User;
