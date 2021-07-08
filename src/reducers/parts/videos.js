import {
  ADD_VIDEO,
  UPDATE_VIDEO,
  DELETE_VIDEO,
  ADD_POSTER,
  UPDATE_POSTER,
  DELETE_POSTER,
} from "../../actions/types.js";

import { add, update, partialUpdate, del } from "../generic";

import posterReducer from "./posters";
import { sortByKey } from "../../util/functions";

const POSTER_ACTION_TYPES = [ADD_POSTER, UPDATE_POSTER, DELETE_POSTER];
const isPosterActionType = (type) =>
  POSTER_ACTION_TYPES.find((_) => type === _);

export const VIDEOS_SORT = sortByKey("order");

const posterAction = (action) => (video) => posterReducer(video.images, action);

const reducer = (videos = [], action) => {
  const { type, payload } = action;
  console.log(videos, action);

  switch (type) {
    case ADD_VIDEO:
      return add(videos, payload.video).sort(VIDEOS_SORT);

    case UPDATE_VIDEO:
      return update(videos, payload.video).sort(VIDEOS_SORT);

    case DELETE_VIDEO:
      return del(videos, payload.id);

    case isPosterActionType(type):
      const id = action.payload.videoId;
      return partialUpdate(videos, id, "images", posterAction(action));
    default:
      return videos;
  }
};

export default reducer;
