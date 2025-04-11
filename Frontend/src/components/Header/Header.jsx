import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Menú escritorio sin clases responsive */}
          <div className="flex justify-between space-x-4 items-center">
            <Link to="/" className="text-gray-800 hover:text-blue-600 font-medium">Inicio</Link>
            <Link to="/inventario" className="text-gray-800 hover:text-blue-600 font-medium">Inventario</Link>
            <Link to="/Login" className="text-gray-800 hover:text-blue-600 font-medium">Login</Link>

            {/* Dropdown escritorio sin lógica de estado */}
            <div className="relative group">
              <div className="absolute hidden group-hover:block bg-white mt-2 shadow-lg border rounded-md w-48 z-10">
                <Link to="/agregar-producto" className="block px-4 py-2 hover:bg-gray-100">Añadir Producto</Link>
                <Link to="/editar-producto" className="block px-4 py-2 hover:bg-gray-100">Editar Producto</Link>
                <Link to="/eliminar-producto" className="block px-4 py-2 hover:bg-gray-100">Eliminar Producto</Link>
                <Link to="/contacto" className="text-gray-800 hover:text-blue-600 font-medium">Contacto</Link>
                <div className="border-t my-1" />

              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;


/*import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      {/* Imagen en la parte superior *}
      

      {/* Navegación }
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

          {/* Dropdown para gestión de inventario }
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
*/