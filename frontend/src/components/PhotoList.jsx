import React from "react";
import PhotoListItem from './PhotoListItem';

import "../styles/PhotoList.scss";

const PhotoList = (props) => {

  const { photoObjs, favStatus, toggleFavSelect } = props;

  const photoListItemArr = [
    photoObjs
    .map( photo => {
      return < PhotoListItem
                  key={photo.id}
                  photoObjs={photo}
                  selectedValue={favStatus[photo.id]}
                  toggleFavSelect={() => toggleFavSelect(photo.id)}
              />
    })
  ];
  
  return (
    <ul className="photo-list">
      {photoListItemArr}
    </ul>
  );
};

export default PhotoList;
