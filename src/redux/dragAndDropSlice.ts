import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const name = 'dragAndDrop';

export type DragAndDropSliceProps = DragAndDrop.Data;

const initialState: DragAndDropSliceProps = {
  item: undefined,
  type: undefined,
  accessGroup: undefined,
  copy: false,
};

const slice = createSlice({
  name,
  initialState,
  reducers: {
    setDrag: (state, action: PayloadAction<DragAndDropSliceProps>) => {
      return { ...state, ...action.payload };
    },
    removeDrag: (state) => {
      return {
        ...state,
        item: undefined,
        type: undefined,
        accessGroup: undefined,
        copy: false,
      };
    },
  },
  selectors: {
    selectAccessGroup: (state) => state.accessGroup,
  },
});

export const selectSlice = (state: RootState) => state[name];
export const { selectAccessGroup } = slice.getSelectors(selectSlice);
export const selectDndData = selectSlice;
export const selectDndDataIfGroup = (
  state: RootState,
  accessGroup: DragAndDrop.AccessGroup
) =>
  selectAccessGroup(state) === accessGroup ? selectDndData(state) : undefined;
export const { setDrag, removeDrag } = slice.actions;
export const reducer = slice.reducer;
export default slice;
