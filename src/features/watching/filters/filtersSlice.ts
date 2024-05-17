import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { name as parentName } from '../constants';
import { lsHelper } from '../../../util/localStorageHelper';
import { RootState } from '../../../store';

export const name = 'filters';
const sliceName = `${parentName}/${name}`;

const initialState = {
  watchingFilter: lsHelper.getWatchingFilter(),
};

const slice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    updateWatchingFilter: (
      state,
      { payload }: PayloadAction<Model.WatchingFilter>
    ) => {
      lsHelper.setWatchingFilter(payload);
      state.watchingFilter = payload;
    },
  },
  selectors: {
    selectWatchingFilter: (state) => state.watchingFilter,
  },
});

export const selectSlice = (state: RootState) => state[parentName][name];
export const { selectWatchingFilter } = slice.getSelectors(selectSlice);
export const { updateWatchingFilter } = slice.actions;
export const reducer = slice.reducer;
export default slice;
