import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getWatchingInfo } from '../../../api/api';
import { APIStatus } from '../../../util/constants';
import { name as parentName } from '../constants';

export const name = 'info';
const fullName = `${parentName}/${name}`;

const initialState = {
  status: APIStatus.None,
  error: null,
  watchingTypes: {},
  statusTypes: [],
  airStatusTypes: [],
};

export const fetchInfo = createAsyncThunk(`${fullName}/fetchInfo`, async () => {
  const response = await getWatchingInfo();
  return response.data;
});

const slice = createSlice({
  name: fullName,
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchInfo.pending, (state) => {
        state.status = APIStatus.Pending;
      })
      .addCase(fetchInfo.fulfilled, (state, action) => {
        return {
          ...state,
          status: APIStatus.Ok,
          ...action.payload,
        };
      })
      .addCase(fetchInfo.rejected, (state, action) => {
        state.status = APIStatus.NotOk;
        state.error = action.error.message;
      });
  },
  selectors: {
    selectWatchingTypes: (state) => state.watchingTypes,
    selectAnimeType: (state) => state.watchingTypes.anime,
    selectMovieType: (state) => state.watchingTypes.movie,
    selectSerialType: (state) => state.watchingTypes.serial,
    selectStatusTypes: (state) => state.statusTypes,
    selectAirStatusTypes: (state) => state.airStatusTypes,
    selectStatus: (state) => state.status,
  },
});

export const selectSlice = (state) => state[parentName][name];
export const {
  selectWatchingTypes,
  selectAnimeType,
  selectMovieType,
  selectSerialType,
  selectStatusTypes,
  selectAirStatusTypes,
  selectStatus,
} = slice.getSelectors(selectSlice);
export const reducer = slice.reducer;
export default slice;
