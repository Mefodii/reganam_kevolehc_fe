import { createSlice } from '@reduxjs/toolkit';

export const name = 'page';

const initialState = {
  theme: 'default-theme',
};

const slice = createSlice({
  name,
  initialState,
  reducers: {
    themeUpdated: (state, action) => {
      state.theme = action.payload;
    },
  },
  selectors: {
    selectTheme: (state) => state.theme,
  },
});

export const selectSlice = (state) => state[name];
export const { selectTheme } = slice.getSelectors(selectSlice);
export const { themeUpdated } = slice.actions;
export const reducer = slice.reducer;
export default slice;
