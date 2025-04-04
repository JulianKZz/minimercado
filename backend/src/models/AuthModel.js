//AuthModel
import pkg from 'pg';
const { Pool } = pkg;


const pool = new Pool({
  user: 'your_db_user',
  host: 'localhost',
  database: 'your_database_name',
  password: 'your_db_password',
  port: 5432,
});

export const checkUserCredentials = async (username, password) => {
  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE username = $1 AND password = $2',
      [username, password]
    );
    
    return result.rows.length > 0 ? result.rows[0] : null; // Devuelve el primer usuario encontrado o null si no se encuentra
  } catch (error) {
    console.error('Error al verificar las credenciales:', error);
    throw new Error('Error en la verificación de credenciales');
  }
};
