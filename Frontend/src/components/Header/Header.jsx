import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/Styles/Header.css'; // Asumiendo que crearás un archivo CSS separado
import logo from '../../../public/inventario.png'; // Asegúrate de tener la ruta correcta a tu logo

const Header = () => {
  return (
    <header className="header">
      <nav className="nav-container">
        <div className="nav-content">
          {/* Logo al lado izquierdo */}
          <div className="logo-container">
            <Link to="/Principal" className="logo-link">
              <img src={logo} alt="Logo" className="logo-image" />
            </Link>
          </div>

          {/* Menú escritorio */}
          <div className="menu-container">
            <Link to="/Principal" className="menu-link">INICIO</Link>

            {/* Dropdown integrado con Inventario */}
            <div className="dropdown-container">
              <Link to="/inventario" className="menu-link dropdown-trigger">INVENTARIO</Link>
              <div className="dropdown-menu">
                <Link to="/agregar-producto" className="dropdown-item">AÑADIR PRODUCTO</Link>
                <Link to="/editar-producto" className="dropdown-item">EDITAR PRODUCTO</Link>
                <Link to="/eliminar-producto" className="dropdown-item">ELIMINAR PRODCUTO</Link>
              </div>
            </div>

          </div>
          <Link to="/contacto" className="menu-link">CONTACTANOS</Link>
          <Link to="/Login" className="menu-link">LOGIN</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;