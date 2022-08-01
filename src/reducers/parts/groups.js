import {
  GET_SERIAL_GROUPS,
  ADD_SERIAL_GROUP,
  UPDATE_SERIAL_GROUP,
  DELETE_SERIAL_GROUP,
  ADD_SERIAL_VIDEO,
  DELETE_SERIAL_VIDEO,
  UPDATE_SERIAL_VIDEO,
  ADD_SERIAL_POSTER,
  UPDATE_SERIAL_POSTER,
  DELETE_SERIAL_POSTER,
  //
  GET_ANIME_GROUPS,
  ADD_ANIME_GROUP,
  UPDATE_ANIME_GROUP,
  DELETE_ANIME_GROUP,
  ADD_ANIME_VIDEO,
  DELETE_ANIME_VIDEO,
  UPDATE_ANIME_VIDEO,
  ADD_ANIME_POSTER,
  UPDATE_ANIME_POSTER,
  DELETE_ANIME_POSTER,
  //
  GET_MOVIE_GROUPS,
  ADD_MOVIE_GROUP,
  UPDATE_MOVIE_GROUP,
  DELETE_MOVIE_GROUP,
  ADD_MOVIE_VIDEO,
  DELETE_MOVIE_VIDEO,
  UPDATE_MOVIE_VIDEO,
  ADD_MOVIE_POSTER,
  UPDATE_MOVIE_POSTER,
  DELETE_MOVIE_POSTER,
} from "../../actions/types.js";

import { add, update, partialUpdate, del } from "../generic";

import videoReducer, { VIDEOS_SORT } from "./videos";
import posterReducer from "./posters";

import { compareByKey } from "../../util/functions";

export const GROUPS_SORT = compareByKey("name", { caseSensitive: false });

const get = (groups) => {
  groups.forEach(({ videos }) => videos.sort(VIDEOS_SORT));
  return groups;
};

const videoAction = (action) => (group) => videoReducer(group.videos, action);
const posterAction = (action) => (video) => posterReducer(video.images, action);

const reducer = (groups = [], action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_SERIAL_GROUPS:
    case GET_ANIME_GROUPS:
    case GET_MOVIE_GROUPS:
      return get(payload).sort(GROUPS_SORT);

    case ADD_SERIAL_GROUP:
    case ADD_ANIME_GROUP:
    case ADD_MOVIE_GROUP:
      return add(groups, payload.group).sort(GROUPS_SORT);

    case UPDATE_SERIAL_GROUP:
    case UPDATE_ANIME_GROUP:
    case UPDATE_MOVIE_GROUP:
      return update(groups, payload.group).sort(GROUPS_SORT);

    case DELETE_SERIAL_GROUP:
    case DELETE_ANIME_GROUP:
    case DELETE_MOVIE_GROUP:
      return del(groups, payload.id);

    case ADD_SERIAL_VIDEO:
    case UPDATE_SERIAL_VIDEO:
    case DELETE_SERIAL_VIDEO:
    case ADD_ANIME_VIDEO:
    case UPDATE_ANIME_VIDEO:
    case DELETE_ANIME_VIDEO:
    case ADD_MOVIE_VIDEO:
    case UPDATE_MOVIE_VIDEO:
    case DELETE_MOVIE_VIDEO:
      const id = action.payload.groupId;
      return partialUpdate(groups, id, "videos", videoAction(action));

    case ADD_SERIAL_POSTER:
    case UPDATE_SERIAL_POSTER:
    case DELETE_SERIAL_POSTER:
    case ADD_ANIME_POSTER:
    case UPDATE_ANIME_POSTER:
    case DELETE_ANIME_POSTER:
    case ADD_MOVIE_POSTER:
    case UPDATE_MOVIE_POSTER:
    case DELETE_MOVIE_POSTER:
      return partialUpdate(
        groups,
        action.payload.groupId,
        "images",
        posterAction(action)
      );

    default:
      return groups;
  }
};

export default reducer;
