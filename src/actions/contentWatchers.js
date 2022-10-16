import {
  GET_CONTENT_WATCHERS,
  ADD_CONTENT_WATCHER,
  UPDATE_CONTENT_WATCHER,
  DELETE_CONTENT_WATCHER,
  ADD_CONTENT_LIST,
} from "./types";

import {
  getContentWatchers as getContentWatchersApi,
  addContentWatcher as addContentWatcherApi,
  updateContentWatcher as updateContentWatcherApi,
  deleteContentWatcher as deleteContentWatcherApi,
  addContentList,
} from "../api/api";

// CONTENT LISTS ACTIONS
export const getContentWatchers = () => async (dispatch, getState) => {
  const { data } = await getContentWatchersApi();

  dispatch({
    type: GET_CONTENT_WATCHERS,
    payload: { contentWatchers: data },
  });
};

export const addContentWatcher =
  (contentWatcher) => async (dispatch, getState) => {
    const { data: contentList } = await addContentList({
      name: contentWatcher.name,
    });
    const { data } = await addContentWatcherApi({
      ...contentWatcher,
      content_list: contentList.id,
    });

    dispatch({
      type: ADD_CONTENT_LIST,
      payload: {
        contentList: { ...contentList, content_watcher: data.id },
      },
    });

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
