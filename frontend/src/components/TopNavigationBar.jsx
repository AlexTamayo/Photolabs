import React from 'react';
import TopicList from './TopicList';

import '../styles/TopNavigationBar.scss'

const TopNavigation = (props) => {

  return (
    <div className="top-nav-bar">
      <span className="top-nav-bar__logo" onClick={props.reloadPhotos}>PhotoLabs</span>
      < TopicList {...props}/>
    </div>
  )
}

export default TopNavigation;