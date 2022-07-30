import { CLOSE_MODAL, OPEN_MODAL } from "./types";

const CREATE_CONTENT_WATCHER_MODAL = "CREATE_CONTENT_WATCHER_MODAL";

export const openCreateContentWatcherModal = (data) => (dispatch) => {
  openModal(CREATE_CONTENT_WATCHER_MODAL, data)(dispatch);
};

export const openModal = (modalType, data) => (dispatch) => {
  dispatch({
    type: OPEN_MODAL,
    payload: { modalType, data },
  });
};

export const closeModal = () => (dispatch) => dispatch({ type: CLOSE_MODAL });
