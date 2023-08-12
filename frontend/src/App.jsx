import React from 'react';
import HomeRoute from './routes/HomeRoute';
import PhotoDetailsModal from './routes/PhotoDetailsModal';

import './App.scss';

import photos from './mocks/photos';
import topics from './mocks/topics';

const App = () => {

  return (
    <div className="App">
      < HomeRoute topicObjs={topics} photoObjs={photos}/>
      {/* < PhotoDetailsModal /> */}
    </div>
  );
};

export default App;
