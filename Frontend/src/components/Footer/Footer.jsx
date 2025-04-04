import React from 'react';



const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__content">
        <p>&copy; {new Date().getFullYear()} Reservas Smart. Todos los derechos reservados.</p>
        <ul className="footer__links">
          <li><a href="/terminos">Términos y Condiciones</a></li>
          <li><a href="/privacidad">Política de Privacidad</a></li>
          <li><a href="/contacto">Contacto</a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
