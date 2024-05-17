import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getWatchingInfo } from '../../../api/api';
import { APIStatus } from '../../../util/constants';
import { name as parentName } from '../constants';
import { RootState } from '../../../store';

export const name = 'info';
const fullName = `${parentName}/${name}`;

type InfoStateProps = Model.WatchingInfo & {
  status: APIStatus;
  error?: string;
};

const initialState: InfoStateProps = {
  status: APIStatus.NONE,
  error: '',
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInfo.pending, (state) => {
        state.status = APIStatus.PENDING;
      })
      .addCase(fetchInfo.fulfilled, (state, action) => {
        return {
          ...state,
          status: APIStatus.OK,
          ...action.payload,
        };
      })
      .addCase(fetchInfo.rejected, (state, action) => {
        state.status = APIStatus.NOT_OK;
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

export const selectSlice = (state: RootState) => state[parentName][name];
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
