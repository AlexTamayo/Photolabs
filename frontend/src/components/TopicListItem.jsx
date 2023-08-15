import React from "react";

import "../styles/TopicListItem.scss";

const TopicListItem = (props) => {

  const { topicObjs } = props;

  return (
    <div className="topic-list__item" onClick={() => props.getPhotosByTopic(topicObjs.id)}>
      <span >{topicObjs.title}</span>
    </div>
  );
};

export default TopicListItem;
