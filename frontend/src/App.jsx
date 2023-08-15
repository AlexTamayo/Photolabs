import React from 'react';
import HomeRoute from './routes/HomeRoute';
import PhotoDetailsModal from './routes/PhotoDetailsModal';

import './App.scss';

import useApplicationData from './hooks/useApplicationData';

const App = () => {

  const {
          state,
          openModal,
          closeModal,
          toggleFavSelect,
          getPhotosByTopic,
          reloadPhotos,
        } = useApplicationData();

  const { 
          photos,
          topics,
          selectedPhoto,
          modalVisible,
          isFavPhotoExist,
          favStatus,
          similarPhotos,
        } = state;

  return (
    <div className="App">
      < HomeRoute
            photoObjs={photos}
            favStatus={favStatus}
            topicObjs={topics}
            isFavPhotoExist={isFavPhotoExist}
            toggleFavSelect={toggleFavSelect}
            openModal={openModal}
            getPhotosByTopic={getPhotosByTopic}
            reloadPhotos={reloadPhotos}
      />
      {modalVisible && (
      < PhotoDetailsModal
          selectedPhoto={selectedPhoto}
          photoObjs={photos}
          favStatus={favStatus}
          selectedValue={favStatus[selectedPhoto.id]}
          similarPhotos={similarPhotos}
          toggleFavSelectMain={() => toggleFavSelect(selectedPhoto.id)}
          toggleFavSelect={toggleFavSelect}
          openModal={openModal}
          closeModal={closeModal}
      />)}
    </div>
  );
};

export default App;
