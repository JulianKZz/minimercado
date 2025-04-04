import React, { useState } from 'react';

const AvailabilityChecker = ({ date, time }) => {
  const [available, setAvailable] = useState(null);

  const checkAvailability = () => {
    if (date && time) {
      const isAvailable = Math.random() > 0.5; // Simulación del 50% de probabilidad de disponibilidad
      setAvailable(isAvailable);
    } else {
      alert('Por favor, selecciona una fecha y hora primero.');
    }
  };

  return (
    <div>
      <button onClick={checkAvailability}>Verificar disponibilidad</button>
      {available !== null && (
        <p>
          {available ? '¡Mesa disponible!' : 'No hay mesas disponibles para esta hora.'}
        </p>
      )}
    </div>
  );
};

export default AvailabilityChecker;
