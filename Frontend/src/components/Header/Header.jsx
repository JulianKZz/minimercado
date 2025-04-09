import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      {/* Imagen en la parte superior */}
      <div className="flex justify-center py-4 bg-gray-100">
        <img 
          src="/src/assets/IMG/Restaurante.png" 
          alt="Imagen de Encabezado" 
          className="h-24 object-contain"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://via.placeholder.com/300x100?text=Restaurante";
          }}
        />
      </div>

      {/* Navegación */}
      <nav className="flex justify-center py-4 bg-white">
        <div className="flex space-x-4">
          <Link to="/">
            <button className="px-4 py-2 rounded-md hover:bg-gray-100 text-gray-800 font-medium">
              Inicio
            </button>
          </Link>
          
          <Link to="/inventario">
            <button className="px-4 py-2 rounded-md hover:bg-gray-100 text-gray-800 font-medium">
              Inventario
            </button>
          </Link>
          
          {/* Dropdown para gestión de inventario */}
          <div className="relative group">
            <button className="px-4 py-2 rounded-md hover:bg-gray-100 text-gray-800 font-medium">
              Gestión de Inventario ▼
            </button>
            <div className="absolute left-0 mt-2 w-48 hidden group-hover:block bg-white border rounded-md shadow-lg z-10">
              <Link to="/agregar-producto">
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-800">
                  Añadir Producto
                </button>
              </Link>
              <Link to="/editar-producto">
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-800">
                  Editar Producto
                </button>
              </Link>
              <Link to="/eliminar-producto">
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-800">
                  Eliminar Producto
                </button>
              </Link>
              <div className="border-t border-gray-200 my-1"></div>
              <Link to="/chefs">
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-800">
                  Chefs
                </button>
              </Link>
            </div>
          </div>
          
          <Link to="/contacto">
            <button className="px-4 py-2 rounded-md hover:bg-gray-100 text-gray-800 font-medium">
              Contacto
            </button>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;