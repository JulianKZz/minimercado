import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      {/* Imagen en la parte superior */}
      <div className="header__image-container">
        <img src="/src/assets/IMG/Restaurante.png" alt="Imagen de Encabezado" className="header__image" />
      </div>

      {/* Botones en la parte inferior central */}
      <nav className="header__buttons">
        <Link to="/">
          <button className="header__button">Inicio</button>
        </Link>
        <Link to="/inventario">
          <button className="header__button">Inventario</button>
        </Link>
        
        {/* Dropdown para gestión de inventario */}
        <div className="relative group inline-block">
          <button className="header__button">
            Gestión de Inventario ▼
          </button>
          <div className="absolute hidden group-hover:block bg-white border rounded-md shadow-lg mt-1">
            <Link to="/agregar-producto">
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                Añadir Producto
              </button>
            </Link>
            <Link to="/editar-producto">
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                Editar Producto
              </button>
            </Link>
            <Link to="/eliminar-producto">
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                Eliminar Producto
              </button>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;