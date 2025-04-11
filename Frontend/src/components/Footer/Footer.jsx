import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 w-full mt-auto">
      <div className="container mx-auto px-4">
        {/* Todo el contenido en una sola fila horizontal */}
        <div className="flex flex-wrap items-center justify-between">
          {/* Logo y descripción - más compacto */}
          <div className="w-auto mr-8">
            <h3 className="text-lg font-bold inline-block mr-3">Sistema de Inventario</h3>
            <span className="text-gray-300 text-sm hidden md:inline-block">
              Gestiona eficientemente el inventario de tu restaurante
            </span>
          </div>

          {/* Enlaces rápidos - en línea */}
          <div className="w-auto flex items-center">
            <span className="text-sm font-medium mr-2">Enlaces:</span>
            <ul className="flex">
              <li className="mr-4">
                <Link to="/inicio" className="text-gray-300 hover:text-white text-sm">
                  Inicio
                </Link>
              </li>
              <li className="mr-4">
                <Link to="/inventario" className="text-gray-300 hover:text-white text-sm">
                  Inventario
                </Link>
              </li>
              <li className="mr-4">
                <Link to="/gestion-inventario" className="text-gray-300 hover:text-white text-sm">
                  Gestión
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal - en línea */}
          <div className="w-auto flex items-center">
            <span className="text-sm font-medium mr-2">Legal:</span>
            <ul className="flex">
              <li className="mr-4">
                <Link to="/terminos" className="text-gray-300 hover:text-white text-sm">
                  Términos
                </Link>
              </li>
              <li>
                <Link to="/privacidad" className="text-gray-300 hover:text-white text-sm">
                  Privacidad
                </Link>
              </li>
            </ul>
          </div>

          {/* Copyright - integrado en la misma línea */}
          <div className="w-auto text-right">
            <p className="text-gray-300 text-xs">&copy; {new Date().getFullYear()} Sistema de Inventario</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;