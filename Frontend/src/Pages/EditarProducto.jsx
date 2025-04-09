import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const EditarProducto = () => {
    const [productos, setProductos] = useState([]);
    const [selectedProductId, setSelectedProductId] = useState('');
    const [producto, setProducto] = useState({ 
        nombre: '', 
        categoria: '', 
        cantidad: '', 
        unidad: '',
        precio: ''
    });
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    
    const navigate = useNavigate();

    // Cargar productos al inicio
    useEffect(() => {
        fetchProductos();
    }, []);

    // Cargar un producto específico cuando se selecciona
    useEffect(() => {
        if (selectedProductId) {
            fetchProductoById(selectedProductId);
        } else {
            setProducto({ nombre: '', categoria: '', cantidad: '', unidad: '', precio: '' });
        }
    }, [selectedProductId]);

    // Función para obtener todos los productos
    const fetchProductos = async () => {
        try {
            const response = await fetch('http://localhost:8085/api/productos');
            if (!response.ok) {
                throw new Error('Error al cargar productos');
            }
            const data = await response.json();
            setProductos(data);
        } catch (err) {
            console.error('Error:', err);
            setError('Error al cargar el inventario');
        } finally {
            setLoading(false);
        }
    };

    // Función para obtener un producto por ID
    const fetchProductoById = async (id) => {
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:8085/api/productos/${id}`);
            if (!response.ok) {
                throw new Error('Error al cargar el producto');
            }
            const data = await response.json();
            setProducto(data);
        } catch (err) {
            console.error('Error:', err);
            setError('Error al cargar el producto');
        } finally {
            setLoading(false);
        }
    };

    // Función para manejar cambios en los inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProducto(prevProducto => ({
            ...prevProducto,
            [name]: value
        }));
    };

    // Función para actualizar un producto
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedProductId) {
            setError('Por favor, seleccione un producto para editar');
            return;
        }

        setSubmitting(true);
        setError(null);
        setSuccess(false);

        try {
            // Validación básica
            if (!producto.nombre || !producto.categoria || !producto.cantidad || !producto.unidad || !producto.precio) {
                throw new Error('Por favor, complete todos los campos');
            }

            const response = await fetch(`http://localhost:8085/api/productos/${selectedProductId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(producto),
            });

            if (!response.ok) {
                throw new Error('Error al actualizar el producto');
            }

            await response.json();
            setSuccess(true);
            
            // Actualizar la lista de productos
            fetchProductos();
            
            // Mostrar mensaje de éxito por 2 segundos y luego redirigir
            setTimeout(() => {
                navigate('/inventario');
            }, 2000);
            
        } catch (error) {
            console.error('Error:', error);
            setError(error.message);
        } finally {
            setSubmitting(false);
        }
    };

    // Filtrar productos para la búsqueda
    const filteredProductos = productos.filter(producto => 
        producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        producto.categoria.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold text-center mb-8">Editar Producto</h1>
            
            <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl mx-auto mb-8">
                <div className="bg-blue-600 text-white p-4">
                    <h2 className="text-xl font-semibold">
                        Seleccione un producto para editar
                    </h2>
                </div>
                
                <div className="p-4">
                    <input
                        type="text"
                        placeholder="Buscar productos..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Nombre</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Categoría</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Cantidad</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Acción</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {loading ? (
                                    <tr>
                                        <td colSpan="4" className="px-4 py-2 text-center">Cargando productos...</td>
                                    </tr>
                                ) : filteredProductos.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="px-4 py-2 text-center">No se encontraron productos</td>
                                    </tr>
                                ) : (
                                    filteredProductos.map((prod) => (
                                        <tr key={prod.id} className={`hover:bg-gray-50 ${selectedProductId === prod.id ? 'bg-blue-50' : ''}`}>
                                            <td className="px-4 py-2 text-sm">{prod.nombre}</td>
                                            <td className="px-4 py-2 text-sm">{prod.categoria}</td>
                                            <td className="px-4 py-2 text-sm">{prod.cantidad} {prod.unidad}</td>
                                            <td className="px-4 py-2">
                                                <button
                                                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                                                    onClick={() => setSelectedProductId(prod.id)}
                                                >
                                                    Seleccionar
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
            
            {selectedProductId && (
                <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-2xl mx-auto">
                    <div className="bg-blue-600 text-white p-4">
                        <h2 className="text-xl font-semibold">Editar detalles del producto</h2>
                    </div>
                    
                    <div className="p-6">
                        {error && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                                <p>{error}</p>
                            </div>
                        )}
                        
                        {success && (
                            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                                <p>Producto actualizado exitosamente. Redirigiendo...</p>
                            </div>
                        )}
                        
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                                    Nombre del Producto
                                </label>
                                <input
                                    type="text"
                                    id="nombre"
                                    name="nombre"
                                    className="px-4 py-2 border border-gray-300 rounded-md w-full"
                                    value={producto.nombre}
                                    onChange={handleChange}
                                />
                            </div>
                            
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="categoria">
                                    Categoría
                                </label>
                                <input
                                    type="text"
                                    id="categoria"
                                    name="categoria"
                                    className="px-4 py-2 border border-gray-300 rounded-md w-full"
                                    value={producto.categoria}
                                    onChange={handleChange}
                                />
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cantidad">
                                        Cantidad
                                    </label>
                                    <input
                                        type="number"
                                        id="cantidad"
                                        name="cantidad"
                                        className="px-4 py-2 border border-gray-300 rounded-md w-full"
                                        value={producto.cantidad}
                                        onChange={handleChange}
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="unidad">
                                        Unidad
                                    </label>
                                    <input
                                        type="text"
                                        id="unidad"
                                        name="unidad"
                                        className="px-4 py-2 border border-gray-300 rounded-md w-full"
                                        value={producto.unidad}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="precio">
                                    Precio
                                </label>
                                <input
                                    type="number"
                                    id="precio"
                                    name="precio"
                                    step="0.01"
                                    className="px-4 py-2 border border-gray-300 rounded-md w-full"
                                    value={producto.precio}
                                    onChange={handleChange}
                                />
                            </div>
                            
                            <div className="flex justify-end gap-4 mt-6">
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                                    onClick={() => {
                                        setSelectedProductId('');
                                        setProducto({ nombre: '', categoria: '', cantidad: '', unidad: '', precio: '' });
                                    }}
                                >
                                    Cancelar
                                </button>
                                
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                    disabled={submitting}
                                >
                                    {submitting ? 'Guardando...' : 'Guardar Cambios'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditarProducto;