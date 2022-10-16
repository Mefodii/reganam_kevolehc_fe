import {
  ADD_SERIAL_VIDEO,
  ADD_ANIME_VIDEO,
  ADD_MOVIE_VIDEO,
  UPDATE_SERIAL_VIDEO,
  UPDATE_ANIME_VIDEO,
  UPDATE_MOVIE_VIDEO,
  DELETE_SERIAL_VIDEO,
  DELETE_ANIME_VIDEO,
  DELETE_MOVIE_VIDEO,
} from "../../actions/types.js";

import { add, update, del } from "../generic";

import { compareByKey } from "../../util/functions";

export const VIDEOS_SORT = compareByKey("order");

// NOTE: not used anymore, now group complete updated data is returned after any video action
const reducer = (videos = [], action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_SERIAL_VIDEO:
    case ADD_ANIME_VIDEO:
    case ADD_MOVIE_VIDEO:
      return add(videos, payload.video).sort(VIDEOS_SORT);

    case UPDATE_SERIAL_VIDEO:
    case UPDATE_ANIME_VIDEO:
    case UPDATE_MOVIE_VIDEO:
      return update(videos, payload.video).sort(VIDEOS_SORT);

    case DELETE_SERIAL_VIDEO:
    case DELETE_ANIME_VIDEO:
    case DELETE_MOVIE_VIDEO:
      return del(videos, payload.id);

    default:
      return videos;
  }
};

export default reducer;
