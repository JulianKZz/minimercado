import { sql } from "../Config/Connection.js";

// Asegúrate de que el nombre sea "getAllCiudades"
const getAllCiudades = async () => {
    try {
        const resultado = await sql.query('SELECT * FROM Usuarios');
        return resultado.recordset;
    } catch (error) {
        throw error;
    }
};

export { getAllCiudades }; // Exporta con el mismo nombre
