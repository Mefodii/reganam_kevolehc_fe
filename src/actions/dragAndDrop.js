import { REMOVE_DRAG_DATA, SET_DRAG_COPY, SET_DRAG_DATA } from "./types";

export const setDrag = (item, type, copy) => (dispatch) => {
  dispatch({
    type: SET_DRAG_DATA,
    payload: { item, type, copy },
  });
};

export const setDragCopy = (copy) => (dispatch) => {
  dispatch({
    type: SET_DRAG_COPY,
    payload: { copy },
  });
};

export const removeDrag = () => (dispatch) => {
  dispatch({ type: REMOVE_DRAG_DATA });
};
