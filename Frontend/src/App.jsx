import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Layout/Layout';
import Login from './Pages/Login';
import Reservas from './Pages/Reservas';
import Conocenos from './Pages/Conocenos';
import Contacto from './Pages/Contacto';
import Terminos from './Pages/Terminos';
import Privacidad from './Pages/Privacidad';
import Registro from './Pages/Registro';
import RecuperarContraseña from './Pages/RecuperarContraseña';
import Chefs from './Pages/Chefs';
import Meseros from './Pages/Meseros';
import MejoresClientes from './Pages/MejoresClientes';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (email, password) => {
    setIsAuthenticated(true);
  };

  return (
    <Routes>
      <Route path="/registro" element={<Registro />} />
      <Route path="/recuperar-contraseña" element={<RecuperarContraseña />} />

      {/* Ruta de login */}
      <Route path="/" element={isAuthenticated ? <Navigate to="/reservas" /> : <Login onLogin={handleLogin} />} />

      {/* Rutas protegidas dentro del Layout */}
      {isAuthenticated && (
        <Route element={<Layout />}>
          <Route path="/reservas" element={<Reservas />} />
          <Route path="/conocenos" element={<Conocenos />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/terminos" element={<Terminos />} />
          <Route path="/privacidad" element={<Privacidad />} />
          <Route path="/chefs" element={<Chefs />} />
          <Route path="/meseros" element={<Meseros />} />
          <Route path="/mejores-clientes" element={<MejoresClientes />} />
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