import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  isAnyOf,
} from '@reduxjs/toolkit';
import {
  addArtist as apiAddArtist,
  deleteArtist as apiDeleteArtist,
  deleteArtists as apiDeleteArtists,
  getArtists as apiGetArtists,
  updateArtist as apiUpdateArtist,
  updateArtists as apiUpdateArtists,
} from '../../../api/api';
import { AppThunkApiConfig, RootState } from '../../../store';
import { APIStatus, ReduxRootName } from '../../../util/constants';
import { isAbortError } from '../../../util/functions';

const parentName = ReduxRootName.LISTENING;

export const name = 'artists';
const sliceName = `${parentName}/${name}`;

const artistsAdapter = createEntityAdapter({
  selectId: (artist: Model.ArtistDM) => artist.id,
});

const stateFragment: {
  status: APIStatus;
  error?: string;
  pageInfo?: PageInfo<QParams.Artist>;
} = {
  status: APIStatus.NONE,
  error: '',
  pageInfo: undefined,
};

const initialState = artistsAdapter.getInitialState(stateFragment);

export const fetchArtists = createAsyncThunk<
  Axios.PagedResult<Model.ArtistDM, QParams.Artist>,
  QParams.Artist
>(`${sliceName}/fetchArtists`, async (params, { signal }) => {
  const { data } = await apiGetArtists(params, signal);
  return data;
});

export const refetchArtists = createAsyncThunk<
  Axios.PagedResult<Model.ArtistDM, QParams.Artist>,
  void,
  AppThunkApiConfig
>(`${sliceName}/refetchArtists`, async (_, { getState, signal }) => {
  const params = selectCurrentParams(getState());
  if (!params) {
    throw new Error(`params missing on refetchContentItems`);
  }
  const { data } = await apiGetArtists(params, signal);
  return data;
});

export const createArtist = createAsyncThunk<
  void,
  Model.ArtistSM,
  AppThunkApiConfig
>(`${sliceName}/createArtist`, async (artist, { dispatch, signal }) => {
  await apiAddArtist(artist, signal);
  dispatch(refetchArtists());
});

export const updateArtist = createAsyncThunk<
  void,
  Model.ArtistDM,
  AppThunkApiConfig
>(`${sliceName}/updateArtist`, async (artist, { dispatch, signal }) => {
  await apiUpdateArtist(artist, signal);
  dispatch(refetchArtists());
});

export const updateArtists = createAsyncThunk<
  void,
  Model.ArtistDM[],
  AppThunkApiConfig
>(`${sliceName}/updateArtists`, async (artists, { dispatch, signal }) => {
  await apiUpdateArtists(artists, signal);
  dispatch(refetchArtists());
});

export const deleteArtist = createAsyncThunk<
  void,
  Model.ArtistDM,
  AppThunkApiConfig
>(`${sliceName}/deleteArtist`, async (artist, { dispatch, signal }) => {
  await apiDeleteArtist(artist.id, signal);
  dispatch(refetchArtists());
});

export const deleteArtists = createAsyncThunk<
  void,
  Model.ArtistDM[],
  AppThunkApiConfig
>(`${sliceName}/deleteArtist`, async (artists, { dispatch, signal }) => {
  await apiDeleteArtists(
    artists.map((item) => item.id),
    signal
  );
  dispatch(refetchArtists());
});

export const slice = createSlice({
  name: sliceName,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchArtists.fulfilled, (state, action) => {
      state.status = APIStatus.OK;
      const { results, ...pageInfo } = action.payload;

      state.pageInfo = pageInfo;
      artistsAdapter.removeAll(state);
      artistsAdapter.upsertMany(state, results);
    });
    builder.addCase(refetchArtists.fulfilled, (state, action) => {
      state.status = APIStatus.OK;
      const { results } = action.payload;

      artistsAdapter.removeAll(state);
      artistsAdapter.upsertMany(state, results);
    });
    builder.addMatcher(
      isAnyOf(
        fetchArtists.pending,
        refetchArtists.pending,
        createArtist.pending,
        updateArtist.pending,
        updateArtists.pending,
        deleteArtist.pending,
        deleteArtists.pending
      ),
      (state) => {
        state.status = APIStatus.PENDING;
      }
    );
    builder.addMatcher(
      isAnyOf(
        fetchArtists.rejected,
        refetchArtists.rejected,
        createArtist.rejected,
        updateArtist.rejected,
        updateArtists.rejected,
        deleteArtist.rejected,
        deleteArtists.rejected
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
  selectAll: selectAllArtists,
  selectById: selectArtistById,
  selectIds: selectArtistIds,
} = artistsAdapter.getSelectors(selectSlice);
export const { selectStatus, selectPageInfo, selectPage, selectCurrentParams } =
  slice.getSelectors(selectSlice);
export const selectIsAPIPending = (state: RootState) =>
  selectStatus(state) === APIStatus.PENDING;
export const reducer = slice.reducer;
