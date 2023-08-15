import React from "react";
import TopicListItem from './TopicListItem';
import FavBadge from './FavBadge';

import "../styles/TopicList.scss";


const TopicList = (props) => {

  const {
          topicObjs,
          isFavPhotoExist,
          getPhotosByTopic
        } = props;


  const topicListItemArr = [
    topicObjs
    .map( topic => {
      return < TopicListItem
                  key={topic.id}
                  topicObjs={topic}
                  getPhotosByTopic={getPhotosByTopic}
              />
    })
  ];

  return (
    <div className="top-nav-bar__topic-list">
      {topicListItemArr}
      <div className="topic-list__item">
        < FavBadge isFavPhotoExist={isFavPhotoExist}/>
      </div>
    </div>
  );
};

export default TopicList;
