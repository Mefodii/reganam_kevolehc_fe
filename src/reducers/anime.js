import {
  GET_ANIME_GROUP,
  ADD_ANIME_GROUP,
  DELETE_ANIME_GROUP,
  ADD_ANIME_POSTER,
  DELETE_ANIME_POSTER,
} from "../actions/types.js";

import {
  addPoster,
  deletePoster,
  sortGroups,
  addGroup,
  deleteGroup,
} from "./videos";

const initialState = {
  groups: [],
};

const reducer = (state = initialState, action) => {
  const { groups } = state;
  const { type, payload } = action;

  switch (type) {
    case GET_ANIME_GROUP:
      return {
        ...state,
        groups: sortGroups(payload),
      };
    case ADD_ANIME_GROUP:
      return {
        ...state,
        groups: addGroup(groups, payload),
      };
    case DELETE_ANIME_GROUP:
      return {
        ...state,
        groups: deleteGroup(groups, payload),
      };
    case ADD_ANIME_POSTER:
      return {
        ...state,
        groups: addPoster(groups, payload),
      };
    case DELETE_ANIME_POSTER:
      return {
        ...state,
        groups: deletePoster(groups, payload),
      };
    default:
      return state;
  }
};

export default reducer;
