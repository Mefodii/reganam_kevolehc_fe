import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  isAnyOf,
} from '@reduxjs/toolkit';
import {
  getContentWatchers as apiGetContentWatchers,
  addContentWatcher as apiAddContentWatcher,
  updateContentWatcher as apiUpdateContentWatcher,
  deleteContentWatcher as apiDeleteContentWatcher,
  addContentList as apiAddContentList,
} from '../../../api/api';
import { APIStatus } from '../../../util/constants';
import { name as parentName } from '../constants';

export const name = 'contentWatchers';
const sliceName = `${parentName}/${name}`;

const contentWatchersAdapter = createEntityAdapter({});

const initialState = contentWatchersAdapter.getInitialState({
  status: APIStatus.None,
  error: null,
});

export const fetchContentWatchers = createAsyncThunk(
  `${sliceName}/fetchContentWatchers`,
  async () => {
    const { data } = await apiGetContentWatchers();
    return data;
  }
);

export const createContentWatcher = createAsyncThunk(
  `${sliceName}/createContentWatcher`,
  async (contentWatcher) => {
    // Note: each content watcher is linked with a content list.

    // TODO: maybe its more correct to create this from django in 1 API call
    const { data: contentList } = await apiAddContentList({
      name: contentWatcher.name,
    });

    const { data } = await apiAddContentWatcher({
      ...contentWatcher,
      content_list: contentList.id,
    });

    // TODO: add also in content list
    return {
      contentWatcher: data,
      contentList: { ...contentList, content_watcher: data.id },
    };
  }
);

export const updateContentWatcher = createAsyncThunk(
  `${sliceName}/updateContentWatcher`,
  async (contentWatcher) => {
    const { data } = await apiUpdateContentWatcher(contentWatcher);
    return data;
  }
);

export const deleteContentWatcher = createAsyncThunk(
  `${sliceName}/deleteContentWatcher`,
  async (contentWatcher) => {
    await apiDeleteContentWatcher(contentWatcher.id);
    return contentWatcher;
  }
);

const slice = createSlice({
  name: sliceName,
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchContentWatchers.fulfilled, (state, action) => {
      state.status = APIStatus.Ok;
      contentWatchersAdapter.upsertMany(state, action.payload);
    });
    builder.addCase(createContentWatcher.fulfilled, (state, action) => {
      state.status = APIStatus.Ok;
      contentWatchersAdapter.addOne(state, action.payload.contentWatcher);
    });
    builder.addCase(updateContentWatcher.fulfilled, (state, action) => {
      state.status = APIStatus.Ok;
      contentWatchersAdapter.setOne(state, action.payload);
    });
    builder.addCase(deleteContentWatcher.fulfilled, (state, action) => {
      state.status = APIStatus.Ok;
      contentWatchersAdapter.removeOne(state, action.payload.id);
    });
    builder.addMatcher(
      isAnyOf(
        fetchContentWatchers.pending,
        createContentWatcher.pending,
        updateContentWatcher.pending,
        deleteContentWatcher.pending
      ),
      (state) => {
        state.status = APIStatus.Pending;
      }
    );
    builder.addMatcher(
      isAnyOf(
        fetchContentWatchers.rejected,
        createContentWatcher.rejected,
        updateContentWatcher.rejected,
        deleteContentWatcher.rejected
      ),
      (state, action) => {
        state.status = APIStatus.NotOk;
        state.error = action.error.message;
      }
    );
  },
});

export const selectSlice = (state) => state[parentName][name];
export const {
  selectAll: selectAllContentWatchers,
  selectById: selectContentWatcherById,
  selectIds: selectContentWatcherIds,
} = contentWatchersAdapter.getSelectors(selectSlice);
export const reducer = slice.reducer;
export default slice;
