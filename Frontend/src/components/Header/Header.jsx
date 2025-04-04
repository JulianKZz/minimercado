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
        <Link to="/reservas">
          <button className="header__button">Reservar una Mesa</button>
        </Link>
        <Link to="/conocenos">
          <button className="header__button">Conócenos</button>
        </Link>
        <Link to="/contacto">
          <button className="header__button">Contáctanos</button>
        </Link>
        
        {/* Dropdown o menú desplegable para el equipo */}
        <div className="relative group inline-block">
          <button className="header__button">
            Gestión de Personal ▼
          </button>
          <div className="absolute hidden group-hover:block bg-white border rounded-md shadow-lg mt-1">
            <Link to="/chefs">
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                Chefs
              </button>
            </Link>
            <Link to="/meseros">
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                Meseros
              </button>
            </Link>
            <Link to="/mejores-clientes">
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                Clientes
              </button>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;