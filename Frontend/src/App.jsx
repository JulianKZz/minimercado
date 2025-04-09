import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Layout/Layout';
import Login from './Pages/Login';
import Inventario from './Pages/Inventario';
import GestionInventario from './Pages/GestionInventario';
import Terminos from './Pages/Terminos';
import Privacidad from './Pages/Privacidad';
import Registro from './Pages/Registro';
import RecuperarContraseña from './Pages/RecuperarContraseña';
import Chefs from './Pages/Chefs';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/inventario" element={<Inventario />} />
            <Route path="/agregar-producto" element={<GestionInventario />} />
            <Route path="/editar-producto" element={<GestionInventario />} />
            <Route path="/eliminar-producto" element={<GestionInventario />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;