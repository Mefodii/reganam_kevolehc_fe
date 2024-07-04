import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  isAnyOf,
} from '@reduxjs/toolkit';
import {
  getContentTracks as apiGetContentTracks,
  addContentTrack as apiAddContentTrack,
  updateContentTrack as apiUpdateContentTrack,
  deleteContentTrack as apiDeleteContentTrack,
} from '../../../api/api';
import { APIStatus } from '../../../util/constants';
import { name as parentName } from '../constants';
import { RootState } from '../../../store';
import { isAbortError } from '../../../util/functions';

export const name = 'contentTracks';
const sliceName = `${parentName}/${name}`;

const contentTracksAdapter = createEntityAdapter({
  selectId: (contentTrack: Model.ContentTrackDM) => contentTrack.id,
});

const stateFragment: {
  status: APIStatus;
  error?: string;
} = {
  status: APIStatus.NONE,
  error: '',
};

const initialState = contentTracksAdapter.getInitialState(stateFragment);

export const fetchContentTracks = createAsyncThunk(
  `${sliceName}/fetchContentTracks`,
  async (_, { signal }) => {
    const { data } = await apiGetContentTracks(signal);
    return data;
  }
);

export const createContentTrack = createAsyncThunk(
  `${sliceName}/createContentTrack`,
  async (contentTrack: Model.ContentTrackSM, { signal }) => {
    const { data } = await apiAddContentTrack(contentTrack, signal);
    return data;
  }
);

export const updateContentTrack = createAsyncThunk(
  `${sliceName}/updateContentTrack`,
  async (contentTrack: Model.ContentTrackDM, { signal }) => {
    const { data } = await apiUpdateContentTrack(contentTrack, signal);
    return data;
  }
);

export const deleteContentTrack = createAsyncThunk(
  `${sliceName}/deleteContentTrack`,
  async (contentTrack: Model.ContentTrackDM, { signal }) => {
    await apiDeleteContentTrack(contentTrack.id, signal);
    return contentTrack;
  }
);

const slice = createSlice({
  name: sliceName,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchContentTracks.fulfilled, (state, action) => {
      state.status = APIStatus.OK;
      contentTracksAdapter.upsertMany(state, action.payload);
    });
    builder.addCase(createContentTrack.fulfilled, (state, action) => {
      state.status = APIStatus.OK;
      contentTracksAdapter.addOne(state, action.payload);
    });
    builder.addCase(updateContentTrack.fulfilled, (state, action) => {
      state.status = APIStatus.OK;
      contentTracksAdapter.setOne(state, action.payload);
    });
    builder.addCase(deleteContentTrack.fulfilled, (state, action) => {
      state.status = APIStatus.OK;
      contentTracksAdapter.removeOne(state, action.payload.id);
    });
    builder.addMatcher(
      isAnyOf(
        fetchContentTracks.pending,
        createContentTrack.pending,
        updateContentTrack.pending,
        deleteContentTrack.pending
      ),
      (state) => {
        state.status = APIStatus.PENDING;
      }
    );
    builder.addMatcher(
      isAnyOf(
        fetchContentTracks.rejected,
        createContentTrack.rejected,
        updateContentTrack.rejected,
        deleteContentTrack.rejected
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
});

export const selectSlice = (state: RootState) => state[parentName][name];
export const {
  selectAll: selectAllContentTracks,
  selectById: selectContentTrackById,
  selectIds: selectContentTrackIds,
} = contentTracksAdapter.getSelectors(selectSlice);
export const reducer = slice.reducer;
export default slice;
