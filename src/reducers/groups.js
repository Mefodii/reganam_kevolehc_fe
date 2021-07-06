import {
  GET_GROUP,
  GET_ANIME_GROUP,
  GET_SERIALS_GROUP,
  GET_MOVIES_GROUP,
  ADD_GROUP,
  ADD_ANIME_GROUP,
  ADD_SERIAL_GROUP,
  ADD_MOVIE_GROUP,
  DELETE_GROUP,
  DELETE_ANIME_GROUP,
  DELETE_SERIAL_GROUP,
  DELETE_MOVIE_GROUP,
  ADD_POSTER,
  ADD_ANIME_POSTER,
  ADD_SERIAL_POSTER,
  ADD_MOVIE_POSTER,
  DELETE_POSTER,
  DELETE_ANIME_POSTER,
  DELETE_SERIAL_POSTER,
  DELETE_MOVIE_POSTER,
} from "../actions/types.js";

import videoReducer from "./videos";

const actionTypes = {
  [GET_ANIME_GROUP]: GET_GROUP,
  [GET_SERIALS_GROUP]: GET_GROUP,
  [GET_MOVIES_GROUP]: GET_GROUP,
  [ADD_ANIME_GROUP]: ADD_GROUP,
  [ADD_SERIAL_GROUP]: ADD_GROUP,
  [ADD_MOVIE_GROUP]: ADD_GROUP,
  [DELETE_ANIME_GROUP]: DELETE_GROUP,
  [DELETE_SERIAL_GROUP]: DELETE_GROUP,
  [DELETE_MOVIE_GROUP]: DELETE_GROUP,
  [ADD_ANIME_POSTER]: ADD_POSTER,
  [ADD_SERIAL_POSTER]: ADD_POSTER,
  [ADD_MOVIE_POSTER]: ADD_POSTER,
  [DELETE_ANIME_POSTER]: DELETE_POSTER,
  [DELETE_SERIAL_POSTER]: DELETE_POSTER,
  [DELETE_MOVIE_POSTER]: DELETE_POSTER,
};

const VIDEO_ACTION_TYPES = [ADD_POSTER, DELETE_POSTER];
const isVideoActionType = (type) => VIDEO_ACTION_TYPES.find((_) => type === _);

const initialState = [];

const sortByOrder = (a, b) => a.order - b.order;
const getGroups = (groups) => {
  groups.forEach(({ videos }) => videos.sort(sortByOrder));
  return groups;
};

const deleteGroup = (groups, groupId) => {};
const addGroup = (groups, newGroup) => {};

const videoAction = (groups, action) => {
  return groups.map((group) => {
    if (group.id !== action.payload.groupId) return group;

    return {
      ...group,
      videos: videoReducer(group.videos, action),
    };
  });
};

const reducer = (state = initialState, action) => {
  const { payload } = action;
  const type = actionTypes[action.type];

  switch (type) {
    case GET_GROUP:
      return getGroups(payload);
    case ADD_GROUP:
      return addGroup(state, payload);
    case DELETE_GROUP:
      return deleteGroup(state, payload);
    case isVideoActionType(type):
      return videoAction(state, { type, payload });
    default:
      return state;
  }
};

export default reducer;
