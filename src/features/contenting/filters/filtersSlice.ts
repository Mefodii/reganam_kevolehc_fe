import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { name as parentName } from '../constants';
import { RootState } from '../../../store';
import { contentFilter } from '../../../models';
import { ContentCategory, ContentWatcherSource } from '../../../api/api-utils';

export const name = 'filters';
const sliceName = `${parentName}/${name}`;

const initialState = contentFilter.getInitialState();

const slice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    setSource: (
      state,
      action: PayloadAction<ContentWatcherSource | undefined>
    ) => {
      state.source = action.payload;
    },
    setCategory: (
      state,
      action: PayloadAction<ContentCategory | undefined>
    ) => {
      state.category = action.payload;
    },
  },
  selectors: {
    selectSource: (state) => state.source,
    selectCategory: (state) => state.category,
  },
});

export const selectSlice = (state: RootState) => state[parentName][name];
export const { selectCategory, selectSource } = slice.getSelectors(selectSlice);
export const { setSource, setCategory } = slice.actions;
export const reducer = slice.reducer;
export default slice;
