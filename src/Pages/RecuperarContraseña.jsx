import React, { useState } from 'react';

const RecuperarContraseña = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    
    console.log('Enviando correo de recuperación a:', email);
  };

  return (
    <div className="recover-page">
      <h1>Recuperar Contraseña</h1>
      <form className="recover-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Correo Electrónico:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn-submit">Recuperar</button>
      </form>
    </div>
  );
};

export default RecuperarContraseña;
