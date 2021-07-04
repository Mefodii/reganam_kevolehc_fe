import {
  GET_ANIME,
  ADD_ANIME,
  DELETE_ANIME,
  ADD_ANIME_POSTER,
  DELETE_ANIME_POSTER,
} from "../actions/types.js";

import { replace } from "../util/immutable";

const initialState = {
  anime: [],
};

const addPoster = (state, poster) => {
  const animes = state.anime;
  const videoIndex = animes.findIndex((video) => poster.video === video.id);
  const anime = {
    ...animes[videoIndex],
    images: [...animes[videoIndex].images, poster],
  };

  return {
    ...state,
    anime: replace(animes, anime, videoIndex),
  };
};

const deletePoster = (state, { videoId, posterId }) => {
  const animes = state.anime;
  const videoIndex = animes.findIndex((video) => videoId === video.id);
  const anime = {
    ...animes[videoIndex],
    images: animes[videoIndex].images.filter((image) => image.id !== posterId),
  };

  return {
    ...state,
    anime: replace(animes, anime, videoIndex),
  };
};

const reducer = (state = initialState, action) => {
  const payload = action.payload;
  switch (action.type) {
    case GET_ANIME:
      return {
        ...state,
        anime: payload,
      };
    case ADD_ANIME:
      return {
        ...state,
        anime: [...state.anime, payload],
      };
    case DELETE_ANIME:
      return {
        ...state,
        anime: state.anime.filter(({ id }) => id !== payload),
      };
    case ADD_ANIME_POSTER:
      return addPoster(state, payload);
    case DELETE_ANIME_POSTER:
      return deletePoster(state, payload);
    default:
      return state;
  }
};

export default reducer;
