import { useReducer, useEffect } from 'react';
import axios from 'axios';

export const ACTIONS = {
  FAV_PHOTO_ADDED: 'FAV_PHOTO_ADDED',
  FAV_PHOTO_REMOVED: 'FAV_PHOTO_REMOVED',
  SELECT_PHOTO: 'SELECT_PHOTO',
  DISPLAY_PHOTO_DETAILS: 'DISPLAY_PHOTO_DETAILS',
  CLOSE_PHOTO_DETAILS: 'CLOSE_PHOTO_DETAILS',
  SET_PHOTO_DATA: 'SET_PHOTO_DATA',
  SET_FAV_STATUS: 'SET_FAV_STATUS',
  SET_TOPIC_DATA: 'SET_TOPIC_DATA',
  GET_PHOTOS_BY_TOPIC: 'GET_PHOTOS_BY_TOPIC',
};

const API = {
  GET_PHOTOS: "/api/photos",
  GET_TOPICS: "/api/topics",
  GET_PHOTOS_BY_TOPICS: "/api/topics/photos/"
}


function reducer(state, action) {
  switch (action.type) {

    case ACTIONS.FAV_PHOTO_ADDED:
      return {
        ...state,
        favStatus: {
          ...state.favStatus,
          [action.id]: 1
        },
        isFavPhotoExist: 1
      };

    case ACTIONS.FAV_PHOTO_REMOVED:
      const updateFavStatus = {
        ...state.favStatus,
        [action.id]: 0
      };
      const isFavExist = Object.values(updateFavStatus).some(status => status === 1);
      return {
        ...state,
        favStatus: updateFavStatus,
        isFavPhotoExist: isFavExist ? 1 : 0
      };

    case ACTIONS.DISPLAY_PHOTO_DETAILS:
      return {
        ...state,
        selectedPhoto: action.photo,
        modalVisible: true
      };

    case ACTIONS.CLOSE_PHOTO_DETAILS:
      return {
        ...state,
        selectedPhoto: null,
        modalVisible: false
      };

    case ACTIONS.SET_PHOTO_DATA:
      return {
        ...state,
        photos: action.photos
      };

    case ACTIONS.SET_FAV_STATUS:
      return {
        ...state,
        favStatus: action.favStatus
      };

    case ACTIONS.SET_TOPIC_DATA:
      return {
        ...state,
        topics: action.topics
      };

      case ACTIONS.GET_PHOTOS_BY_TOPIC:
      return {
        ...state,
        photos: action.photos,
      };
  
    default:
      throw new Error (
        `Tried to reduce with unsupported action type: ${action.type}`
      )
  }
}

export default function useApplication() {

  const [state, dispatch] = useReducer(reducer, {
    photos: [],
    topics: [],
    selectedPhoto: null,
    modalVisible: false,
    isFavPhotoExist: 0,
    favStatus: {}
  });

  useEffect(() => {
    const photosPromise = axios.get(API.GET_PHOTOS);
    const topicsPromise = axios.get(API.GET_TOPICS);

    const promises = [photosPromise, topicsPromise];

    Promise.all(promises)
      .then((arrayOfResponses) => {

        const photos = arrayOfResponses[0].data;
        const topics = arrayOfResponses[1].data;

        dispatch({ type: ACTIONS.SET_PHOTO_DATA, photos: photos});

        const initialFavStatus = photos.reduce((acc, photo) => {
          acc[photo.id] = 0;
          return acc;
        }, {});

        dispatch({ type: ACTIONS.SET_FAV_STATUS, favStatus: initialFavStatus});

        dispatch({ type: ACTIONS.SET_TOPIC_DATA, topics: topics});

      })
  }, [])


  const openModal = (photo) => {
    dispatch({ type: ACTIONS.DISPLAY_PHOTO_DETAILS, photo});
  };

  const closeModal = () => {
    dispatch({ type: ACTIONS.CLOSE_PHOTO_DETAILS })
  };

  const toggleFavSelect = (id) => {
    if (state.favStatus[id]) {
      dispatch({ type: ACTIONS.FAV_PHOTO_REMOVED, id });
    } else {
      dispatch({ type: ACTIONS.FAV_PHOTO_ADDED, id });
    }
  };

  const getPhotosByTopic = (topicId) => {
    axios.get(API.GET_PHOTOS_BY_TOPICS + topicId)
      .then((response) => {
        dispatch({ type: ACTIONS.GET_PHOTOS_BY_TOPIC, photos: response.data });
      });
  };

  return {
    state,
    openModal,
    closeModal,
    toggleFavSelect,
    getPhotosByTopic
  };
  
}