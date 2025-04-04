import React, { useState } from 'react';
import { recoverPassword } from '../Service/AuthService';  // Asegúrate de que la ruta sea correcta

const RecuperarContraseña = () => {
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!userId || !email || !newPassword) {
      setErrorMessage('Por favor ingresa tu ID de usuario, correo electrónico y nueva contraseña.');
      return;
    }

    try {
      // Llamada al servicio para enviar la solicitud de recuperación de contraseña
      const response = await recoverPassword(userId, email, newPassword);  // Enviar los datos al backend

      setSuccessMessage('Contraseña actualizada con éxito.');
      setErrorMessage(''); // Limpiar el mensaje de error si es exitoso
    } catch (error) {
      console.error('Error al recuperar la contraseña:', error);
      setErrorMessage('No se pudo actualizar la contraseña. Intenta nuevamente.');
      setSuccessMessage(''); // Limpiar el mensaje de éxito si hay error
    }
  };

  return (
    <div className="recover-page">
      <h1>Recuperar Contraseña</h1>
      <form className="recover-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="userId">ID de Usuario:</label>
          <input
            type="text"
            id="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </div>
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
          <label htmlFor="newPassword">Nueva Contraseña:</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}

        <button type="submit" className="btn-submit">Recuperar</button>
      </form>
    </div>
  );
};

export default RecuperarContraseña;
