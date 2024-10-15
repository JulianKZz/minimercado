import { getAllCiudades } from '../Model/CiudadModel.js'; // Corregido

const getAllCiudadesController = async (req, res) => {
    try {
        const ciudades = await getAllCiudades(); // Llamada correcta
        res.json(ciudades);
    } catch (error) {
        res.status(500).json({ message: error.message }); // Corregido el uso de res.status
    }
};

export { getAllCiudadesController };
