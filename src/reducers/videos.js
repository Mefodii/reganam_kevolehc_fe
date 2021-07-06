import { ADD_POSTER, DELETE_POSTER } from "../actions/types.js";

const initialState = [];

const addPoster = (videos, { poster }) => {
  return videos.map((video) => {
    if (poster.video !== video.id) return video;

    return {
      ...video,
      images: [...video.images, poster],
    };
  });
};

const deletePoster = (videos, { videoId, posterId }) => {
  return videos.map((video) => {
    if (videoId !== video.id) return video;

    return {
      ...video,
      images: video.images.filter((image) => image.id !== posterId),
    };
  });
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_POSTER:
      return addPoster(state, payload);
    case DELETE_POSTER:
      return deletePoster(state, payload);
    default:
      return state;
  }
};

export default reducer;
