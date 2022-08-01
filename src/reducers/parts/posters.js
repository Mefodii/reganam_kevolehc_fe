import {
  ADD_SERIAL_POSTER,
  ADD_ANIME_POSTER,
  ADD_MOVIE_POSTER,
  UPDATE_SERIAL_POSTER,
  UPDATE_ANIME_POSTER,
  UPDATE_MOVIE_POSTER,
  DELETE_SERIAL_POSTER,
  DELETE_ANIME_POSTER,
  DELETE_MOVIE_POSTER,
} from "../../actions/types.js";

import { add, update, del } from "../generic";

const reducer = (posters = [], action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_SERIAL_POSTER:
    case ADD_ANIME_POSTER:
    case ADD_MOVIE_POSTER:
      return add(posters, payload.poster);

    case UPDATE_SERIAL_POSTER:
    case UPDATE_ANIME_POSTER:
    case UPDATE_MOVIE_POSTER:
      return update(posters, payload.poster);

    case DELETE_SERIAL_POSTER:
    case DELETE_ANIME_POSTER:
    case DELETE_MOVIE_POSTER:
      return del(posters, payload.id);

    default:
      return posters;
  }
};

export default reducer;
