import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/Styles/EditarProducto.css';

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

    useEffect(() => {
        fetchProductos();
    }, []);

    useEffect(() => {
        if (selectedProductId) {
            fetchProductoById(selectedProductId);
        } else {
            setProducto({ nombre: '', categoria: '', cantidad: '', unidad: '', precio: '' });
        }
    }, [selectedProductId]);

    const fetchProductos = async () => {
        try {
            const response = await fetch('http://localhost:8085/api/productos');
            if (!response.ok) throw new Error('Error al cargar productos');
            const data = await response.json();
            setProductos(data);
        } catch (err) {
            console.error('Error:', err);
            setError('Error al cargar el inventario');
        } finally {
            setLoading(false);
        }
    };

    const fetchProductoById = async (id) => {
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:8085/api/productos/${id}`);
            if (!response.ok) throw new Error('Error al cargar el producto');
            const data = await response.json();
            setProducto(data);
        } catch (err) {
            console.error('Error:', err);
            setError('Error al cargar el producto');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProducto(prevProducto => ({
            ...prevProducto,
            [name]: value
        }));
    };

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

            if (!response.ok) throw new Error('Error al actualizar el producto');
            await response.json();
            setSuccess(true);
            fetchProductos();

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

    const filteredProductos = productos.filter(prod =>
        prod.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prod.categoria.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="editar-container">
            <h1 className="editar-title">Editar Producto</h1>

            <div className="seleccion-container">
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Buscar productos..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="table-container">
                    <table className="editar-table">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Categoría</th>
                                <th>Cantidad</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan="4">Cargando productos...</td></tr>
                            ) : filteredProductos.length === 0 ? (
                                <tr><td colSpan="4">No se encontraron productos</td></tr>
                            ) : (
                                filteredProductos.map((prod) => (
                                    <tr key={prod.id} style={selectedProductId === prod.id ? { backgroundColor: "#e0f0ff" } : {}}>
                                        <td>{prod.nombre}</td>
                                        <td>{prod.categoria}</td>
                                        <td>{prod.cantidad} {prod.unidad}</td>
                                        <td>
                                            <button className="btn-save" onClick={() => setSelectedProductId(prod.id)}>Seleccionar</button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {selectedProductId && (
                <div className="form-container">
                    <div className="form-header">
                        <h2>Editar detalles del producto</h2>
                    </div>

                    {error && <div className="alert-error"><p>{error}</p></div>}
                    {success && <div className="alert-success"><p>Producto actualizado exitosamente. Redirigiendo...</p></div>}

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="nombre">Nombre del Producto</label>
                            <input type="text" id="nombre" name="nombre" value={producto.nombre} onChange={handleChange} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="categoria">Categoría</label>
                            <input type="text" id="categoria" name="categoria" value={producto.categoria} onChange={handleChange} />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="cantidad">Cantidad</label>
                                <input type="number" id="cantidad" name="cantidad" value={producto.cantidad} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="unidad">Unidad</label>
                                <input type="text" id="unidad" name="unidad" value={producto.unidad} onChange={handleChange} />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="precio">Precio</label>
                            <input type="number" step="0.01" id="precio" name="precio" value={producto.precio} onChange={handleChange} />
                        </div>

                        <div className="button-row">
                            <button
                                type="button"
                                className="btn-cancel"
                                onClick={() => {
                                    setSelectedProductId('');
                                    setProducto({ nombre: '', categoria: '', cantidad: '', unidad: '', precio: '' });
                                }}
                            >
                                Cancelar
                            </button>
                            <button type="submit" className="btn-save" disabled={submitting}>
                                {submitting ? 'Guardando...' : 'Guardar Cambios'}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default EditarProducto;
