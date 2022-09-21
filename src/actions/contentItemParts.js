import {
  GET_CONTENT_ITEM_PARTS,
  ADD_CONTENT_ITEM_PART,
  UPDATE_CONTENT_ITEM_PART,
  DELETE_CONTENT_ITEM_PART,
} from "./types";

import {
  getContentItemParts as getContentItemPartsApi,
  addContentItemPart as addContentItemPartApi,
  updateContentItemPart as updateContentItemPartApi,
  deleteContentItemPart as deleteContentItemPartApi,
} from "../api/api";

// CONTENT LISTS ACTIONS
export const getContentItemParts = () => async (dispatch, getState) => {
  const { data: payload } = await getContentItemPartsApi();

  dispatch({
    type: GET_CONTENT_ITEM_PARTS,
    payload,
  });
};

export const addContentItemPart =
  (contentItemPart) => async (dispatch, getState) => {
    const { data } = await addContentItemPartApi(contentItemPart);

    dispatch({
      type: ADD_CONTENT_ITEM_PART,
      payload: { contentItemPart: data },
    });
  };

export const updateContentItemPart =
  (contentItemPart) => async (dispatch, getState) => {
    const { data } = await updateContentItemPartApi(contentItemPart);

    dispatch({
      type: UPDATE_CONTENT_ITEM_PART,
      payload: { contentItemPart: data },
    });
  };

export const deleteContentItemPart =
  (contentItemPart) => async (dispatch, getState) => {
    await deleteContentItemPartApi(contentItemPart.id);

    dispatch({
      type: DELETE_CONTENT_ITEM_PART,
      payload: { id: contentItemPart.id },
    });
  };
