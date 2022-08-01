import {
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
} from "../actions/types.js";

import groupReducer from "./parts/groups";

const initialState = {
  groups: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ANIME_GROUPS:
    case ADD_ANIME_GROUP:
    case UPDATE_ANIME_GROUP:
    case DELETE_ANIME_GROUP:
    case ADD_ANIME_VIDEO:
    case UPDATE_ANIME_VIDEO:
    case DELETE_ANIME_VIDEO:
    case ADD_ANIME_POSTER:
    case UPDATE_ANIME_POSTER:
    case DELETE_ANIME_POSTER:
      return {
        ...state,
        groups: groupReducer(state.groups, action),
      };
    default:
      return state;
  }
};

export default reducer;
