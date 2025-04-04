// backend/src/Routes/TeamRoutes.js
const express = require('express');
const router = express.Router();
const { 
    getWaiters, getChefs, getBestCustomers,
    updateWaiter, updateChef, updateCustomer,
    deleteWaiter, deleteChef, deleteCustomer 
} = require('../Controller/TeamController');

// Rutas GET existentes
router.get('/waiters', getWaiters);
router.get('/chefs', getChefs);
router.get('/best_customers', getBestCustomers);

// Nuevas rutas para actualizar
router.put('/waiters/:id', updateWaiter);
router.put('/chefs/:id', updateChef);
router.put('/best_customers/:id', updateCustomer);

// Nuevas rutas para eliminar
router.delete('/waiters/:id', deleteWaiter);
router.delete('/chefs/:id', deleteChef);
router.delete('/best_customers/:id', deleteCustomer);

module.exports = router;