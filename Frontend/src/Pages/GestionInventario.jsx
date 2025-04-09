import React, { useState, useEffect } from 'react';

const GestionInventario = () => {
    const [productos, setProductos] = useState([]);
    const [newProducto, setNewProducto] = useState({ 
        nombre: '', 
        categoria: '', 
        cantidad: '', 
        unidad: '',
        precio: ''
    });
    const [editingProducto, setEditingProducto] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProductos();
    }, []);

    // Función para obtener los productos
    const fetchProductos = async () => {
        try {
            const response = await fetch('http://localhost:8085/api/productos');
            const data = await response.json();
            setProductos(data);
            setLoading(false);
        } catch (err) {
            setError('Error al cargar el inventario');
            setLoading(false);
        }
    };

    // Función para agregar un producto
    const handleAddProducto = async () => {
        try {
            // Validación básica
            if (!newProducto.nombre || !newProducto.categoria || !newProducto.cantidad || !newProducto.unidad || !newProducto.precio) {
                alert('Por favor, complete todos los campos');
                return;
            }

            const response = await fetch('http://localhost:8085/api/productos', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newProducto),
            });

            if (response.ok) {
                const data = await response.json();
                setProductos([...productos, data]);
                setNewProducto({ nombre: '', categoria: '', cantidad: '', unidad: '', precio: '' });
                alert('Producto agregado exitosamente');
            } else {
                alert('Error al agregar el producto');
            }
        } catch (error) {
            console.error('Error al agregar producto:', error);
            alert('Error al agregar el producto');
        }
    };

    // Función para iniciar la edición
    const startEditing = (producto) => {
        setEditingProducto(producto);
        setNewProducto({
            id: producto.id,
            nombre: producto.nombre,
            categoria: producto.categoria,
            cantidad: producto.cantidad,
            unidad: producto.unidad,
            precio: producto.precio
        });
    };

    // Función para cancelar la edición
    const cancelEditing = () => {
        setEditingProducto(null);
        setNewProducto({ nombre: '', categoria: '', cantidad: '', unidad: '', precio: '' });
    };

    // Función para actualizar un producto
    const handleProductoEdit = async () => {
        try {
            // Validación básica
            if (!newProducto.nombre || !newProducto.categoria || !newProducto.cantidad || !newProducto.unidad || !newProducto.precio) {
                alert('Por favor, complete todos los campos');
                return;
            }

            const response = await fetch(`http://localhost:8085/api/productos/${editingProducto.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProducto),
            });

            if (response.ok) {
                // Actualizar la lista de productos
                setProductos(productos.map(producto => 
                    producto.id === editingProducto.id ? {...producto, ...newProducto} : producto
                ));
                // Limpiar el formulario y estado de edición
                setNewProducto({ nombre: '', categoria: '', cantidad: '', unidad: '', precio: '' });
                setEditingProducto(null);
                alert('Producto actualizado exitosamente');
            } else {
                alert('Error al actualizar el producto');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al actualizar el producto');
        }
    };

    // Función para eliminar un producto
    const handleProductoDelete = async (productoId) => {
        if (window.confirm('¿Está seguro de que desea eliminar este producto?')) {
            try {
                const response = await fetch(`http://localhost:8085/api/productos/${productoId}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    setProductos(productos.filter(producto => producto.id !== productoId));
                    alert('Producto eliminado exitosamente');
                } else {
                    alert('Error al eliminar el producto');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error al eliminar el producto');
            }
        }
    };

    const filteredProductos = productos.filter((producto) =>
        producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        producto.categoria.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="container mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold text-center mb-8">Gestión de Inventario</h1>
            
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="bg-blue-600 text-white p-4">
                    <h2 className="text-xl font-semibold">
                        {editingProducto ? 'Editar Producto' : 'Agregar Nuevo Producto'}
                    </h2>
                </div>
                <div className="p-4">
                    <input
                        type="text"
                        placeholder="Buscar productos..."
                        className="px-4 py-2 border border-gray-300 rounded-md w-full mb-4"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    {/* Formulario para agregar/editar producto */}
                    <div className="mb-4 space-y-2">
                        <input
                            type="text"
                            placeholder="Nombre del producto"
                            className="px-4 py-2 border border-gray-300 rounded-md w-full"
                            value={newProducto.nombre}
                            onChange={(e) => setNewProducto({ ...newProducto, nombre: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Categoría"
                            className="px-4 py-2 border border-gray-300 rounded-md w-full"
                            value={newProducto.categoria}
                            onChange={(e) => setNewProducto({ ...newProducto, categoria: e.target.value })}
                        />
                        <div className="flex gap-2">
                            <input
                                type="number"
                                placeholder="Cantidad"
                                className="px-4 py-2 border border-gray-300 rounded-md w-full"
                                value={newProducto.cantidad}
                                onChange={(e) => setNewProducto({ ...newProducto, cantidad: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Unidad (kg, l, unidades)"
                                className="px-4 py-2 border border-gray-300 rounded-md w-full"
                                value={newProducto.unidad}
                                onChange={(e) => setNewProducto({ ...newProducto, unidad: e.target.value })}
                            />
                        </div>
                        <input
                            type="number"
                            step="0.01"
                            placeholder="Precio"
                            className="px-4 py-2 border border-gray-300 rounded-md w-full"
                            value={newProducto.precio}
                            onChange={(e) => setNewProducto({ ...newProducto, precio: e.target.value })}
                        />
                        <div className="flex justify-end gap-2">
                            {editingProducto ? (
                                <>
                                    <button
                                        className="bg-blue-600 text-white px-4 py-2 rounded"
                                        onClick={handleProductoEdit}
                                    >
                                        Guardar Cambios
                                    </button>
                                    <button
                                        className="bg-gray-600 text-white px-4 py-2 rounded"
                                        onClick={cancelEditing}
                                    >
                                        Cancelar
                                    </button>
                                </>
                            ) : (
                                <button
                                    className="bg-green-600 text-white px-4 py-2 rounded"
                                    onClick={handleAddProducto}
                                >
                                    Agregar Producto
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Tabla de productos */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Nombre</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Categoría</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Cantidad</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Unidad</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Precio</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredProductos.map((producto) => (
                                    <tr key={producto.id} className="hover:bg-gray-50">
                                        <td className="px-4 py-2 text-sm text-gray-900">{producto.nombre}</td>
                                        <td className="px-4 py-2 text-sm text-gray-900">{producto.categoria}</td>
                                        <td className="px-4 py-2 text-sm text-gray-900">{producto.cantidad}</td>
                                        <td className="px-4 py-2 text-sm text-gray-900">{producto.unidad}</td>
                                        <td className="px-4 py-2 text-sm text-gray-900">${producto.precio}</td>
                                        <td className="px-4 py-2">
                                            <button
                                                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded mr-2"
                                                onClick={() => startEditing(producto)}
                                            >
                                                Editar
                                            </button>
                                            <button
                                                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                                                onClick={() => handleProductoDelete(producto.id)}
                                            >
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GestionInventario;