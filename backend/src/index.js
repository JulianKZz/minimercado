// src/index.js
import express from 'express';
import { poolPromise } from './Config/Connection.js';
import cors from 'cors';
import User from './models/User.js';
import jwt from 'jsonwebtoken';
import sql from 'mssql';  
import { 
    getWaiters, getChefs, getBestCustomers,
    createWaiter, createChef, createCustomer,
    updateWaiter, updateChef, updateCustomer,
    deleteWaiter, deleteChef, deleteCustomer 
} from './Controller/TeamController.js';
import productoRoutes from './Routes/ProductoRoutes.js';

// Manejo de errores no capturados
process.on('uncaughtException', (error) => {
    console.error('Error no capturado:', error);
});

const app = express();

// Configuración del middleware
app.use(express.json());
app.use(cors());

// Rutas de autenticación
app.post('/auth/register', async (req, res) => {
    const { email, password } = req.body;
    
    console.log('Datos recibidos:', { email, password });

    try {
        if (!email || !password) {
            return res.status(400).json({ 
                message: 'Email y password son requeridos',
                received: { email: !!email, password: !!password }
            });
        }

        const pool = await poolPromise;
        const userCheck = await pool.request()
            .input('email', sql.NVarChar, email)
            .query('SELECT * FROM Users WHERE email = @email');

        if (userCheck.recordset.length > 0) {
            return res.status(400).json({ 
                message: 'El usuario ya existe',
                email
            });
        }

        const result = await pool.request()
            .input('email', sql.NVarChar, email)
            .input('password', sql.NVarChar, password)
            .input('createdAt', sql.DateTimeOffset, new Date())
            .input('updatedAt', sql.DateTimeOffset, new Date())
            .query(`
                INSERT INTO Users (email, password, createdAt, updatedAt)
                VALUES (@email, @password, @createdAt, @updatedAt);
                SELECT SCOPE_IDENTITY() AS id;
            `);

        const userId = result.recordset[0].id;

        res.status(201).json({ 
            message: 'Usuario creado exitosamente',
            userId,
            email 
        });

    } catch (error) {
        console.error('Error detallado:', error);
        res.status(500).json({ 
            message: 'Error al crear el usuario',
            error: error.message,
            stack: error.stack
        });
    }
});

app.post('/auth/login', async (req, res) => {
    const { email, password } = req.body;
    
    console.log('Intento de login:', { email, password });

    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('email', sql.NVarChar, email)
            .query('SELECT * FROM Users WHERE email = @email');

        const user = result.recordset[0];
        
        console.log('Usuario encontrado:', user);

        if (!user) {
            return res.status(404).json({ 
                message: 'Usuario no encontrado',
                email 
            });
        }

        if (user.password !== password) {
            return res.status(401).json({ 
                message: 'Contraseña incorrecta',
                debug: {
                    providedPassword: password,
                    storedPassword: user.password,
                    match: password === user.password
                }
            });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            'tu_secreto_jwt',
            { expiresIn: '1h' }
        );

        res.json({ 
            message: 'Login exitoso',
            token,
            user: {
                id: user.id,
                email: user.email
            }
        });

    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({ 
            message: 'Error en el servidor',
            error: error.message,
            stack: error.stack
        });
    }
});

app.post('/auth/recover-password', async (req, res) => {
    const { id, email, newPassword } = req.body;

    try {
        const user = await User.findByIdAndEmail(id, email);
        if (!user) {
            return res.status(404).json({ 
                message: 'No se encontró un usuario con ese ID y email' 
            });
        }

        user.password = newPassword;
        await User.updatePassword(user);

        res.status(200).json({ 
            message: 'Contraseña actualizada exitosamente' 
        });

    } catch (error) {
        console.error('Error al recuperar la contraseña:', error);
        res.status(500).json({ 
            message: 'Error al actualizar la contraseña',
            error: error.message 
        });
    }
});

app.get('/api/users', async (req, res) => {
    try {
        const users = await User.getAll();
        res.json(users);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).send('Error al obtener los usuarios');
    }
});

// Rutas para Meseros (Waiters)
app.get('/api/waiters', getWaiters);
app.post('/api/waiters', createWaiter);
app.put('/api/waiters/:id', updateWaiter);
app.delete('/api/waiters/:id', deleteWaiter);

// Rutas para Chefs
app.get('/api/chefs', getChefs);
app.post('/api/chefs', createChef);
app.put('/api/chefs/:id', updateChef);
app.delete('/api/chefs/:id', deleteChef);

// Rutas para Mejores Clientes (Best Customers)
app.get('/api/best_customers', getBestCustomers);
app.post('/api/best_customers', createCustomer);
app.put('/api/best_customers/:id', updateCustomer);
app.delete('/api/best_customers/:id', deleteCustomer);

// Rutas para Productos (Inventario) - Utilizando el enrutador
app.use('/api', productoRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API del Sistema de Inventario funcionando correctamente');
});

// Iniciar el servidor
const PORT = 8085;
app.listen(PORT, () => {
    console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});