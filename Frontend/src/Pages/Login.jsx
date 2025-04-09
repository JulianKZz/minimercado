import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate para redirigir después de login
import { loginUser } from '../Service/AuthService'; // Importar el servicio de autenticación

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Hook para redirigir

  // Verificamos si el usuario ya tiene un token guardado
  useEffect(() => {
  const token = localStorage.getItem('token');
  if (token) {
    // Si ya hay token, redirigimos al dashboard
    navigate('/reservas');
  }
}, [navigate]);


const handleSubmit = async (event) => {
  event.preventDefault();

  if (!email || !password) {
    setErrorMessage('Por favor, llena todos los campos.');
    return;
  }

  try {
    const response = await loginUser(email, password);
    console.log('Respuesta del backend:', response);

    if (response && response.token) {
      localStorage.setItem('token', response.token);
      onLogin(response.token);
      navigate('/reservas');
    } else {
      setErrorMessage('Credenciales inválidas o error en el servidor.');
    }
  } catch (error) {
    console.error('Error durante el login:', error.message);
    setErrorMessage('Credenciales inválidas o error de conexión.');
  }
};


  return (
    <div className="login-page">
      {/* Imagen del restaurante en la parte superior */}
      <div className="login-header">
        <img src="/src/assets/img/inventLogin.jpg" alt="Restaurante" className="restaurant-image" />
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
