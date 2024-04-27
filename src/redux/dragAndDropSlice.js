import { createSlice } from '@reduxjs/toolkit';

export const name = 'dragAndDrop';

const initialState = {
  item: undefined,
  type: undefined,
  copy: false,
};

const slice = createSlice({
  name,
  initialState,
  reducers: {
    setDrag: (state, action) => {
      const { item, type, copy } = action.payload;
      return { ...state, item, type, copy };
    },
    removeDrag: (state, action) => {
      return {
        ...state,
        item: undefined,
        type: undefined,
        copy: false,
      };
    },
  },
});

export const selectSlice = (state) => state[name];
export const selectDndData = selectSlice;
export const { setDrag, removeDrag } = slice.actions;
export const reducer = slice.reducer;
export default slice;
