import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AgregarProducto = () => {
    const [producto, setProducto] = useState({ 
        nombre: '', 
        categoria: '', 
        cantidad: '', 
        unidad: '',
        precio: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    
    const navigate = useNavigate();

    // Función para manejar cambios en los inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProducto(prevProducto => ({
            ...prevProducto,
            [name]: value
        }));
    };

    // Función para agregar un producto
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            // Validación básica
            if (!producto.nombre || !producto.categoria || !producto.cantidad || !producto.unidad || !producto.precio) {
                throw new Error('Por favor, complete todos los campos');
            }

            const response = await fetch('http://localhost:8085/api/productos', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(producto),
            });

            if (!response.ok) {
                throw new Error('Error al agregar el producto');
            }

            await response.json();
            setSuccess(true);
            setProducto({ nombre: '', categoria: '', cantidad: '', unidad: '', precio: '' });
            
            // Mostrar mensaje de éxito por 2 segundos y luego redirigir
            setTimeout(() => {
                navigate('/inventario');
            }, 2000);
            
        } catch (error) {
            console.error('Error:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold text-center mb-8">Añadir Nuevo Producto</h1>
            
            <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-2xl mx-auto">
                <div className="bg-green-600 text-white p-4">
                    <h2 className="text-xl font-semibold">
                        Ingrese los detalles del producto
                    </h2>
                </div>
                
                <div className="p-6">
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                            <p>{error}</p>
                        </div>
                    )}
                    
                    {success && (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                            <p>Producto agregado exitosamente. Redirigiendo...</p>
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
                                placeholder="Nombre del producto"
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
                                placeholder="Categoría del producto"
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
                                    placeholder="Cantidad"
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
                                    placeholder="kg, l, unidades, etc."
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
                                placeholder="Precio"
                                className="px-4 py-2 border border-gray-300 rounded-md w-full"
                                value={producto.precio}
                                onChange={handleChange}
                            />
                        </div>
                        
                        <div className="flex justify-end gap-4 mt-6">
                            <button
                                type="button"
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                                onClick={() => navigate('/inventario')}
                            >
                                Cancelar
                            </button>
                            
                            <button
                                type="submit"
                                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                                disabled={loading}
                            >
                                {loading ? 'Agregando...' : 'Agregar Producto'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AgregarProducto;