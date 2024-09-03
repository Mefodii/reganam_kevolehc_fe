import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const name = 'page';

const initialState = {
  theme: 'default-theme',
};

export const slice = createSlice({
  name,
  initialState,
  reducers: {
    themeUpdated: (state, action: PayloadAction<string>) => {
      state.theme = action.payload;
    },
  },
  selectors: {
    selectTheme: (state) => state.theme,
  },
});

export const selectSlice = (state: RootState) => state[name];
export const { selectTheme } = slice.getSelectors(selectSlice);
export const { themeUpdated } = slice.actions;
export const reducer = slice.reducer;
