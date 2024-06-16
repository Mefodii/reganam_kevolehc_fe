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
    setWatchers: (
      state,
      action: PayloadAction<ContentWatcherSource | undefined>
    ) => {
      state.showWatchers = true;
      state.showLists = false;
      state.watcherType = action.payload;
      state.category = undefined;
    },
    setLists: (state, action: PayloadAction<undefined>) => {
      state.showWatchers = false;
      state.showLists = true;
      state.watcherType = undefined;
      state.category = undefined;
    },
    setCategory: (
      state,
      action: PayloadAction<{ category?: ContentCategory; showAll: boolean }>
    ) => {
      state.showWatchers = action.payload.showAll;
      state.showLists = true;
      state.watcherType = undefined;
      state.category = action.payload.category;
    },
  },
  selectors: {},
});

export const selectSlice = (state: RootState) => state[parentName][name];
export const selectContentingFilters = selectSlice;
export const { setWatchers, setLists, setCategory } = slice.actions;
export const reducer = slice.reducer;
export default slice;
