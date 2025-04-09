import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const EliminarProducto = () => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [success, setSuccess] = useState(null);
    const [deleting, setDeleting] = useState(false);
    
    const navigate = useNavigate();

    // Cargar productos al inicio
    useEffect(() => {
        fetchProductos();
    }, []);

    // Función para obtener todos los productos
    const fetchProductos = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:8085/api/productos');
            if (!response.ok) {
                throw new Error('Error al cargar productos');
            }
            const data = await response.json();
            setProductos(data);
            setError(null);
        } catch (err) {
            console.error('Error:', err);
            setError('Error al cargar el inventario');
        } finally {
            setLoading(false);
        }
    };

    // Función para eliminar un producto
    const handleDelete = async (productoId, productoNombre) => {
        if (!window.confirm(`¿Está seguro de que desea eliminar el producto "${productoNombre}"?`)) {
            return;
        }

        try {
            setDeleting(true);
            const response = await fetch(`http://localhost:8085/api/productos/${productoId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Error al eliminar el producto');
            }

            // Actualizar la lista de productos
            setProductos(productos.filter(producto => producto.id !== productoId));
            setSuccess(`Producto "${productoNombre}" eliminado exitosamente`);
            
            // Limpiar el mensaje de éxito después de 3 segundos
            setTimeout(() => {
                setSuccess(null);
            }, 3000);
            
        } catch (error) {
            console.error('Error:', error);
            setError(`Error al eliminar el producto: ${error.message}`);
        } finally {
            setDeleting(false);
        }
    };

    // Filtrar productos para la búsqueda
    const filteredProductos = productos.filter(producto => 
        producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        producto.categoria.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold text-center mb-8">Eliminar Productos</h1>
            
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="bg-red-600 text-white p-4">
                    <h2 className="text-xl font-semibold">
                        Seleccione un producto para eliminar
                    </h2>
                </div>
                
                <div className="p-4">
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                            <p>{error}</p>
                        </div>
                    )}
                    
                    {success && (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                            <p>{success}</p>
                        </div>
                    )}
                    
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Buscar productos..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    
                    <div className="flex justify-end mb-4">
                        <button
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                            onClick={() => navigate('/inventario')}
                        >
                            Volver al Inventario
                        </button>
                    </div>
                    
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Nombre</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Categoría</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Cantidad</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Unidad</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Precio</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Acción</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {loading ? (
                                    <tr>
                                        <td colSpan="6" className="px-4 py-2 text-center">Cargando productos...</td>
                                    </tr>
                                ) : filteredProductos.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="px-4 py-2 text-center">No se encontraron productos</td>
                                    </tr>
                                ) : (
                                    filteredProductos.map((producto) => (
                                        <tr key={producto.id} className="hover:bg-gray-50">
                                            <td className="px-4 py-2 text-sm">{producto.nombre}</td>
                                            <td className="px-4 py-2 text-sm">{producto.categoria}</td>
                                            <td className="px-4 py-2 text-sm">{producto.cantidad}</td>
                                            <td className="px-4 py-2 text-sm">{producto.unidad}</td>
                                            <td className="px-4 py-2 text-sm">${producto.precio}</td>
                                            <td className="px-4 py-2">
                                                <button
                                                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                                                    onClick={() => handleDelete(producto.id, producto.nombre)}
                                                    disabled={deleting}
                                                >
                                                    {deleting ? 'Eliminando...' : 'Eliminar'}
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EliminarProducto;