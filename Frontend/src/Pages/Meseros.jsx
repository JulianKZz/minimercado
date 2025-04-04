import React, { useState, useEffect } from 'react';

const Meseros = () => {
    const [waiters, setWaiters] = useState([]);
    const [newWaiter, setNewWaiter] = useState({ nombre: '', edad: '', experiencia: '' });
    const [editingWaiter, setEditingWaiter] = useState(null); // Para manejar el mesero que se está editando
    const [waiterSearchTerm, setWaiterSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchWaiters();
    }, []);

    // Función para obtener los meseros
    const fetchWaiters = async () => {
        try {
            const response = await fetch('http://localhost:8085/api/waiters');
            const data = await response.json();
            setWaiters(data);
            setLoading(false);
        } catch (err) {
            setError('Error al cargar los meseros');
            setLoading(false);
        }
    };

    // Función para iniciar la edición
    const startEditing = (waiter) => {
        setEditingWaiter(waiter);
        setNewWaiter({
            id: waiter.id,
            nombre: waiter.nombre,
            edad: waiter.edad,
            experiencia: waiter.experiencia
        });
    };

    // Función para cancelar la edición
    const cancelEditing = () => {
        setEditingWaiter(null);
        setNewWaiter({ nombre: '', edad: '', experiencia: '' });
    };

    // Función para actualizar un mesero
    const handleWaiterEdit = async () => {
        try {
            // Validación básica
            if (!newWaiter.nombre || !newWaiter.edad || !newWaiter.experiencia) {
                alert('Por favor, complete todos los campos');
                return;
            }

            const response = await fetch(`http://localhost:8085/api/waiters/${editingWaiter.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newWaiter),
            });

            if (response.ok) {
                setWaiters(waiters.map(waiter => 
                    waiter.id === editingWaiter.id ? {...waiter, ...newWaiter} : waiter
                ));
                setNewWaiter({ nombre: '', edad: '', experiencia: '' });
                setEditingWaiter(null);
                alert('Mesero actualizado exitosamente');
            } else {
                alert('Error al actualizar el mesero');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al actualizar el mesero');
        }
    };

    // Función para agregar un mesero
    const handleAddWaiter = async () => {
        try {
            // Validación básica
            if (!newWaiter.nombre || !newWaiter.edad || !newWaiter.experiencia) {
                alert('Por favor, complete todos los campos');
                return;
            }

            const response = await fetch('http://localhost:8085/api/waiters', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newWaiter),
            });
            if (response.ok) {
                const data = await response.json();
                setWaiters([...waiters, data]);
                setNewWaiter({ nombre: '', edad: '', experiencia: '' });
                alert('Mesero agregado exitosamente');
            } else {
                alert('Error al agregar el mesero');
            }
        } catch (error) {
            console.error('Error al agregar mesero:', error);
            alert('Error al agregar el mesero');
        }
    };

    // Función para eliminar un mesero
    const handleWaiterDelete = async (waiterId) => {
        if (window.confirm('¿Está seguro de que desea eliminar este mesero?')) {
            try {
                const response = await fetch(`http://localhost:8085/api/waiters/${waiterId}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    setWaiters(waiters.filter(waiter => waiter.id !== waiterId));
                    alert('Mesero eliminado exitosamente');
                } else {
                    alert('Error al eliminar el mesero');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error al eliminar el mesero');
            }
        }
    };

    const filteredWaiters = waiters.filter((waiter) =>
        waiter.nombre.toLowerCase().includes(waiterSearchTerm.toLowerCase())
    );

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="container mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold text-center mb-8">Gestión de Meseros</h1>
            
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="bg-blue-600 text-white p-4">
                    <h2 className="text-xl font-semibold">
                        {editingWaiter ? 'Editar Mesero' : 'Agregar Nuevo Mesero'}
                    </h2>
                </div>
                <div className="p-4">
                    <input
                        type="text"
                        placeholder="Buscar meseros..."
                        className="px-4 py-2 border border-gray-300 rounded-md w-full mb-4"
                        onChange={(e) => setWaiterSearchTerm(e.target.value)}
                    />

                    {/* Formulario para agregar/editar mesero */}
                    <div className="mb-4 space-y-2">
                        <input
                            type="text"
                            placeholder="Nombre"
                            className="px-4 py-2 border border-gray-300 rounded-md w-full"
                            value={newWaiter.nombre}
                            onChange={(e) => setNewWaiter({ ...newWaiter, nombre: e.target.value })}
                        />
                        <input
                            type="number"
                            placeholder="Edad"
                            className="px-4 py-2 border border-gray-300 rounded-md w-full"
                            value={newWaiter.edad}
                            onChange={(e) => setNewWaiter({ ...newWaiter, edad: e.target.value })}
                        />
                        <input
                            type="number"
                            placeholder="Años de experiencia"
                            className="px-4 py-2 border border-gray-300 rounded-md w-full"
                            value={newWaiter.experiencia}
                            onChange={(e) => setNewWaiter({ ...newWaiter, experiencia: e.target.value })}
                        />
                        <div className="flex justify-end gap-2">
                            {editingWaiter ? (
                                <>
                                    <button
                                        className="bg-blue-600 text-white px-4 py-2 rounded"
                                        onClick={handleWaiterEdit}
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
                                    onClick={handleAddWaiter}
                                >
                                    Agregar Mesero
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Tabla de meseros */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Nombre</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Edad</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Experiencia</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredWaiters.map((waiter) => (
                                    <tr key={waiter.id} className="hover:bg-gray-50">
                                        <td className="px-4 py-2 text-sm text-gray-900">{waiter.nombre}</td>
                                        <td className="px-4 py-2 text-sm text-gray-900">{waiter.edad} años</td>
                                        <td className="px-4 py-2 text-sm text-gray-900">{waiter.experiencia} años</td>
                                        <td className="px-4 py-2">
                                            <button
                                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mr-2"
                                                onClick={() => startEditing(waiter)}
                                            >
                                                Editar
                                            </button>
                                            <button
                                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                                                onClick={() => handleWaiterDelete(waiter.id)}
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

export default Meseros;