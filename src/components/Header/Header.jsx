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
      <div className="header__buttons">
       
        
        <Link to="/reservas">
          <button className="header__button">Reservar una Mesa</button>
        </Link>
        <Link to="/conocenos">
          <button className="header__button">Conócenos</button>
        </Link>
        <Link to="/contacto">
          <button className="header__button">Contáctanos</button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
