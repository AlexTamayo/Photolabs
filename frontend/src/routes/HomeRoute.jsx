import React, { useState } from 'react';
import TopNavigationBar from '../components/TopNavigationBar';
import PhotoList from '../components/PhotoList';

import "../styles/HomeRoute.scss";

function HomeRoute(props) {

  const { topicObjs, photoObjs } = props;

  const [isFavPhotoExist, setIsFavPhotoExist] = useState(0);
  
  const initialFavStatus = photoObjs.reduce((acc, photo) => {
    acc[photo.id] = 0;
    return acc;
  }, {})
  
  const [favStatus, setFavStatus] = useState(initialFavStatus);

  const toggleFavSelect = (id) => {
    setFavStatus(prevStatus => {
      const newStatus = {...prevStatus, [id]: prevStatus[id] ? 0 : 1};
      const isFavExist = Object.values(newStatus).some(status => status === 1);
      setIsFavPhotoExist(isFavExist ? 1 : 0);
      return newStatus;
    });
  };

  return (
    <div className='home-route'>
      < TopNavigationBar
          topicObjs={topicObjs}
          isFavPhotoExist={isFavPhotoExist}
      />
      < PhotoList
          photoObjs={photoObjs}
          favStatus={favStatus}
          toggleFavSelect={toggleFavSelect}
      />
    </div>
  );
}

export default HomeRoute;