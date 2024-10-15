import express from 'express';
import { getAllCiudadesController } from '../Controller/CiudadController.js'; // Corregido

const router = express.Router();

// Usar la referencia, no ejecutar la función directamente
router.get('/listarc', getAllCiudadesController); 

export default router;
