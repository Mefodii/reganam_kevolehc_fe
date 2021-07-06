import {
  GET_ANIME_GROUP,
  ADD_ANIME_GROUP,
  DELETE_ANIME_GROUP,
  ADD_ANIME_POSTER,
  DELETE_ANIME_POSTER,
} from "../actions/types.js";

import groupReducer from "./groups";

const initialState = {
  groups: [],
};

const GROUP_ACTION_TYPES = [
  GET_ANIME_GROUP,
  ADD_ANIME_GROUP,
  DELETE_ANIME_GROUP,
  ADD_ANIME_POSTER,
  DELETE_ANIME_POSTER,
];
const isGroupType = (type) => GROUP_ACTION_TYPES.find((_) => type === _);

const reducer = (state = initialState, action) => {
  if (isGroupType(action.type))
    return {
      ...state,
      groups: groupReducer(state.groups, action),
    };

  return state;
};

export default reducer;
