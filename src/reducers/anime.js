import {
  GET_GROUPS,
  GET_ANIME_GROUPS,
  ADD_GROUP,
  ADD_ANIME_GROUP,
  UPDATE_GROUP,
  UPDATE_ANIME_GROUP,
  DELETE_GROUP,
  DELETE_ANIME_GROUP,
  ADD_VIDEO,
  ADD_ANIME_VIDEO,
  DELETE_VIDEO,
  DELETE_ANIME_VIDEO,
  UPDATE_VIDEO,
  UPDATE_ANIME_VIDEO,
  ADD_POSTER,
  ADD_ANIME_POSTER,
  UPDATE_POSTER,
  UPDATE_ANIME_POSTER,
  DELETE_POSTER,
  DELETE_ANIME_POSTER,
} from "../actions/types.js";

import groupReducer from "./parts/groups";

const initialState = {
  groups: [],
};

const TYPES = {
  [GET_ANIME_GROUPS]: GET_GROUPS,
  [ADD_ANIME_GROUP]: ADD_GROUP,
  [UPDATE_ANIME_GROUP]: UPDATE_GROUP,
  [DELETE_ANIME_GROUP]: DELETE_GROUP,
  [ADD_ANIME_VIDEO]: ADD_VIDEO,
  [UPDATE_ANIME_VIDEO]: UPDATE_VIDEO,
  [DELETE_ANIME_VIDEO]: DELETE_VIDEO,
  [ADD_ANIME_POSTER]: ADD_POSTER,
  [UPDATE_ANIME_POSTER]: UPDATE_POSTER,
  [DELETE_ANIME_POSTER]: DELETE_POSTER,
};
const reduceType = (type) => (TYPES[type] ? TYPES[type] : type);

const GROUP_ACTION_TYPES = [
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
];
const isGroupType = (type) => GROUP_ACTION_TYPES.find((_) => type === _);

const reducer = (state = initialState, action) => {
  const { groups } = state;
  const { payload } = action;
  const type = reduceType(action.type);

  switch (type) {
    case isGroupType(type):
      return {
        ...state,
        groups: groupReducer(groups, { payload, type }),
      };
    default:
      return state;
  }
};

export default reducer;
