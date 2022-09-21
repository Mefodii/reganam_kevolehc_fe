import {
  GET_CONTENT_LISTS,
  ADD_CONTENT_LIST,
  UPDATE_CONTENT_LIST,
  DELETE_CONTENT_LIST,
} from "./types";

import {
  getContentLists as getContentListsApi,
  addContentList as addContentListApi,
  updateContentList as updateContentListApi,
  deleteContentList as deleteContentListApi,
} from "../api/api";

// CONTENT LISTS ACTIONS
export const getContentLists = () => async (dispatch, getState) => {
  const { data: payload } = await getContentListsApi();

  dispatch({
    type: GET_CONTENT_LISTS,
    payload,
  });
};

export const addContentList = (contentList) => async (dispatch, getState) => {
  const { data } = await addContentListApi(contentList);

  dispatch({
    type: ADD_CONTENT_LIST,
    payload: { contentList: data },
  });
};

export const updateContentList =
  (contentList) => async (dispatch, getState) => {
    const { data } = await updateContentListApi(contentList);

    dispatch({
      type: UPDATE_CONTENT_LIST,
      payload: { contentList: data },
    });
  };

export const deleteContentList =
  (contentList) => async (dispatch, getState) => {
    await deleteContentListApi(contentList.id);

    dispatch({
      type: DELETE_CONTENT_LIST,
      payload: { id: contentList.id },
    });
  };
