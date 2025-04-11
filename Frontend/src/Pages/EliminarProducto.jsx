import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/Styles/EliminarProducto.css';

const EliminarProducto = () => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [success, setSuccess] = useState(null);
    const [deleting, setDeleting] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        fetchProductos();
    }, []);

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
            setError('Error al cargar el inventario');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (productoId, productoNombre) => {
        if (!window.confirm(`¿Está seguro de que desea eliminar el producto "${productoNombre}"?`)) return;
        try {
            setDeleting(true);
            const response = await fetch(`http://localhost:8085/api/productos/${productoId}`, { method: 'DELETE' });
            if (!response.ok) throw new Error('Error al eliminar el producto');
            setProductos(productos.filter(p => p.id !== productoId));
            setSuccess(`Producto "${productoNombre}" eliminado exitosamente`);
            setTimeout(() => setSuccess(null), 3000);
        } catch (error) {
            setError(`Error al eliminar el producto: ${error.message}`);
        } finally {
            setDeleting(false);
        }
    };

    const filteredProductos = productos.filter(p =>
        p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.categoria.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="eliminar-container">
            <h1 className="eliminar-title">Eliminar Productos</h1>

            <div className="eliminar-card">
                <div className="eliminar-header">
                    <h2>Seleccione un producto para eliminar</h2>
                </div>

                <div className="eliminar-body">
                    {error && <div className="mensaje-error">{error}</div>}
                    {success && <div className="mensaje-exito">{success}</div>}

                    <input
                        type="text"
                        placeholder="Buscar productos..."
                        className="eliminar-input"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    <button
                        className="eliminar-btn volver-btn"
                        onClick={() => navigate('/inventario')}
                    >
                        Volver al Inventario
                    </button>

                    <div className="table-container">
                        <table className="eliminar-table">
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Categoría</th>
                                    <th>Cantidad</th>
                                    <th>Unidad</th>
                                    <th>Precio</th>
                                    <th>Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr><td colSpan="6">Cargando productos...</td></tr>
                                ) : filteredProductos.length === 0 ? (
                                    <tr><td colSpan="6">No se encontraron productos</td></tr>
                                ) : (
                                    filteredProductos.map((producto) => (
                                        <tr key={producto.id}>
                                            <td>{producto.nombre}</td>
                                            <td>{producto.categoria}</td>
                                            <td>{producto.cantidad}</td>
                                            <td>{producto.unidad}</td>
                                            <td>${producto.precio}</td>
                                            <td>
                                                <button
                                                    className="eliminar-btn eliminar-btn-red"
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
