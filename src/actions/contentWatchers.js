import {
  GET_CONTENT_WATCHERS,
  ADD_CONTENT_WATCHER,
  UPDATE_CONTENT_WATCHER,
  DELETE_CONTENT_WATCHER,
} from "./types";

import {
  getContentWatchers as getContentWatchersApi,
  addContentWatcher as addContentWatcherApi,
  updateContentWatcher as updateContentWatcherApi,
  deleteContentWatcher as deleteContentWatcherApi,
} from "../api/api";

// CONTENT LISTS ACTIONS
export const getContentWatchers = () => async (dispatch, getState) => {
  const { data: payload } = await getContentWatchersApi();

  dispatch({
    type: GET_CONTENT_WATCHERS,
    payload,
  });
};

export const addContentWatcher =
  (contentWatcher) => async (dispatch, getState) => {
    const { data } = await addContentWatcherApi(contentWatcher);

    dispatch({
      type: ADD_CONTENT_WATCHER,
      payload: { contentWatcher: data },
    });
  };

export const updateContentWatcher =
  (contentWatcher) => async (dispatch, getState) => {
    const { data } = await updateContentWatcherApi(contentWatcher);

    dispatch({
      type: UPDATE_CONTENT_WATCHER,
      payload: { contentWatcher: data },
    });
  };

export const deleteContentWatcher =
  (contentWatcher) => async (dispatch, getState) => {
    await deleteContentWatcherApi(contentWatcher.id);

    dispatch({
      type: DELETE_CONTENT_WATCHER,
      payload: { id: contentWatcher.id },
    });
  };
