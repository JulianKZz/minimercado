import React from 'react';

const Terminos = () => {
  return (
    <div className="terms-page">
      <h1>Términos y Condiciones</h1>
      <p>
        Bienvenido a <strong>Reservas Smart</strong>. Al acceder a nuestro sitio web y realizar una reserva, 
        aceptas cumplir con los siguientes términos y condiciones. 
        Si no estás de acuerdo con alguno de estos términos, te recomendamos que no utilices nuestro servicio.
      </p>

      <h2>Promoción de Inauguración</h2>
      <p>
        Nuestro restaurante está en proceso de apertura y, para celebrarlo, ofrecemos un 
        <strong> 50% de descuento </strong> en todas las reservas realizadas durante nuestro primer mes de funcionamiento.
        Esta promoción es válida únicamente para las personas que realicen sus reservas a través de nuestro sistema en línea.
      </p>
      <p>
        El descuento se aplicará automáticamente en el total de tu factura al momento de realizar el pago en el restaurante.
      </p>

      <h2>Reservas</h2>
      <p>
        El restaurante <strong>funciona exclusivamente por reservas</strong>, lo que significa que no se admiten clientes sin una reserva previa.
        Te recomendamos realizar tu reserva con antelación para garantizar tu lugar, ya que contamos con un número limitado de mesas.
      </p>

      <h2>Política de Cancelación</h2>
      <p>
        Las cancelaciones deben hacerse con al menos <strong>24 horas de antelación</strong> para poder recibir un reembolso completo.
        Las cancelaciones realizadas con menos de 24 horas de antelación no serán reembolsadas.
      </p>

      <h2>Modificaciones en los Términos</h2>
      <p>
        Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento. 
        Las modificaciones serán efectivas una vez publicadas en esta página. Te recomendamos revisar esta página regularmente.
      </p>
    </div>
  );
};

export default Terminos;
