import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  isAnyOf,
} from '@reduxjs/toolkit';
import {
  getContentWatchers as apiGetContentWatchers,
  getContentWatcher as apiGetContentWatcher,
  addContentWatcher as apiAddContentWatcher,
  updateContentWatcher as apiUpdateContentWatcher,
  deleteContentWatcher as apiDeleteContentWatcher,
} from '../../../api/api';
import { APIStatus } from '../../../util/constants';
import { name as parentName } from '../constants';
import { RootState } from '../../../store';

export const name = 'contentWatchers';
const sliceName = `${parentName}/${name}`;

const contentWatchersAdapter = createEntityAdapter({
  selectId: (contentWatcher: Model.ContentWatcherDM) => contentWatcher.id,
});

const stateFragment: {
  status: APIStatus;
  error?: string;
  details?: Model.ContentWatcherDM;
} = {
  status: APIStatus.NONE,
  error: '',
  details: undefined,
};

const initialState = contentWatchersAdapter.getInitialState(stateFragment);

export const fetchContentWatchers = createAsyncThunk(
  `${sliceName}/fetchContentWatchers`,
  async () => {
    const { data } = await apiGetContentWatchers();
    return data;
  }
);

export const fetchContentWatcher = createAsyncThunk(
  `${sliceName}/fetchContentWatcher`,
  async (id: number) => {
    const { data } = await apiGetContentWatcher(id);
    return data;
  }
);

export const createContentWatcher = createAsyncThunk(
  `${sliceName}/createContentWatcher`,
  async (contentWatcher: Model.ContentWatcherAM) => {
    // Note: each content watcher is linked with a content list.
    const { data } = await apiAddContentWatcher(contentWatcher);
    return data;
  }
);

export const updateContentWatcher = createAsyncThunk(
  `${sliceName}/updateContentWatcher`,
  async ({
    contentWatcher,
    scope,
  }: {
    contentWatcher: Model.ContentWatcherDM;
    scope: Redux.Scope;
  }) => {
    const { data } = await apiUpdateContentWatcher(contentWatcher);
    return { data, scope };
  }
);

export const deleteContentWatcher = createAsyncThunk(
  `${sliceName}/deleteContentWatcher`,
  async (contentWatcher: Model.ContentWatcherDM) => {
    await apiDeleteContentWatcher(contentWatcher.id);
    return contentWatcher;
  }
);

const slice = createSlice({
  name: sliceName,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchContentWatchers.fulfilled, (state, action) => {
      state.status = APIStatus.OK;
      contentWatchersAdapter.upsertMany(state, action.payload);
    });
    builder.addCase(fetchContentWatcher.fulfilled, (state, action) => {
      state.status = APIStatus.OK;
      state.details = action.payload;
    });
    builder.addCase(createContentWatcher.fulfilled, (state, action) => {
      state.status = APIStatus.OK;
      contentWatchersAdapter.addOne(state, action.payload);
    });
    builder.addCase(updateContentWatcher.fulfilled, (state, action) => {
      state.status = APIStatus.OK;
      const { data, scope } = action.payload;
      if (scope === 'LIST') {
        contentWatchersAdapter.setOne(state, data);
      }
      if (scope === 'DETAILS') {
        state.details = data;
      }
    });
    builder.addCase(deleteContentWatcher.fulfilled, (state, action) => {
      state.status = APIStatus.OK;
      contentWatchersAdapter.removeOne(state, action.payload.id);
    });
    builder.addMatcher(
      isAnyOf(
        fetchContentWatchers.pending,
        fetchContentWatcher.pending,
        createContentWatcher.pending,
        updateContentWatcher.pending,
        deleteContentWatcher.pending
      ),
      (state) => {
        state.status = APIStatus.PENDING;
      }
    );
    builder.addMatcher(
      isAnyOf(
        fetchContentWatchers.rejected,
        fetchContentWatcher.rejected,
        createContentWatcher.rejected,
        updateContentWatcher.rejected,
        deleteContentWatcher.rejected
      ),
      (state, action) => {
        state.status = APIStatus.NOT_OK;
        state.error = action.error.message;
      }
    );
  },
  selectors: {
    selectDetails: (state) => state.details,
    selectStatus: (state) => state.status,
  },
});

export const selectSlice = (state: RootState) => state[parentName][name];
export const {
  selectAll: selectAllContentWatchers,
  selectById: selectContentWatcherById,
  selectIds: selectContentWatcherIds,
} = contentWatchersAdapter.getSelectors(selectSlice);
export const { selectDetails, selectStatus } = slice.getSelectors(selectSlice);
export const reducer = slice.reducer;
export default slice;
