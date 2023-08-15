import React, { useState } from "react";
import FavIcon from './FavIcon';

import "../styles/PhotoListItem.scss";
import "../styles/PhotoFavButton.scss";

const PhotoListItem = (props) => {

  const { photoObjs, selectedValue, toggleFavSelect, openModal} = props;

  const [displayAlertValue, setDisplayAlertValue] = useState(0);

  return (
  <div key={photoObjs.id} id={photoObjs.id} className="photo-list__item">
    <div className="photo-list__fav-icon" >
      < FavIcon 
          displayAlert={displayAlertValue}
          selected={selectedValue}
          toggleFavSelect={toggleFavSelect}
      />
    </div>
    <img onClick={openModal} className="photo-list__image" src={photoObjs.urls.regular}  />
    <div className="photo-list__user-details">
      <img className="photo-list__user-profile" src={photoObjs.user.profile} />
      <div className="photo-list__user-info">
        <p className="photo-list__user-username">{photoObjs.user.name}</p>
        <p className="photo-list__user-location">{photoObjs.location.city}, {photoObjs.location.country}</p>
      </div>
    </div>
  </div>
  )
};

export default PhotoListItem;
