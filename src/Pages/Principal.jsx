import React from 'react';
import { Link } from 'react-router-dom';

const Principal = () => {
  return (
    <div className="principal-page">
      <div className="left-content">
        <h1>Bienvenido a Reservas Smart</h1>
        <p>Haz tu reserva ahora y asegura tu mesa en nuestro restaurante.</p>
      </div>
      <div className="right-content">
        <Link to="/reservas">
          <button className="btn-reserva">Reservar una Mesa</button>
        </Link>
      </div>
    </div>
  );
};

export default Principal;
