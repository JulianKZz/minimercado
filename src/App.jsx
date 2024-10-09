import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Layout/Layout';
import Login from './Pages/Login'; // Asegúrate de importar Login
import Reservas from './Pages/Reservas'; // Importa las demás páginas
import Conocenos from './Pages/Conocenos';
import Contacto from './Pages/Contacto';
import Terminos from './Pages/Terminos';
import Privacidad from './Pages/Privacidad';
import Registro from './Pages/Registro';
import RecuperarContraseña from './Pages/RecuperarContraseña';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado para la autenticación

  const handleLogin = (email, password) => {
    // Aquí puedes validar el email y password con una API o credenciales falsas para pruebas
     if (email === 'testuser@example.com' && password === 'password123') {
      setIsAuthenticated(true); // Autenticar al usuario si las credenciales son correctas
      navigate('/reservas');
    }
  };

  return (
    
    <Routes>
      <Route path="/registro" element={<Registro />} />
      <Route path="/recuperar-contraseña" element={<RecuperarContraseña />} />
      {/* Ruta de login */}
      <Route path="/" element={isAuthenticated ? <Navigate to="/Reservas" /> : <Login onLogin={handleLogin} />} />

      {/* Rutas protegidas dentro del Layout */}
      {isAuthenticated && (
        <Route element={<Layout />}>  {/* Layout envuelve las rutas protegidas */}
          <Route path="/reservas" element={<Reservas />} />
          <Route path="/conocenos" element={<Conocenos />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/terminos" element={<Terminos />} />
          <Route path="/privacidad" element={<Privacidad />} />
        </Route>
      )}

      {/* Redirección si no está autenticado */}
      {!isAuthenticated && (
        <Route path="*" element={<Navigate to="/" />} />
      )}
    </Routes>
  );
}

export default App;

