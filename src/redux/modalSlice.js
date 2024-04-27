import { createSlice } from '@reduxjs/toolkit';

export const CREATE_CONTENT_WATCHER_MODAL = 'CREATE_CONTENT_WATCHER_MODAL';
export const GROUP_MODAL = 'GROUP_MODAL';
export const VIDEO_MODAL = 'VIDEO_MODAL';
export const WATCHING_FILTER_MODAL = 'WATCHING_FILTER_MODAL';

export const name = 'modal';

const initialState = {
  modalType: '',
  data: {},
  isOpen: false,
};

const slice = createSlice({
  name,
  initialState,
  reducers: {
    openModal: (state, action) => {
      return { ...action.payload, isOpen: true };
    },
    closeModal: (state, action) => {
      return { ...initialState };
    },
  },
  selectors: {
    selectIsOpen: (state) => state.isOpen,
    selectData: (state) => state.data,
    selectModalType: (state) => state.modalType,
  },
});

export const selectSlice = (state) => state[name];
export const { selectIsOpen, selectData, selectModalType } =
  slice.getSelectors(selectSlice);
export const { openModal, closeModal } = slice.actions;

export const openGroupModal = (data = {}) =>
  openModal({ modalType: GROUP_MODAL, data });
export const openVideoModal = (data = {}) =>
  openModal({ modalType: VIDEO_MODAL, data });
export const openWatchingFilterModal = (data = {}) =>
  openModal({ modalType: WATCHING_FILTER_MODAL, data });
export const openContentWatcherModal = (data = {}) =>
  openModal({ modalType: CREATE_CONTENT_WATCHER_MODAL, data });

export const reducer = slice.reducer;
export default slice;
