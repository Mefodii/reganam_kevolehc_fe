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
} from "../actions/types.js";

import groupReducer from "./parts/groups";

const initialState = {
  groups: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SERIAL_GROUPS:
    case ADD_SERIAL_GROUP:
    case UPDATE_SERIAL_GROUP:
    case DELETE_SERIAL_GROUP:
    case ADD_SERIAL_VIDEO:
    case UPDATE_SERIAL_VIDEO:
    case DELETE_SERIAL_VIDEO:
    case ADD_SERIAL_POSTER:
    case UPDATE_SERIAL_POSTER:
    case DELETE_SERIAL_POSTER:
      return {
        ...state,
        groups: groupReducer(state.groups, action),
      };
    default:
      return state;
  }
};

export default reducer;
