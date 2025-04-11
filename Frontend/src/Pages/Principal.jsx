import React from 'react';
import { Link } from 'react-router-dom';

const Principal = () => {
  return (
    <div className="container mx-auto py-8 px-4 text-center">
      {/* Sección Superior */}
      <div className="bg-black rounded-lg shadow-lg p-6 flex flex-col md:flex-row items-center justify-center">
        <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
          <h1 className="text-3xl font-bold mb-4">
            Bienvenido a nuestro Sistema de Inventario
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Gestiona fácilmente el inventario de tu restaurante con nuestra plataforma intuitiva.
          </p>
        </div>
        <div className="md:w-1/3 flex justify-center">
          <Link to="/inventario">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300">
              Ver Inventario
            </button>
          </Link>
        </div>
      </div>
      
      {/* Sección de Tarjetas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 justify-items-center">
        {/* Tarjeta: Añadir Productos */}
        <div className="bg-blue-50 rounded-lg shadow-md p-6 border border-blue-100">
          <h2 className="text-xl font-semibold text-blue-800 mb-3">
            Añadir Productos
          </h2>
          <p className="text-gray-700 mb-4">
            Agrega nuevos productos a tu inventario.
          </p>
          <Link to="/agregar-producto">
            <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
              Añadir Producto
            </button>
          </Link>
        </div>
        
        {/* Tarjeta: Editar Productos */}
        <div className="bg-yellow-50 rounded-lg shadow-md p-6 border border-yellow-100">
          <h2 className="text-xl font-semibold text-yellow-800 mb-3">
            Editar Productos
          </h2>
          <p className="text-gray-700 mb-4">
            Modifica la información de productos existentes.
          </p>
          <Link to="/editar-producto">
            <button className="bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded">
              Editar Producto
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Principal;
