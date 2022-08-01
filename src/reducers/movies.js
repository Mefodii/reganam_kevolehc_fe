import {
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
} from "../actions/types.js";

import groupReducer from "./parts/groups";

const initialState = {
  groups: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MOVIE_GROUPS:
    case ADD_MOVIE_GROUP:
    case UPDATE_MOVIE_GROUP:
    case DELETE_MOVIE_GROUP:
    case ADD_MOVIE_VIDEO:
    case UPDATE_MOVIE_VIDEO:
    case DELETE_MOVIE_VIDEO:
    case ADD_MOVIE_POSTER:
    case UPDATE_MOVIE_POSTER:
    case DELETE_MOVIE_POSTER:
      return {
        ...state,
        groups: groupReducer(state.groups, action),
      };
    default:
      return state;
  }
};

export default reducer;
