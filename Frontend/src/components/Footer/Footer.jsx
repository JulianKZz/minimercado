import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-4">Sistema de Inventario</h3>
            <p className="text-gray-400">
              Gestiona eficientemente el inventario de tu restaurante
            </p>
          </div>
          
          <div className="mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-3">Enlaces rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/inventario" className="text-gray-400 hover:text-white">
                  Inventario
                </Link>
              </li>
              <li>
                <Link to="/gestion-inventario" className="text-gray-400 hover:text-white">
                  Gestión de Inventario
                </Link>
              </li>
              <li>
                <Link to="/chefs" className="text-gray-400 hover:text-white">
                  Chefs
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-3">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/terminos" className="text-gray-400 hover:text-white">
                  Términos y condiciones
                </Link>
              </li>
              <li>
                <Link to="/privacidad" className="text-gray-400 hover:text-white">
                  Política de privacidad
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Sistema de Inventario. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;