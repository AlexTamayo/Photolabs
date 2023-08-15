import React from 'react';
import TopNavigationBar from '../components/TopNavigationBar';
import PhotoList from '../components/PhotoList';

import "../styles/HomeRoute.scss";

function HomeRoute(props) {

  // Destructiong props
  const { 
          topicObjs,
          photoObjs,
          openModal,
          isFavPhotoExist,
          toggleFavSelect,
          favStatus,
          getPhotosByTopic,
          reloadPhotos,
        } = props;

  return (
    <div className='home-route'>
      < TopNavigationBar
          topicObjs={topicObjs}
          isFavPhotoExist={isFavPhotoExist}
          getPhotosByTopic={getPhotosByTopic}
          reloadPhotos={reloadPhotos}
      />
      < PhotoList
          photoObjs={photoObjs}
          favStatus={favStatus}
          toggleFavSelect={toggleFavSelect}
          openModal={openModal}
      />
    </div>
  );
}

export default HomeRoute;