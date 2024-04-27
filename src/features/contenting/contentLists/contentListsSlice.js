import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  isAnyOf,
} from '@reduxjs/toolkit';
import {
  getContentLists as apiGetContentLists,
  addContentList as apiAddContentList,
  updateContentList as apiUpdateContentList,
  deleteContentList as apiDeleteContentList,
} from '../../../api/api';
import { APIStatus } from '../../../util/constants';
import { name as parentName } from '../constants';

export const name = 'contentLists';
const sliceName = `${parentName}/${name}`;

const contentListsAdapter = createEntityAdapter({});

const initialState = contentListsAdapter.getInitialState({
  status: APIStatus.None,
  error: null,
});

export const fetchContentLists = createAsyncThunk(
  `${sliceName}/fetchContentLists`,
  async () => {
    const { data } = await apiGetContentLists();
    return data;
  }
);

export const createContentList = createAsyncThunk(
  `${sliceName}/createContentList`,
  async (contentList) => {
    const { data } = await apiAddContentList(contentList);
    return data;
  }
);

export const updateContentList = createAsyncThunk(
  `${sliceName}/updateContentList`,
  async (contentList) => {
    const { data } = await apiUpdateContentList(contentList);
    return data;
  }
);

export const deleteContentList = createAsyncThunk(
  `${sliceName}/deleteContentList`,
  async (contentList) => {
    await apiDeleteContentList(contentList.id);
    return contentList;
  }
);

const slice = createSlice({
  name: sliceName,
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchContentLists.fulfilled, (state, action) => {
      state.status = APIStatus.Ok;
      contentListsAdapter.upsertMany(state, action.payload);
    });
    builder.addCase(createContentList.fulfilled, (state, action) => {
      state.status = APIStatus.Ok;
      contentListsAdapter.addOne(state, action.payload);
    });
    builder.addCase(updateContentList.fulfilled, (state, action) => {
      state.status = APIStatus.Ok;
      contentListsAdapter.setOne(state, action.payload);
    });
    builder.addCase(deleteContentList.fulfilled, (state, action) => {
      state.status = APIStatus.Ok;
      contentListsAdapter.removeOne(state, action.payload.id);
    });
    builder.addMatcher(
      isAnyOf(
        fetchContentLists.pending,
        createContentList.pending,
        updateContentList.pending,
        deleteContentList.pending
      ),
      (state) => {
        state.status = APIStatus.Pending;
      }
    );
    builder.addMatcher(
      isAnyOf(
        fetchContentLists.rejected,
        createContentList.rejected,
        updateContentList.rejected,
        deleteContentList.rejected
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
  selectAll: selectAllContentLists,
  selectById: selectContentListById,
  selectIds: selectContentListIds,
} = contentListsAdapter.getSelectors(selectSlice);
export const reducer = slice.reducer;
export default slice;
