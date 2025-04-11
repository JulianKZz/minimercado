import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/Styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-row">

          <div className="footer-logo">
            <h3>Sistema de Inventario</h3>
            <span className="footer-description">
             GESTIONA EFICIENTEMENTE LOS RECURSOS DE TU MINIMERCADO
            </span>
          </div>

          <div className="footer-links">
            <span className="footer-section-title">Enlaces:</span>
            <ul>
              <li><Link to="/Principal">Inicio</Link></li>
              <li><Link to="/inventario">Inventario</Link></li>
              <li><Link to="/gestion-inventario">Gestión</Link></li>
            </ul>
          </div>

          <div className="footer-legal">
            <span className="footer-section-title">Legal:</span>
            <ul>
              <li><Link to="/terminos">Términos</Link></li>
              <li><Link to="/privacidad">Privacidad</Link></li>
            </ul>
          </div>

          <div className="footer-copy">
            <p>&copy; {new Date().getFullYear()} Sistema de Inventario</p>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
