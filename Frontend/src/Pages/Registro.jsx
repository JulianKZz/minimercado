import React, { useState } from 'react';
import { registerUser } from '../Service/AuthService'; // Asegúrate de que la ruta es correcta

const Registro = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage('Las contraseñas no coinciden.');
      return;
    }

    try {
      const response = await registerUser(email, password); // Llamada a la función de registro
      setSuccessMessage('Usuario registrado con éxito.');
      setErrorMessage(''); // Limpiar mensaje de error si el registro es exitoso
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      setErrorMessage('Error al registrar usuario. Inténtalo nuevamente.');
    }
  };

  return (
    <div className="register-page">
      <h1>Crear Cuenta</h1>
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Correo Electrónico:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <button type="submit" className="btn-submit">Registrarse</button>
      </form>
    </div>
  );
};

export default Registro;
