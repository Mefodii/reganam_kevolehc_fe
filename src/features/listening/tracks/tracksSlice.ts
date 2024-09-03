import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  isAnyOf,
} from '@reduxjs/toolkit';
import {
  addTrack as apiAddTrack,
  deleteTrack as apiDeleteTrack,
  deleteTracks as apiDeleteTracks,
  getTracks as apiGetTracks,
  updateTrack as apiUpdateTrack,
  updateTracks as apiUpdateTracks,
} from '../../../api/api';
import { AppThunkApiConfig, RootState } from '../../../store';
import { APIStatus, ReduxRootName } from '../../../util/constants';
import { isAbortError } from '../../../util/functions';

const parentName = ReduxRootName.LISTENING;

export const name = 'tracks';
const sliceName = `${parentName}/${name}`;

const tracksAdapter = createEntityAdapter({
  selectId: (track: Model.TrackDM) => track.id,
});

const stateFragment: {
  status: APIStatus;
  error?: string;
  pageInfo?: PageInfo<QParams.Track>;
} = {
  status: APIStatus.NONE,
  error: '',
  pageInfo: undefined,
};

const initialState = tracksAdapter.getInitialState(stateFragment);

export const fetchTracks = createAsyncThunk<
  Axios.PagedResult<Model.TrackDM, QParams.Track>,
  QParams.Track
>(`${sliceName}/fetchTracks`, async (params, { signal }) => {
  const { data } = await apiGetTracks(params, signal);
  return data;
});

export const refetchTracks = createAsyncThunk<
  Axios.PagedResult<Model.TrackDM, QParams.Track>,
  void,
  AppThunkApiConfig
>(`${sliceName}/refetchTracks`, async (_, { getState, signal }) => {
  const params = selectCurrentParams(getState());
  if (!params) {
    throw new Error(`params missing on refetchContentItems`);
  }
  const { data } = await apiGetTracks(params, signal);
  return data;
});

export const createTrack = createAsyncThunk<
  void,
  Model.TrackSM,
  AppThunkApiConfig
>(`${sliceName}/createTrack`, async (track, { dispatch, signal }) => {
  await apiAddTrack(track, signal);
  dispatch(refetchTracks());
});

export const updateTrack = createAsyncThunk<
  void,
  Model.TrackDM,
  AppThunkApiConfig
>(`${sliceName}/updateTrack`, async (track, { dispatch, signal }) => {
  await apiUpdateTrack(track, signal);
  dispatch(refetchTracks());
});

export const updateTracks = createAsyncThunk<
  void,
  Model.TrackDM[],
  AppThunkApiConfig
>(`${sliceName}/updateTracks`, async (tracks, { dispatch, signal }) => {
  await apiUpdateTracks(tracks, signal);
  dispatch(refetchTracks());
});

export const deleteTrack = createAsyncThunk<
  void,
  Model.TrackDM,
  AppThunkApiConfig
>(`${sliceName}/deleteTrack`, async (track, { dispatch, signal }) => {
  await apiDeleteTrack(track.id, signal);
  dispatch(refetchTracks());
});

export const deleteTracks = createAsyncThunk<
  void,
  Model.TrackDM[],
  AppThunkApiConfig
>(`${sliceName}/deleteTrack`, async (tracks, { dispatch, signal }) => {
  await apiDeleteTracks(
    tracks.map((item) => item.id),
    signal
  );
  dispatch(refetchTracks());
});

export const slice = createSlice({
  name: sliceName,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTracks.fulfilled, (state, action) => {
      state.status = APIStatus.OK;
      const { results, ...pageInfo } = action.payload;

      state.pageInfo = pageInfo;
      tracksAdapter.removeAll(state);
      tracksAdapter.upsertMany(state, results);
    });
    builder.addCase(refetchTracks.fulfilled, (state, action) => {
      state.status = APIStatus.OK;
      const { results } = action.payload;

      tracksAdapter.removeAll(state);
      tracksAdapter.upsertMany(state, results);
    });
    builder.addMatcher(
      isAnyOf(
        fetchTracks.pending,
        refetchTracks.pending,
        createTrack.pending,
        updateTrack.pending,
        updateTracks.pending,
        deleteTrack.pending,
        deleteTracks.pending
      ),
      (state) => {
        state.status = APIStatus.PENDING;
      }
    );
    builder.addMatcher(
      isAnyOf(
        fetchTracks.rejected,
        refetchTracks.rejected,
        createTrack.rejected,
        updateTrack.rejected,
        updateTracks.rejected,
        deleteTrack.rejected,
        deleteTracks.rejected
      ),
      (state, action) => {
        if (isAbortError(action)) {
          state.status = APIStatus.OK;
          return;
        }
        state.status = APIStatus.NOT_OK;
        state.error = action.error.message;
      }
    );
  },
  selectors: {
    selectStatus: (state) => state.status,
    selectPageInfo: (state) => state.pageInfo,
    selectPage: (state) => state.pageInfo?.page,
    selectCurrentParams: (state) => state.pageInfo?.currentParams,
  },
});

export const selectSlice = (state: RootState) => state[parentName][name];
export const {
  selectAll: selectAllTracks,
  selectById: selectTrackById,
  selectIds: selectTrackIds,
} = tracksAdapter.getSelectors(selectSlice);
export const { selectStatus, selectPageInfo, selectPage, selectCurrentParams } =
  slice.getSelectors(selectSlice);
export const selectIsAPIPending = (state: RootState) =>
  selectStatus(state) === APIStatus.PENDING;
export const reducer = slice.reducer;
