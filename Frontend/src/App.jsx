import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout/Layout';
import Login from './Pages/Login';
import Inventario from './Pages/Inventario';
import AgregarProducto from './Pages/AgregarProducto';
import EditarProducto from './Pages/EditarProducto';
import EliminarProducto from './Pages/EliminarProducto';
import Terminos from './Pages/Terminos';
import Privacidad from './Pages/Privacidad';
import Registro from './Pages/Registro';
import RecuperarContraseña from './Pages/RecuperarContraseña';
import Chefs from './Pages/Chefs';
import Principal from './Pages/Principal';
import Contacto from './Pages/Contacto';

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/recuperar-contrasena" element={<RecuperarContraseña />} />
        
        {/* Rutas con layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Principal />} />
          <Route path="inventario" element={<Inventario />} />
          <Route path="agregar-producto" element={<AgregarProducto />} />
          <Route path="editar-producto" element={<EditarProducto />} />
          <Route path="eliminar-producto" element={<EliminarProducto />} />
          <Route path="chefs" element={<Chefs />} />
          <Route path="contacto" element={<Contacto />} />
          <Route path="terminos" element={<Terminos />} />
          <Route path="privacidad" element={<Privacidad />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;