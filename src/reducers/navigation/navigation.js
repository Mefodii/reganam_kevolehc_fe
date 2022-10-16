import {
  SET_WATCHERS,
  SET_WATCHER,
  SET_LISTS,
  SET_LIST,
} from "../../actions/types.js";

import contentioReducer, { initialState as contentioIS } from "./contentio";

const initialState = {
  contentio: contentioIS,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_WATCHERS:
    case SET_WATCHER:
    case SET_LISTS:
    case SET_LIST:
      return {
        ...state,
        contentio: contentioReducer(state.contentio, action),
      };
    default:
      return state;
  }
};

export default reducer;
