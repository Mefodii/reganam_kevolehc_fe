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
});

const getSliceState = (state) => state[name];

export const selectTheme = (state) => getSliceState(state).theme;

export const { themeUpdated } = slice.actions;
export default slice;
