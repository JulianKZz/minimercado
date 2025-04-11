import ReservationForm from '../components/ReservationForm';
import AvailabilityChecker from '../components/AvailabilityChecker';
import React, { useEffect, useState } from 'react';
import '../assets/Styles/Inventario.css'; // Asegúrate de importar tu archivo de estilos

const Inventario = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch('http://localhost:8085/api/productos');
        const data = await response.json();
        setProductos(data);
        setLoading(false);
      } catch (err) {
        console.error('Error al cargar los productos:', err);
        setError('Error al cargar el inventario');
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  const filteredProductos = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="text-center">Cargando inventario...</div>;
  if (error) return <div className="text-center text-red-600">{error}</div>;

  return (
    <div className="inventario-container">
      <h2 className="inventario-title">Inventario del Restaurante</h2>
      
      {/* Barra de búsqueda */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      {/* Tabla de inventario */}
      <div className="table-container">
        <table className="inventario-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Cantidad</th>
              <th>Unidad</th>
              <th>Precio</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {filteredProductos.map((producto) => (
              <tr key={producto.id}>
                <td>{producto.nombre}</td>
                <td>{producto.categoria}</td>
                <td>{producto.cantidad}</td>
                <td>{producto.unidad}</td>
                <td>${producto.precio}</td>
                <td>
                  <span className={`status ${
                    producto.cantidad > 10
                      ? 'disponible'
                      : producto.cantidad > 0
                      ? 'bajo-stock'
                      : 'agotado'
                  }`}>
                    {producto.cantidad > 10 ? 'Disponible' : producto.cantidad > 0 ? 'Bajo stock' : 'Agotado'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Inventario;


/*import React, { useEffect, useState } from 'react';

const Inventario = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Obtener productos desde la API
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch('http://localhost:8085/api/productos');
        const data = await response.json();
        setProductos(data);
        setLoading(false);
      } catch (err) {
        console.error('Error al cargar los productos:', err);
        setError('Error al cargar el inventario');
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  // Filtrar productos según búsqueda
  const filteredProductos = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="text-center">Cargando inventario...</div>;
  if (error) return <div className="text-center text-red-600">{error}</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Inventario del Restaurante</h2>
      
      {/* Barra de búsqueda 
      <div className="mb-6">
        <input
          type="text"
          placeholder="Buscar productos..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      {/* Tabla de inventario 
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoría</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cantidad</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unidad</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredProductos.map((producto) => (
              <tr key={producto.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{producto.nombre}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{producto.categoria}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{producto.cantidad}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{producto.unidad}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${producto.precio}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    producto.cantidad > 10 ? 'bg-green-100 text-green-800' : producto.cantidad > 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {producto.cantidad > 10 ? 'Disponible' : producto.cantidad > 0 ? 'Bajo stock' : 'Agotado'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Inventario;*/