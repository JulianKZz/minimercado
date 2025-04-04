//AuthRoutes
import express from 'express';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import User from '../models/User.js'; // Asegúrate de tener un modelo de usuario

const router = express.Router();

// Configuración de Nodemailer
const transporter = nodemailer.createTransport({
    host: 'smtp.example.com', // Tu servidor SMTP
    port: 587,
    secure: false,
    auth: {
        user: 'tu-email@example.com', // Tu correo electrónico
        pass: 'tu-contraseña', // Tu contraseña
    },
});

// Ruta para registrar un nuevo usuario
router.post('/register', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Verificar si el usuario ya existe
        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        // Crear el nuevo usuario sin hash
        const newUser = new User({
            email,
            password, // Almacena la contraseña tal cual
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        await User.create(newUser); // Aquí llamarías a tu método de creación

        // Enviar correo de confirmación
        const mailOptions = {
            from: 'remitente@example.com',
            to: email,
            subject: 'Confirmación de registro',
            text: 'Gracias por registrarte. ¡Bienvenido!',
        };

        await transporter.sendMail(mailOptions);

        res.status(201).json({ message: 'Usuario registrado con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar el usuario', error });
    }
});

// Ruta para iniciar sesión
// Ruta para iniciar sesión
// Ejemplo del controlador de login en el backend
router.post('/login', async (req, res) => {
  try {
      const { email, password } = req.body;

      // Busca al usuario en la base de datos
      const user = await User.findByEmail(email);
      if (!user || password !== user.password) {
          return res.status(400).json({ message: 'Credenciales incorrectas' });
      }

      // Genera un token JWT
      const token = jwt.sign({ id: user.id }, 'tu_secreto', { expiresIn: '1h' });

      // Respuesta exitosa en formato JSON
      return res.json({ message: 'Inicio de sesión exitoso', token });
  } catch (error) {
      console.error('Error en /login:', error);
      return res.status(500).json({ message: 'Error interno del servidor' });
  }
});



export default router;
