import { Routes, Route } from "react-router-dom";
import Home from '../Pages/Principal';
import Inventario from "../Pages/Inventario";
import Contacto from "../Pages/Contacto";
import Terminos from "../Pages/Terminos";
import Privacidad from "../Pages/Privacidad";
import Login from "../Pages/Login";
import Registro from "../Pages/Registro";
import RecuperarContraseña from "../Pages/RecuperarContraseña";
import Chefs from "../Pages/Chefs";
import Meseros from "../Pages/GestionInventario";
import MejoresClientes from "../Pages/MejoresClientes";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/recuperar-contraseña" element={<RecuperarContraseña />} />
      <Route path="/reservas" element={<Reservas />} />
      <Route path="/conocenos" element={<Conocenos />} />
      <Route path="/contacto" element={<Contacto />} />
      <Route path="/terminos" element={<Terminos />} />
      <Route path="/privacidad" element={<Privacidad />} />
      <Route path="/chefs" element={<Chefs />} />
      <Route path="/meseros" element={<Meseros />} />
      <Route path="/mejores-clientes" element={<MejoresClientes />} />
    </Routes>
  );
}

export default Routers;