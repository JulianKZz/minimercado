import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/Styles/Principal.css'; // Asumiendo que crearás un archivo CSS separado

const Principal = () => {
  return (
    <div className="principal-container">
      {/* SECCIÓN SUPERIOR (HERO) */}
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Bienvenido a nuestro Sistema de Inventario
          </h1>
          <p className="hero-description">
            Gestiona fácilmente el inventario de tu MINIMERCADO con nuestra plataforma intuitiva y moderna.
          </p>
        </div>
        <div className="hero-action">
          <Link to="/inventario">
            <button className="btn-primary">
              Ver Inventario
            </button>
          </Link>
        </div>
      </div>

      {/* SECCIÓN DE TARJETAS */}
      <div className="cards-grid">
        
        {/* Tarjeta: Añadir Productos */}
        <div className="card">
          <h2 className="card-title">
            Añadir Productos
          </h2>
          <p className="card-description">
            Agrega nuevos productos a tu inventario.
          </p>
          <Link to="/agregar-producto">
            <button className="btn-blue">
              Añadir Producto
            </button>
          </Link>
        </div>

        {/* Tarjeta: Editar Productos */}
        <div className="card">
          <h2 className="card-title">
            Editar Productos
          </h2>
          <p className="card-description">
            Modifica la información de productos existentes.
          </p>
          <Link to="/editar-producto">
            <button className="btn-yellow">
              Editar Producto
            </button>
          </Link>
        </div>

        {/* Tarjeta: Eliminar Productos */}
        <div className="card">
          <h2 className="card-title">
            Eliminar Prodcutos
          </h2>
          <p className="card-description">
            Elimina la información de productos existentes.
          </p>
          <Link to="/eliminar-producto">
            <button className="btn-red">
              Eliminar Prodcuto
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Principal;