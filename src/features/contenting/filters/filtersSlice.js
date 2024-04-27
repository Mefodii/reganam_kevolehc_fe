import { createSlice } from '@reduxjs/toolkit';
import { name as parentName } from '../constants';

export const name = 'filters';
const sliceName = `${parentName}/${name}`;

const initialState = {
  showWatchers: true,
  showLists: false,
  watcherType: undefined,
  watcher: undefined,
  list: undefined,
};

const slice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    setWatcher: (state, action) => {
      state.showWatchers = true;
      state.showLists = false;
      state.watcherType = action.payload;
      state.watcher = undefined;
      state.list = undefined;
    },
    setWatchers: (state, action) => {
      state.showWatchers = false;
      state.showLists = false;
      state.watcherType = undefined;
      state.watcher = action.payload;
      state.list = undefined;
    },
    setList: (state, action) => {
      state.showWatchers = false;
      state.showLists = false;
      state.watcherType = undefined;
      state.watcher = undefined;
      state.list = action.payload;
    },
    setLists: (state, action) => {
      state.showWatchers = false;
      state.showLists = true;
      state.watcherType = undefined;
      state.watcher = undefined;
      state.list = undefined;
    },
  },
  selectors: {},
});

export const selectSlice = (state) => state[parentName][name];
export const selectContentingFilters = slice.getSelectors;
export const { setWatcher, setWatchers, setList, setLists } = slice.actions;
export const reducer = slice.reducer;
export default slice;
