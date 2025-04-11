import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/Styles/AgregarProducto.css'; // Importa el archivo de estilos

const agregarProducto = () => {
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
        <div className="ap-container">
            <h1 className="ap-title">Añadir Nuevo Producto</h1>
            
            <div className="ap-card">
                <div className="ap-card-header">
                    <h2>Ingrese los detalles del producto</h2>
                </div>
                
                <div className="ap-card-body">
                    {error && (
                        <div className="ap-alert ap-alert-error">
                            <p>{error}</p>
                        </div>
                    )}
                    
                    {success && (
                        <div className="ap-alert ap-alert-success">
                            <p>Producto agregado exitosamente. Redirigiendo...</p>
                        </div>
                    )}
                    
                    <form onSubmit={handleSubmit} className="ap-form">
                        <div className="ap-form-group">
                            <label htmlFor="nombre">Nombre del Producto</label>
                            <input
                                type="text"
                                id="nombre"
                                name="nombre"
                                placeholder="Nombre del producto"
                                value={producto.nombre}
                                onChange={handleChange}
                            />
                        </div>
                        
                        <div className="ap-form-group">
                            <label htmlFor="categoria">Categoría</label>
                            <input
                                type="text"
                                id="categoria"
                                name="categoria"
                                placeholder="Categoría del producto"
                                value={producto.categoria}
                                onChange={handleChange}
                            />
                        </div>
                        
                        <div className="ap-form-row">
                            <div className="ap-form-group">
                                <label htmlFor="cantidad">Cantidad</label>
                                <input
                                    type="number"
                                    id="cantidad"
                                    name="cantidad"
                                    placeholder="Cantidad"
                                    value={producto.cantidad}
                                    onChange={handleChange}
                                />
                            </div>
                            
                            <div className="ap-form-group">
                                <label htmlFor="unidad">Unidad</label>
                                <input
                                    type="text"
                                    id="unidad"
                                    name="unidad"
                                    placeholder="kg, l, unidades, etc."
                                    value={producto.unidad}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        
                        <div className="ap-form-group">
                            <label htmlFor="precio">Precio</label>
                            <input
                                type="number"
                                id="precio"
                                name="precio"
                                step="0.01"
                                placeholder="Precio"
                                value={producto.precio}
                                onChange={handleChange}
                            />
                        </div>
                        
                        <div className="ap-button-row">
                            <button
                                type="button"
                                className="ap-button ap-button-cancel"
                                onClick={() => navigate('/inventario')}
                            >
                                Cancelar
                            </button>
                            
                            <button
                                type="submit"
                                className="ap-button ap-button-submit"
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

export default agregarProducto;
