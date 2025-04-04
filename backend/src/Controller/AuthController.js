//AuthController
import { poolPromise } from '../Config/Connection.js';
import sql from 'mssql';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';  // Importar nodemailer

// Registro de usuario
export const register = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Por favor, completa todos los campos.' });
    }

    try {
        const pool = await poolPromise;

        // Verificar si el correo ya está registrado
        const result = await pool.request()
            .input('email', sql.VarChar, email)
            .query('SELECT * FROM dbo.Users WHERE email = @email');

        if (result.recordset.length > 0) {
            return res.status(409).json({ message: 'El correo ya está registrado.' });
        }

        // Insertar el nuevo usuario (se recomienda encriptar la contraseña)
        await pool.request()
            .input('email', sql.VarChar, email)
            .input('password', sql.VarChar, password)  // Sin encriptar (debe ser encriptada)
            .query('INSERT INTO dbo.Users (email, password, createdAt, updatedAt) VALUES (@email, @password, SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET())');

        // Generar el token JWT
        const token = jwt.sign({ email }, process.env.JWT_SECRET || 'secret_key', { expiresIn: '1h' });

        res.status(201).json({ message: 'Usuario registrado con éxito', token });

    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        res.status(500).json({ message: 'Error en el servidor.' });
    }
};

// Login de usuario
export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Por favor, completa todos los campos.' });
    }

    try {
        const pool = await poolPromise;

        // Obtener el usuario por email
        const result = await pool.request()
            .input('email', sql.VarChar, email)
            .query('SELECT * FROM dbo.Users WHERE email = @email');

        if (result.recordset.length === 0) {
            return res.status(400).json({ message: 'El usuario no existe.' });
        }

        const user = result.recordset[0];

        // Comparar las contraseñas (debe ser encriptada)
        if (password !== user.password) {
            return res.status(400).json({ message: 'Contraseña incorrecta.' });
        }

        // Generar el token JWT
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'secret_key', { expiresIn: '1h' });

        res.status(200).json({ message: 'Login exitoso', token });

    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ message: 'Error en el servidor.' });
    }
};

// Recuperar contraseña
export const recoverPasswordById = async (req, res) => {
    const { id, email, newPassword } = req.body;

    if (!id || !email || !newPassword) {
        return res.status(400).json({ message: 'Por favor, ingrese su ID, correo y nueva contraseña.' });
    }

    try {
        const pool = await poolPromise;

        // Verificar si el usuario existe en la base de datos por ID y correo electrónico
        const result = await pool.request()
            .input('id', sql.Int, id)
            .input('email', sql.VarChar, email)
            .query('SELECT * FROM [dbo].[Users] WHERE id = @id AND email = @email');

        if (result.recordset.length === 0) {
            return res.status(400).json({ message: 'El usuario no existe o los datos no coinciden.' });
        }

        // Actualizar la contraseña en la base de datos
        await pool.request()
            .input('id', sql.Int, id)
            .input('newPassword', sql.NVarChar, newPassword)
            .query('UPDATE [dbo].[Users] SET password = @newPassword, updatedAt = SYSDATETIMEOFFSET() WHERE id = @id');

        res.status(200).json({ message: 'Contraseña actualizada con éxito.' });

    } catch (error) {
        console.error('Error al recuperar la contraseña:', error);
        res.status(500).json({ message: 'Error en el servidor.' });
    } finally {
        sql.close();
    }
};  

export const changePasswordById = async (req, res) => {
    const { userId, newPassword } = req.body;

    if (!userId || !newPassword) {
        return res.status(400).json({ message: 'Por favor, ingrese su ID de usuario y nueva contraseña.' });
    }

    try {
        const pool = await poolPromise;

        // Verificar si el usuario existe en la base de datos
        const result = await pool.request()
            .input('id', sql.Int, userId)
            .query('SELECT * FROM dbo.Users WHERE id = @id');

        if (result.recordset.length === 0) {
            return res.status(400).json({ message: 'El usuario no existe.' });
        }

        // Actualizar la contraseña
        await pool.request()
            .input('id', sql.Int, userId)
            .input('newPassword', sql.VarChar, newPassword)
            .query('UPDATE dbo.Users SET password = @newPassword, updatedAt = SYSDATETIMEOFFSET() WHERE id = @id');

        res.status(200).json({ message: 'Contraseña cambiada con éxito.' });

    } catch (error) {
        console.error('Error al cambiar la contraseña:', error);
        res.status(500).json({ message: 'Error en el servidor.' });
    }
};
