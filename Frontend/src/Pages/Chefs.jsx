import React, { useState, useEffect } from 'react';

const Chefs = () => {
    const [chefs, setChefs] = useState([]);
    const [newChef, setNewChef] = useState({ nombre: '', especialidad: '', años_experiencia: '' });
    const [editingChef, setEditingChef] = useState(null); // Para manejar el chef que se está editando
    const [chefSearchTerm, setChefSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchChefs();
    }, []);

    // Función para obtener los chefs
    const fetchChefs = async () => {
        try {
            const response = await fetch('http://localhost:8085/api/chefs');
            const data = await response.json();
            setChefs(data);
            setLoading(false);
        } catch (err) {
            setError('Error al cargar los chefs');
            setLoading(false);
        }
    };

    // Función para agregar un chef
    const handleAddChef = async () => {
        try {
            // Validación básica
            if (!newChef.nombre || !newChef.especialidad || !newChef.años_experiencia) {
                alert('Por favor, complete todos los campos');
                return;
            }

            const response = await fetch('http://localhost:8085/api/chefs', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newChef),
            });

            if (response.ok) {
                const data = await response.json();
                setChefs([...chefs, data]);
                setNewChef({ nombre: '', especialidad: '', años_experiencia: '' }); // Limpiar el formulario
                alert('Chef agregado exitosamente');
            } else {
                alert('Error al agregar el chef');
            }
        } catch (error) {
            console.error('Error al agregar chef:', error);
            alert('Error al agregar el chef');
        }
    };

    // Función para iniciar la edición
    const startEditing = (chef) => {
        setEditingChef(chef);
        setNewChef({
            id: chef.id,
            nombre: chef.nombre,
            especialidad: chef.especialidad,
            años_experiencia: chef.años_experiencia
        });
    };

    // Función para cancelar la edición
    const cancelEditing = () => {
        setEditingChef(null);
        setNewChef({ nombre: '', especialidad: '', años_experiencia: '' });
    };

    // Función para actualizar un chef
    const handleChefEdit = async () => {
        try {
            // Validación básica
            if (!newChef.nombre || !newChef.especialidad || !newChef.años_experiencia) {
                alert('Por favor, complete todos los campos');
                return;
            }

            const response = await fetch(`http://localhost:8085/api/chefs/${editingChef.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newChef),
            });

            if (response.ok) {
                // Actualizar la lista de chefs
                setChefs(chefs.map(chef => 
                    chef.id === editingChef.id ? {...chef, ...newChef} : chef
                ));
                // Limpiar el formulario y estado de edición
                setNewChef({ nombre: '', especialidad: '', años_experiencia: '' });
                setEditingChef(null);
                alert('Chef actualizado exitosamente');
            } else {
                alert('Error al actualizar el chef');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al actualizar el chef');
        }
    };

    // Función para eliminar un chef
    const handleChefDelete = async (chefId) => {
        if (window.confirm('¿Está seguro de que desea eliminar este chef?')) {
            try {
                const response = await fetch(`http://localhost:8085/api/chefs/${chefId}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    setChefs(chefs.filter(chef => chef.id !== chefId));
                    alert('Chef eliminado exitosamente');
                } else {
                    alert('Error al eliminar el chef');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error al eliminar el chef');
            }
        }
    };

    const filteredChefs = chefs.filter((chef) =>
        chef.nombre.toLowerCase().includes(chefSearchTerm.toLowerCase())
    );

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="container mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold text-center mb-8">Gestión de Chefs</h1>
            
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="bg-red-600 text-white p-4">
                    <h2 className="text-xl font-semibold">
                        {editingChef ? 'Editar Chef' : 'Agregar Nuevo Chef'}
                    </h2>
                </div>
                <div className="p-4">
                    <input
                        type="text"
                        placeholder="Buscar chefs..."
                        className="px-4 py-2 border border-gray-300 rounded-md w-full mb-4"
                        onChange={(e) => setChefSearchTerm(e.target.value)}
                    />

                    {/* Formulario para agregar/editar chef */}
                    <div className="mb-4 space-y-2">
                        <input
                            type="text"
                            placeholder="Nombre"
                            className="px-4 py-2 border border-gray-300 rounded-md w-full"
                            value={newChef.nombre}
                            onChange={(e) => setNewChef({ ...newChef, nombre: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Especialidad"
                            className="px-4 py-2 border border-gray-300 rounded-md w-full"
                            value={newChef.especialidad}
                            onChange={(e) => setNewChef({ ...newChef, especialidad: e.target.value })}
                        />
                        <input
                            type="number"
                            placeholder="Años de experiencia"
                            className="px-4 py-2 border border-gray-300 rounded-md w-full"
                            value={newChef.años_experiencia}
                            onChange={(e) => setNewChef({ ...newChef, años_experiencia: e.target.value })}
                        />
                        <div className="flex justify-end gap-2">
                            {editingChef ? (
                                <>
                                    <button
                                        className="bg-blue-600 text-white px-4 py-2 rounded"
                                        onClick={handleChefEdit}
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
                                    onClick={handleAddChef}
                                >
                                    Agregar Chef
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Tabla de chefs */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Nombre</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Especialidad</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Experiencia</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredChefs.map((chef) => (
                                    <tr key={chef.id} className="hover:bg-gray-50">
                                        <td className="px-4 py-2 text-sm text-gray-900">{chef.nombre}</td>
                                        <td className="px-4 py-2 text-sm text-gray-900">{chef.especialidad}</td>
                                        <td className="px-4 py-2 text-sm text-gray-900">{chef.años_experiencia} años</td>
                                        <td className="px-4 py-2">
                                            <button
                                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mr-2"
                                                onClick={() => startEditing(chef)}
                                            >
                                                Editar
                                            </button>
                                            <button
                                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                                                onClick={() => handleChefDelete(chef.id)}
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

export default Chefs;