import React from 'react';
import FavIcon from '../components/FavIcon';
import PhotoList from '../components/PhotoList';


import '../styles/PhotoDetailsModal.scss'
import "../styles/PhotoFavButton.scss";
import closeSymbol from '../assets/closeSymbol.svg';

const PhotoDetailsModal = (props) => {

  const {
          selectedPhoto,
          photoObjs,
          favStatus,
          toggleFavSelect,
          openModal,
          selectedValue,
          closeModal
        } = props;

  return (
    <div className="photo-details-modal">

      <button onClick={closeModal} className="photo-details-modal__close-button">
        <img src={closeSymbol} alt="close symbol" />
      </button>

      <div className='photo-details-modal__image'>
        <div className="photo-details-modal__fav-icon" >
          < FavIcon
              selected={selectedValue}
              toggleFavSelect={toggleFavSelect}
          />
        </div>

        <img src={selectedPhoto.urls.full} alt="" />

      </div>

      <div className="photo-details-modal__user-details">

        <img className="photo-details-modal__user-profile" src={selectedPhoto.user.profile} />

        <div className="photo-details-modal__user-info">
          <p className="photo-details-modal__user-username">{selectedPhoto.user.name}</p>
          <p className="photo-details-modal__user-location">{selectedPhoto.location.city}, {selectedPhoto.location.country}</p>
        </div>

      </div>

      <hr />

      <div className='photo-details-modal__header'>
        <span>Related Photos</span>
      </div>

      <div className='photo-details-modal__images'>
        < PhotoList
            photoObjs={photoObjs}
            favStatus={favStatus}
            toggleFavSelect={toggleFavSelect}
            openModal={openModal}
        />
      </div>
      
    </div>
  )
};

export default PhotoDetailsModal;
