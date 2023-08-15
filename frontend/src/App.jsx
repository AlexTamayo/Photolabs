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
        } = useApplicationData();

  const { 
          photos,
          topics,
          selectedPhoto,
          modalVisible,
          isFavPhotoExist,
          favStatus
        } = state;

  return (
    <div className="App">
      < HomeRoute
            photoObjs={photos}
            favStatus={favStatus}
            toggleFavSelect={toggleFavSelect}
            openModal={openModal}
            topicObjs={topics}
            isFavPhotoExist={isFavPhotoExist}
            getPhotosByTopic={getPhotosByTopic}
      />
      {modalVisible && (< PhotoDetailsModal
                              selectedPhoto={selectedPhoto}
                              photoObjs={photos}
                              favStatus={favStatus}
                              selectedValue={favStatus[selectedPhoto.id]}
                              toggleFavSelect={() => toggleFavSelect(selectedPhoto.id)}
                              openModal={openModal}
                              closeModal={closeModal}
                        />)}
    </div>
  );
};

export default App;
