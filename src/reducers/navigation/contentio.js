import {
  SET_WATCHERS,
  SET_WATCHER,
  SET_LISTS,
  SET_LIST,
} from "../../actions/types.js";

export const initialState = {
  showWatchers: true,
  showLists: false,
  watcherType: undefined,
  watcher: undefined,
  list: undefined,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_WATCHERS:
      return {
        ...state,
        showWatchers: true,
        showLists: false,
        watcherType: payload,
        watcher: undefined,
        list: undefined,
      };
    case SET_WATCHER:
      return {
        ...state,
        showWatchers: false,
        showLists: false,
        watcherType: undefined,
        watcher: payload,
        list: undefined,
      };
    case SET_LISTS:
      return {
        ...state,
        showWatchers: false,
        showLists: true,
        watcherType: undefined,
        watcher: undefined,
        list: undefined,
      };
    case SET_LIST:
      return {
        ...state,
        showWatchers: false,
        showLists: false,
        watcherType: undefined,
        watcher: undefined,
        list: payload,
      };
    default:
      return state;
  }
};

export default reducer;
