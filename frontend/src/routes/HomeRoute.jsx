import React, { useState } from 'react';
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
          getPhotosByTopic
        } = props;

  return (
    <div className='home-route'>
      < TopNavigationBar
          topicObjs={topicObjs}
          isFavPhotoExist={isFavPhotoExist}
          getPhotosByTopic={getPhotosByTopic}
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