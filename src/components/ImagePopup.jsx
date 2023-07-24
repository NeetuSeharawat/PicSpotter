
import React from 'react';

const ImagePopup = ({ image, onClose }) => {
  return (
    <div className="image-popup">
      <div className="image-details">
        <h3>{image.title}</h3>
        <p>{image.description}</p>
        <a href={image.link} target="_blank" rel="noopener noreferrer">
          View Image
        </a>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ImagePopup;
