import {
  GET_GROUPS,
  GET_MOVIE_GROUPS,
  ADD_GROUP,
  ADD_MOVIE_GROUP,
  UPDATE_GROUP,
  UPDATE_MOVIE_GROUP,
  DELETE_GROUP,
  DELETE_MOVIE_GROUP,
  ADD_VIDEO,
  ADD_MOVIE_VIDEO,
  DELETE_VIDEO,
  DELETE_MOVIE_VIDEO,
  UPDATE_VIDEO,
  UPDATE_MOVIE_VIDEO,
  ADD_POSTER,
  ADD_MOVIE_POSTER,
  UPDATE_POSTER,
  UPDATE_MOVIE_POSTER,
  DELETE_POSTER,
  DELETE_MOVIE_POSTER,
} from "../actions/types.js";

import groupReducer from "./parts/groups";

const initialState = {
  groups: [],
};

const TYPES = {
  [GET_MOVIE_GROUPS]: GET_GROUPS,
  [ADD_MOVIE_GROUP]: ADD_GROUP,
  [UPDATE_MOVIE_GROUP]: UPDATE_GROUP,
  [DELETE_MOVIE_GROUP]: DELETE_GROUP,
  [ADD_MOVIE_VIDEO]: ADD_VIDEO,
  [UPDATE_MOVIE_VIDEO]: UPDATE_VIDEO,
  [DELETE_MOVIE_VIDEO]: DELETE_VIDEO,
  [ADD_MOVIE_POSTER]: ADD_POSTER,
  [UPDATE_MOVIE_POSTER]: UPDATE_POSTER,
  [DELETE_MOVIE_POSTER]: DELETE_POSTER,
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
