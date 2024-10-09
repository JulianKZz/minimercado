import React, { useState } from 'react';

const ReservationForm = ({ onSubmit }) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [people, setPeople] = useState(1);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Llama a la función de envío con los datos de la reserva
    onSubmit(date, time, people);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Fecha:</label>
        <input 
          type="date" 
          value={date} 
          onChange={(e) => setDate(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>Hora:</label>
        <input 
          type="time" 
          value={time} 
          onChange={(e) => setTime(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>Número de personas:</label>
        <input 
          type="number" 
          value={people} 
          onChange={(e) => setPeople(e.target.value)} 
          min="1" 
          required
        />
      </div>
      <button type="submit">Reservar</button>
    </form>
  );
};

export default ReservationForm;
