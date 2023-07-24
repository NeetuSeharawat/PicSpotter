
import React from 'react';
import ImagePopup from './ImagePopup';

const ImageCard = ({ image }) => {
  const [isPopupOpen, setPopupOpen] = React.useState(false);

  const togglePopup = () => {
    setPopupOpen(!isPopupOpen);
  };

  return (
    <div className="image-card" onClick={togglePopup}>
      <img src={image.url} alt={image.alt} />
      {isPopupOpen && <ImagePopup image={image} onClose={togglePopup} />}
    </div>
  );
};

export default ImageCard;
