import { Routes, Route } from "react-router-dom"
import Home from '../Pages/Principal'
import Reservas from "../Pages/Reservas"
import Conocenos from "../Pages/Conocenos"
import Contacto from "../Pages/Contacto"
import Terminos from "../Pages/Terminos"
import Privacidad from "../Pages/Privacidad"
import Login from "../Pages/Login"
import Registro from "../Pages/Registro"
import RecuperarContraseña from "../Pages/RecuperarContraseña"
import Layout from "../Layout/Layout"
import Principal from "../Pages/Principal"

const Routers = () => {
  return (

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/recuperar-contraseña" element={<RecuperarContraseña />} /> 
        <Route path="/reservas" element={<Reservas />} />
        <Route path="/conocenos" element={<Conocenos/>} />
        <Route path="/contacto" element={<Contacto/>} />
        <Route path="/terminos" element={<Terminos/>} />
        <Route path="/privacidad" element={<Privacidad/>} />
      </Routes>
    
  )
}

export default Routers
