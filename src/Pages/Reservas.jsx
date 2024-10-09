import React, { useState } from 'react';
import ReservationForm from '../components/ReservationForm';
import AvailabilityChecker from '../components/AvailabilityChecker';

const Reservas = () => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [people, setPeople] = useState(1);
  const [duration, setDuration] = useState(1); // Nueva duración de la reserva
  const [reservedTimes, setReservedTimes] = useState([]); // Guardar horas reservadas
  const [confirmationMessage, setConfirmationMessage] = useState(''); // Mensaje de confirmación

  const handleReservationSubmit = (event) => {
    event.preventDefault();

    // Verificar si la hora ya está reservada
    if (reservedTimes.includes(time)) {
      alert('Esta hora ya está reservada. Por favor, selecciona otra hora.');
      return;
    }
    // Agregar la hora reservada a la lista de horas reservadas
    setReservedTimes([...reservedTimes, time]);

    // Mostrar mensaje de confirmación con la información de la reserva
    setConfirmationMessage(`
      ¡Felicitaciones, haz reservado una mesa en el mejor restaurante de la ciudad!
      Tu reserva es el ${date} a las ${time} para ${people} persona(s) por ${duration} hora(s).
    `);
    
  };

  return (
    <div className="reservation-page">
      <h1>Reservar una Mesa</h1>
      <form className="reservation-form" onSubmit={handleReservationSubmit}>
        <div className="form-group">
          <label htmlFor="date">Fecha:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="time">Hora:</label>
          <select
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          >
            <option value="">Selecciona la hora</option>
            <option value="16:00" disabled={reservedTimes.includes("16:00")}>4:00 PM</option>
            <option value="17:00" disabled={reservedTimes.includes("17:00")}>5:00 PM</option>
            <option value="18:00" disabled={reservedTimes.includes("18:00")}>6:00 PM</option>
            <option value="19:00" disabled={reservedTimes.includes("19:00")}>7:00 PM</option>
            <option value="20:00" disabled={reservedTimes.includes("20:00")}>8:00 PM</option>
            <option value="21:00" disabled={reservedTimes.includes("21:00")}>9:00 PM</option>
            <option value="22:00" disabled={reservedTimes.includes("22:00")}>10:00 PM</option>
            <option value="23:00" disabled={reservedTimes.includes("23:00")}>11:00 PM</option>
            <option value="00:00" disabled={reservedTimes.includes("00:00")}>12:00 AM</option>
            <option value="01:00" disabled={reservedTimes.includes("01:00")}>1:00 AM</option>
            <option value="02:00" disabled={reservedTimes.includes("02:00")}>2:00 AM</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="people">Número de personas:</label>
          <input
            type="number"
            id="people"
            value={people}
            onChange={(e) => setPeople(e.target.value)}
            min="1"
            max="10"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="duration">Duración de la reserva:</label>
          <select
            id="duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
          >
            <option value="1">1 hora</option>
            <option value="2">2 horas</option>
            <option value="3">3 horas</option>
          </select>
        </div>
        <button type="submit" className="btn-submit">Confirmar Reserva</button>
      </form>

      {/* Mostrar el mensaje de confirmación si existe */}
      {confirmationMessage && (
        <div className="confirmation-message">
          <p>{confirmationMessage}</p>
          <small>
            Te invitamos a revisar nuestras <a href="/privacidad">Políticas de Privacidad</a> y
            <a href="/terminos"> Términos y Condiciones</a>.
          </small>
        </div>
      )}
    </div>
  );
};

export default Reservas;