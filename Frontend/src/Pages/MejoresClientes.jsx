import React, { useState, useEffect } from 'react';

const MejoresClientes = () => {
    const [customers, setCustomers] = useState([]);
    const [newCustomer, setNewCustomer] = useState({ nombre: '', total_compras: '', visitas: '' });
    const [editingCustomer, setEditingCustomer] = useState(null);
    const [customerSearchTerm, setCustomerSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCustomers();
    }, []);

    // Función para obtener los clientes
    const fetchCustomers = async () => {
        try {
            const response = await fetch('http://localhost:8085/api/best_customers');
            const data = await response.json();
            setCustomers(data);
            setLoading(false);
        } catch (err) {
            setError('Error al cargar los clientes');
            setLoading(false);
        }
    };

    // Función para iniciar la edición
    const startEditing = (customer) => {
        setEditingCustomer(customer);
        setNewCustomer({
            id: customer.id,
            nombre: customer.nombre,
            total_compras: customer.total_compras,
            visitas: customer.visitas
        });
    };

    // Función para cancelar la edición
    const cancelEditing = () => {
        setEditingCustomer(null);
        setNewCustomer({ nombre: '', total_compras: '', visitas: '' });
    };

    // Función para actualizar un cliente
    const handleCustomerEdit = async () => {
        try {
            // Validación básica
            if (!newCustomer.nombre || !newCustomer.total_compras || !newCustomer.visitas) {
                alert('Por favor, complete todos los campos');
                return;
            }

            const response = await fetch(`http://localhost:8085/api/best_customers/${editingCustomer.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newCustomer),
            });

            if (response.ok) {
                setCustomers(customers.map(customer => 
                    customer.id === editingCustomer.id ? {...customer, ...newCustomer} : customer
                ));
                setNewCustomer({ nombre: '', total_compras: '', visitas: '' });
                setEditingCustomer(null);
                alert('Cliente actualizado exitosamente');
            } else {
                alert('Error al actualizar el cliente');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al actualizar el cliente');
        }
    };

    // Función para agregar un cliente
    const handleAddCustomer = async () => {
        try {
            // Validación básica
            if (!newCustomer.nombre || !newCustomer.total_compras || !newCustomer.visitas) {
                alert('Por favor, complete todos los campos');
                return;
            }

            const response = await fetch('http://localhost:8085/api/best_customers', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newCustomer),
            });

            if (response.ok) {
                const data = await response.json();
                setCustomers([...customers, data]);
                setNewCustomer({ nombre: '', total_compras: '', visitas: '' });
                alert('Cliente agregado exitosamente');
            } else {
                alert('Error al agregar el cliente');
            }
        } catch (error) {
            console.error('Error al agregar cliente:', error);
            alert('Error al agregar el cliente');
        }
    };

    // Función para eliminar un cliente
    const handleCustomerDelete = async (customerId) => {
        if (window.confirm('¿Está seguro de que desea eliminar este cliente?')) {
            try {
                const response = await fetch(`http://localhost:8085/api/best_customers/${customerId}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    setCustomers(customers.filter(customer => customer.id !== customerId));
                    alert('Cliente eliminado exitosamente');
                } else {
                    alert('Error al eliminar el cliente');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error al eliminar el cliente');
            }
        }
    };

    const filteredCustomers = customers.filter((customer) =>
        customer.nombre.toLowerCase().includes(customerSearchTerm.toLowerCase())
    );

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="container mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold text-center mb-8">Mejores Clientes</h1>
            
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="bg-green-600 text-white p-4">
                    <h2 className="text-xl font-semibold">
                        {editingCustomer ? 'Editar Cliente' : 'Agregar Nuevo Cliente'}
                    </h2>
                </div>
                <div className="p-4">
                    <input
                        type="text"
                        placeholder="Buscar clientes..."
                        className="px-4 py-2 border border-gray-300 rounded-md w-full mb-4"
                        onChange={(e) => setCustomerSearchTerm(e.target.value)}
                    />

                    {/* Formulario para agregar/editar cliente */}
                    <div className="mb-4 space-y-2">
                        <input
                            type="text"
                            placeholder="Nombre"
                            className="px-4 py-2 border border-gray-300 rounded-md w-full"
                            value={newCustomer.nombre}
                            onChange={(e) => setNewCustomer({ ...newCustomer, nombre: e.target.value })}
                        />
                        <input
                            type="number"
                            placeholder="Total Compras"
                            className="px-4 py-2 border border-gray-300 rounded-md w-full"
                            value={newCustomer.total_compras}
                            onChange={(e) => setNewCustomer({ ...newCustomer, total_compras: e.target.value })}
                        />
                        <input
                            type="number"
                            placeholder="Visitas"
                            className="px-4 py-2 border border-gray-300 rounded-md w-full"
                            value={newCustomer.visitas}
                            onChange={(e) => setNewCustomer({ ...newCustomer, visitas: e.target.value })}
                        />
                        <div className="flex justify-end gap-2">
                            {editingCustomer ? (
                                <>
                                    <button
                                        className="bg-blue-600 text-white px-4 py-2 rounded"
                                        onClick={handleCustomerEdit}
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
                                    onClick={handleAddCustomer}
                                >
                                    Agregar Cliente
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Tabla de clientes */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Nombre</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Total Compras</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Visitas</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredCustomers.map((customer) => (
                                    <tr key={customer.id} className="hover:bg-gray-50">
                                        <td className="px-4 py-2 text-sm text-gray-900">{customer.nombre}</td>
                                        <td className="px-4 py-2 text-sm text-gray-900">${customer.total_compras}</td>
                                        <td className="px-4 py-2 text-sm text-gray-900">{customer.visitas}</td>
                                        <td className="px-4 py-2">
                                            <button
                                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mr-2"
                                                onClick={() => startEditing(customer)}
                                            >
                                                Editar
                                            </button>
                                            <button
                                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                                                onClick={() => handleCustomerDelete(customer.id)}
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

export default MejoresClientes;