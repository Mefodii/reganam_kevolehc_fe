import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../store';
import { ReduxRootName } from '../../../util/constants';
import { lsHelper } from '../../../util/localStorageHelper';

const parentName = ReduxRootName.WATCHING;

export const name = 'filters';
const sliceName = `${parentName}/${name}`;

const initialState = {
  watchingFilter: lsHelper.getWatchingFilter(),
};

export const slice = createSlice({
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
