import { SET_LIST, SET_LISTS, SET_WATCHER, SET_WATCHERS } from "../types";

export const setWatcher = (contentWatcher) => (dispatch) => {
  dispatch({
    type: SET_WATCHER,
    payload: contentWatcher,
  });
};

export const setList = (contentList) => (dispatch) => {
  dispatch({
    type: SET_LIST,
    payload: contentList,
  });
};

export const setWatchers = (watcherType) => (dispatch) => {
  dispatch({
    type: SET_WATCHERS,
    payload: watcherType,
  });
};

export const setLists = () => (dispatch) => {
  dispatch({
    type: SET_LISTS,
  });
};
