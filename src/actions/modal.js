import { CLOSE_MODAL, OPEN_MODAL } from "./types";

export const CREATE_CONTENT_WATCHER_MODAL = "CREATE_CONTENT_WATCHER_MODAL";
export const GROUP_MODAL = "GROUP_MODAL";
export const VIDEO_MODAL = "VIDEO_MODAL";
export const WATCHIO_FILTER_MODAL = "WATCHIO_FILTER_MODAL";

export const openContentWatcherModal = (data) => (dispatch) => {
  openModal(CREATE_CONTENT_WATCHER_MODAL, data)(dispatch);
};

export const openGroupModal =
  (data = {}) =>
  (dispatch) => {
    openModal(GROUP_MODAL, data)(dispatch);
  };

export const openVideoModal =
  (data = {}) =>
  (dispatch) => {
    openModal(VIDEO_MODAL, data)(dispatch);
  };

export const openWatchioFilterModal =
  (data = {}) =>
  (dispatch) => {
    openModal(WATCHIO_FILTER_MODAL, data)(dispatch);
  };

export const openModal = (modalType, data) => (dispatch) => {
  dispatch({
    type: OPEN_MODAL,
    payload: { modalType, data },
  });
};

export const closeModal = () => (dispatch) => dispatch({ type: CLOSE_MODAL });
