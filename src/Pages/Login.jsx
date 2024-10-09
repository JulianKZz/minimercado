import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Usamos Link para la navegación interna

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Validación básica
    if (!email || !password) {
      setErrorMessage('Por favor, llena todos los campos.');
      return;
    }
    // Llamar a la función onLogin para autenticar
    onLogin(email, password);
    
     // Validar credenciales predefinidas
     if (email === 'testuser@example.com' && password === 'password123') {
        onLogin(email, password);  // Ingresar automáticamente si las credenciales coinciden
      } else {
        setErrorMessage('Credenciales inválidas.');
      }

    
  };
  

  return (
    <div className="login-page">
      {/* Imagen del restaurante en la parte superior */}
      <div className="login-header">
        <img src="/src/assets/img/principal.jpg" alt="Restaurante" className="restaurant-image" />
      </div>
      
      <h1>Iniciar Sesión</h1>
      <form className="login-form" onSubmit={handleSubmit}>
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
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit" className="btn-submit">Ingresar</button>
      </form>

      {/* Enlaces para crear una cuenta y cambiar la contraseña */}
      <div className="login-links">
        <p>
          ¿No tienes una cuenta? <Link to='/registro'>Crea una aquí</Link>
        </p>
        <p>
          ¿Olvidaste tu contraseña? <Link to="/recuperar-contraseña">Recupérala aquí</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
