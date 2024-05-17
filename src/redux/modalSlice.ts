import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

type ModalStateProps = {
  data: Modal.Data;
  isOpen: boolean;
};

export const name = 'modal';

const initialData: Modal.ClosedModal = {
  modalType: 'CLOSED_MODAL',
};

const initialState: ModalStateProps = {
  data: initialData,
  isOpen: false,
};

const slice = createSlice({
  name,
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<Modal.Data>) => {
      return { data: action.payload, isOpen: true };
    },
    closeModal: (state) => {
      return { ...initialState };
    },
  },
  selectors: {
    selectIsOpen: (state) => state.isOpen,
    selectData: (state) => state.data,
  },
});

export const selectSlice = (state: RootState) => state[name];
export const { selectIsOpen, selectData } = slice.getSelectors(selectSlice);
export const { openModal, closeModal } = slice.actions;

export const openGroupModal = (props: Model.GroupProps) =>
  openModal({ props, modalType: 'GROUP_MODAL' });
export const openVideoModal = (props: Model.VideoProps) =>
  openModal({ props, modalType: 'VIDEO_MODAL' });
export const openWatchingFilterModal = () =>
  openModal({ modalType: 'WATCHING_FILTER_MODAL' });
export const openContentWatcherModal = (props: Model.ContentWatcherProps) =>
  openModal({ props, modalType: 'CONTENT_WATCHER_MODAL' });

export const reducer = slice.reducer;
export default slice;
