import React from 'react';

const Conocenos = () => {
  const images = [
    '/src/assets/img/spot1.jpg',
    '/src/assets/img/spot2.jpg',
    '/src/assets/img/spot3.jpg',
    // Agrega más imágenes según lo necesites
  ];

  return (
    <div className="catalog-page">
      <h1>Conócenos</h1>
      <div className="image-gallery">
        {images.map((image, index) => (
          <div key={index} className="gallery-item">
            <img src={image} alt={`Spot ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Conocenos;
