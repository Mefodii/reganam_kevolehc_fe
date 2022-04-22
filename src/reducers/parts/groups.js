import {
  GET_GROUPS,
  ADD_GROUP,
  UPDATE_GROUP,
  DELETE_GROUP,
  ADD_VIDEO,
  UPDATE_VIDEO,
  DELETE_VIDEO,
  ADD_POSTER,
  UPDATE_POSTER,
  DELETE_POSTER,
} from "../../actions/types.js";

import { add, update, partialUpdate, del } from "../generic";

import videoReducer, { VIDEOS_SORT } from "./videos";
import posterReducer from "./posters";

import { sortByKey } from "../../util/functions";

const VIDEO_ACTION_TYPES = [ADD_VIDEO, UPDATE_VIDEO, DELETE_VIDEO];
const isVideoActionType = (type) => VIDEO_ACTION_TYPES.find((_) => type === _);

const POSTER_ACTION_TYPES = [ADD_POSTER, UPDATE_POSTER, DELETE_POSTER];
const isPosterActionType = (type) =>
  POSTER_ACTION_TYPES.find((_) => type === _);

export const GROUPS_SORT = sortByKey("name");

const get = (groups) => {
  groups.forEach(({ videos }) => videos.sort(VIDEOS_SORT));
  return groups;
};

const videoAction = (action) => (group) => videoReducer(group.videos, action);
const posterAction = (action) => (video) => posterReducer(video.images, action);

const reducer = (groups = [], action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_GROUPS:
      return get(payload).sort(GROUPS_SORT);

    case ADD_GROUP:
      return add(groups, payload.group).sort(GROUPS_SORT);

    case UPDATE_GROUP:
      return update(groups, payload.group).sort(GROUPS_SORT);

    case DELETE_GROUP:
      return del(groups, payload.id);

    case isVideoActionType(type):
      const id = action.payload.groupId;
      return partialUpdate(groups, id, "videos", videoAction(action));

    case isPosterActionType(type):
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
