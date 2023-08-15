import React, { useContext } from 'react';
import FavIcon from './FavIcon';
import ApplicationContext from '../hooks/ApplicationContext';

import '../styles/FavBadge.scss';

const FavBadge = ({ isFavPhotoExist }) => {

  const { getFavouritedPhotos } = useContext(ApplicationContext);

  return (
    <div className='fav-badge' onClick={() => getFavouritedPhotos()} >
      <FavIcon 
        displayAlert={!!isFavPhotoExist}
      />
    </div>
  ) 
};

export default FavBadge;