import {
  GET_VIDEOS,
  GET_MOVIES,
  GET_SERIALS,
  GET_ANIME,
  GET_WATCHIO_INFO,
  ADD_ANIME,
  ADD_MOVIE,
  ADD_SERIAL,
  DELETE_ANIME,
  DELETE_MOVIE,
  DELETE_SERIAL,
  ADD_ANIME_POSTER,
  DELETE_ANIME_POSTER,
  ADD_VIDEO,
  DELETE_VIDEO,
  ADD_POSTER,
  DELETE_POSTER,
} from "../actions/types.js";

const initialState = {
  videos: [],
  movies: [],
  serials: [],
  anime: [],
  info: {
    videoTypes: {},
    statusTypes: [],
    aliasSeparator: "",
  },
};

// const isAnime = (payload, state) =>
//   payload.type === state.info.videoTypes.anime;
// const isMovie = (payload, state) =>
//   payload.type === state.info.videoTypes.movie;
// const isSerial = (payload, state) =>
//   payload.type === state.info.videoTypes.serial;

// const refreshPosters = (state, type, payload) => {
//   return state;
// };

const newVideo = (payload) => ({
  ...payload,
  images: [],
  seasons: [],
  side_story: [],
});

const getVideos = (state, action) => {
  const type = action.type.secondary;
  const payload = action.payload;
  switch (type) {
    case GET_MOVIES:
      return {
        ...state,
        movies: payload,
      };
    case GET_SERIALS:
      return {
        ...state,
        serials: payload,
      };
    case GET_ANIME:
      return {
        ...state,
        anime: payload,
      };
    default:
      return state;
  }
};

const addVideo = (state, action) => {
  const type = action.type.secondary;
  const payload = action.payload;
  switch (type) {
    case ADD_ANIME:
      return {
        ...state,
        anime: [...state.anime, newVideo(payload)],
      };
    case ADD_MOVIE:
      return {
        ...state,
        movies: [...state.movies, newVideo(payload)],
      };
    case ADD_SERIAL:
      return {
        ...state,
        serials: [...state.serials, newVideo(payload)],
      };
    default:
      return state;
  }
};

const deleteVideo = (state, action) => {
  const type = action.type.secondary;
  const payload = action.payload;
  switch (type) {
    case DELETE_ANIME:
      return {
        ...state,
        anime: state.anime.filter((video) => video.id !== payload),
      };
    case DELETE_MOVIE:
      return {
        ...state,
        movies: state.movies.filter((video) => video.id !== payload),
      };
    case DELETE_SERIAL:
      return {
        ...state,
        serials: state.serials.filter((video) => video.id !== payload),
      };
    default:
      return state;
  }
};

const getInfo = (state, payload) => ({
  ...state,
  info: payload,
});

const addPoster = (state, action) => {
  const type = action.type.secondary;
  const payload = action.payload;
  switch (type) {
    case ADD_ANIME_POSTER: {
      const videoIndex = state.anime.findIndex(
        (video) => payload.video === video.id
      );
      const animes = state.anime;
      const anime = animes[videoIndex];
      return {
        ...state,
        anime: [
          ...animes.slice(0, videoIndex),
          {
            ...anime,
            images: [...anime.images, payload],
          },
          ...animes.slice(videoIndex + 1),
        ],
      };
    }
    default:
      return state;
  }
};

const deletePoster = (state, action) => {
  const type = action.type.secondary;
  const payload = action.payload;
  switch (type) {
    case DELETE_ANIME_POSTER: {
      const videoIndex = state.anime.findIndex(
        (video) => payload.videoId === video.id
      );
      const animes = state.anime;
      const anime = animes[videoIndex];
      return {
        ...state,
        anime: [
          ...animes.slice(0, videoIndex),
          {
            ...anime,
            images: anime.images.filter((image) => image.id !== payload.id),
          },
          ...animes.slice(videoIndex + 1),
        ],
      };
    }
    default:
      return state;
  }
};

const reducer = (state = initialState, action) => {
  const mainType = action.type.main;
  if (mainType === GET_VIDEOS) return getVideos(state, action);
  if (mainType === ADD_VIDEO) return addVideo(state, action);
  if (mainType === DELETE_VIDEO) return deleteVideo(state, action);
  if (mainType === ADD_POSTER) return addPoster(state, action);
  if (mainType === DELETE_POSTER) return deletePoster(state, action);
  if (action.type === GET_WATCHIO_INFO) return getInfo(state, action.payload);
  return state;
};

export default reducer;
