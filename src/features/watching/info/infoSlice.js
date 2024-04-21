import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getWatchingInfo } from '../../../api/api';
import { APIStatus } from '../../../util/constants';
import { name as parentName } from '../constants';

export const name = 'info';
const sliceName = `${parentName}/${name}`;

const initialState = {
  status: APIStatus.None,
  error: null,
  watchingTypes: {},
  statusTypes: [],
  airStatusTypes: [],
};

export const fetchInfo = createAsyncThunk(
  `${parentName}/${name}/fetchInfo`,
  async () => {
    const response = await getWatchingInfo();
    return response.data;
  }
);

const slice = createSlice({
  name: sliceName,
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
});

const getSliceState = (state) => state[parentName][name];

export const selectWatchingTypes = (state) =>
  getSliceState(state).watchingTypes;
export const selectAnimeType = (state) => selectWatchingTypes(state).anime;
export const selectMovieType = (state) => selectWatchingTypes(state).movie;
export const selectSerialType = (state) => selectWatchingTypes(state).serial;

export const selectStatusTypes = (state) => getSliceState(state).statusTypes;

export const selectAirStatusTypes = (state) =>
  getSliceState(state).airStatusTypes;

export const selectStatus = (state) => getSliceState(state).status;

export default slice;
