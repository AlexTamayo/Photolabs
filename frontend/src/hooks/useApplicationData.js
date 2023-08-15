import { useReducer, useEffect } from "react";
import axios from "axios";

// Action types
export const ACTIONS = {
  FAV_PHOTO_ADDED: "FAV_PHOTO_ADDED",
  FAV_PHOTO_REMOVED: "FAV_PHOTO_REMOVED",
  SELECT_PHOTO: "SELECT_PHOTO",
  DISPLAY_PHOTO_DETAILS: "DISPLAY_PHOTO_DETAILS",
  CLOSE_PHOTO_DETAILS: "CLOSE_PHOTO_DETAILS",
  SET_PHOTO_DATA: "SET_PHOTO_DATA",
  SET_FAV_STATUS: "SET_FAV_STATUS",
  SET_TOPIC_DATA: "SET_TOPIC_DATA",
  SET_SIMILAR_PHOTOS: "SET_SIMILAR_PHOTOS",
  REMOVE_SIMILAR_PHOTOS: "REMOVE_SIMILAR_PHOTOS",
};

// API endpoints
const API = {
  GET_PHOTOS: "/api/photos",
  GET_TOPICS: "/api/topics",
  GET_PHOTOS_BY_TOPICS: "/api/topics/photos/",
};

// Reducer function
function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.FAV_PHOTO_ADDED:
      return {
        ...state,
        favStatus: {
          ...state.favStatus,
          [action.id]: 1,
        },
        isFavPhotoExist: 1,
      };

    case ACTIONS.FAV_PHOTO_REMOVED:
      const updateFavStatus = {
        ...state.favStatus,
        [action.id]: 0,
      };
      const isFavExist = Object.values(updateFavStatus).some(
        (status) => status === 1
      );
      return {
        ...state,
        favStatus: updateFavStatus,
        isFavPhotoExist: isFavExist ? 1 : 0,
      };

    case ACTIONS.DISPLAY_PHOTO_DETAILS:
      return {
        ...state,
        selectedPhoto: action.photo,
        modalVisible: true,
      };

    case ACTIONS.CLOSE_PHOTO_DETAILS:
      return {
        ...state,
        selectedPhoto: null,
        modalVisible: false,
      };

    case ACTIONS.SET_PHOTO_DATA:
      return {
        ...state,
        photos: action.photos,
      };

    case ACTIONS.SET_SIMILAR_PHOTOS:
      return {
        ...state,
        similarPhotos: action.similarPhotos,
      };

    case ACTIONS.REMOVE_SIMILAR_PHOTOS:
      return {
        ...state,
        similarPhotos: [],
      };

    case ACTIONS.SET_FAV_STATUS:
      return {
        ...state,
        favStatus: action.favStatus,
      };

    case ACTIONS.SET_TOPIC_DATA:
      return {
        ...state,
        topics: action.topics,
      };

    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

/**
 * Custom hook for managing application data
 * @returns {Object} State and functions for managing application data
 */
export default function useApplication() {

  // Reducer initialization
  const [state, dispatch] = useReducer(reducer, {
    photos: [],
    topics: [],
    selectedPhoto: null,
    similarPhotos: [],
    modalVisible: false,
    isFavPhotoExist: 0,
    favStatus: {},
  });

  // Fetching initial data
  useEffect(() => {
    const photosPromise = axios.get(API.GET_PHOTOS);
    const topicsPromise = axios.get(API.GET_TOPICS);

    const promises = [photosPromise, topicsPromise];

    Promise.all(promises).then((arrayOfResponses) => {
      const photos = arrayOfResponses[0].data;
      const topics = arrayOfResponses[1].data;

      dispatch({ type: ACTIONS.SET_PHOTO_DATA, photos: photos });

      const initialFavStatus = photos.reduce((acc, photo) => {
        acc[photo.id] = 0;
        return acc;
      }, {});

      dispatch({ type: ACTIONS.SET_FAV_STATUS, favStatus: initialFavStatus });

      dispatch({ type: ACTIONS.SET_TOPIC_DATA, topics: topics });
    });
  }, []);

  // Function to open modal and fetch related data
  const openModal = (photo) => {
    dispatch({ type: ACTIONS.DISPLAY_PHOTO_DETAILS, photo });

    axios.get(API.GET_PHOTOS).then((response) => {
      const selectedPhotoIds = photo.similar_photos.map((photo) => photo.id);
      const filteredPhotoObjs = response.data.filter((photo) =>
        selectedPhotoIds.includes(photo.id)
      );
      dispatch({
        type: ACTIONS.SET_SIMILAR_PHOTOS,
        similarPhotos: filteredPhotoObjs,
      });
    });
  };

  // Function to close modal and reset related data
  const closeModal = () => {
    dispatch({ type: ACTIONS.CLOSE_PHOTO_DETAILS });

    dispatch({ type: ACTIONS.REMOVE_SIMILAR_PHOTOS });
  };

  // Function to toggle favourite status of a photo
  const toggleFavSelect = (id) => {
    if (state.favStatus[id]) {
      dispatch({ type: ACTIONS.FAV_PHOTO_REMOVED, id });
    } else {
      dispatch({ type: ACTIONS.FAV_PHOTO_ADDED, id });
    }
  };

  // Function to get photos by topic
  const getPhotosByTopic = (topicId) => {
    axios.get(API.GET_PHOTOS_BY_TOPICS + topicId).then((response) => {
      dispatch({ type: ACTIONS.SET_PHOTO_DATA, photos: response.data });
    });
  };

  // Function to reload photos
  const reloadPhotos = () => {
    axios.get(API.GET_PHOTOS).then((response) => {
      dispatch({ type: ACTIONS.SET_PHOTO_DATA, photos: response.data });
    });
  };

  // Function to return the favourited photos
  const getFavouritedPhotos = () => {

    axios.get(API.GET_PHOTOS).then((response) => {
      const favouritedPhotosIds = Object.keys(state.favStatus)
        .filter(id => state.favStatus[id] === 1)
        .map( id => parseInt(id));

      if(favouritedPhotosIds.length > 0) {
        const filteredPhotoObjs = response.data.filter(photo => favouritedPhotosIds.includes(photo.id));
  
        dispatch({ type: ACTIONS.SET_PHOTO_DATA, photos: filteredPhotoObjs });
      }

    });
  };

  // Return state and functions
  return {
    state,
    openModal,
    closeModal,
    toggleFavSelect,
    getPhotosByTopic,
    reloadPhotos,
    getFavouritedPhotos
  };
}
