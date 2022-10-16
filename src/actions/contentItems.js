import {
  GET_CONTENT_ITEMS,
  ADD_CONTENT_ITEM,
  UPDATE_CONTENT_ITEM,
  DELETE_CONTENT_ITEM,
} from "./types";

import {
  getContentItems as getContentItemsApi,
  addContentItem as addContentItemApi,
  updateContentItem as updateContentItemApi,
  deleteContentItem as deleteContentItemApi,
} from "../api/api";

// CONTENT LISTS ACTIONS
export const getContentItems = () => async (dispatch, getState) => {
  const { data } = await getContentItemsApi();

  dispatch({
    type: GET_CONTENT_ITEMS,
    payload: { contentItems: data },
  });
};

export const addContentItem = (contentItem) => async (dispatch, getState) => {
  const { data } = await addContentItemApi(contentItem);

  dispatch({
    type: ADD_CONTENT_ITEM,
    payload: { contentItem: data },
  });
};

export const updateContentItem =
  (contentItem) => async (dispatch, getState) => {
    const { data } = await updateContentItemApi(contentItem);

    dispatch({
      type: UPDATE_CONTENT_ITEM,
      payload: { contentItem: data },
    });
  };

export const deleteContentItem =
  (contentItem) => async (dispatch, getState) => {
    await deleteContentItemApi(contentItem.id);

    dispatch({
      type: DELETE_CONTENT_ITEM,
      payload: { id: contentItem.id },
    });
  };
