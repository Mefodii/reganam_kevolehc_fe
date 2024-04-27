import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  isAnyOf,
} from '@reduxjs/toolkit';
import {
  getContentItems as apiGetContentItems,
  addContentItem as apiAddContentItem,
  updateContentItem as apiUpdateContentItem,
  deleteContentItem as apiDeleteContentItem,
} from '../../../api/api';
import { APIStatus } from '../../../util/constants';
import { name as parentName } from '../constants';

export const name = 'contentItems';
const sliceName = `${parentName}/${name}`;

const contentItemsAdapter = createEntityAdapter({});

const initialState = contentItemsAdapter.getInitialState({
  status: APIStatus.None,
  error: null,
});

export const fetchContentItems = createAsyncThunk(
  `${sliceName}/fetchContentItems`,
  async () => {
    const { data } = await apiGetContentItems();
    return data;
  }
);

export const createContentItem = createAsyncThunk(
  `${sliceName}/createContentItem`,
  async (contentItem) => {
    const { data } = await apiAddContentItem(contentItem);
    return data;
  }
);

export const updateContentItem = createAsyncThunk(
  `${sliceName}/updateContentItem`,
  async (contentItem) => {
    const { data } = await apiUpdateContentItem(contentItem);
    return data;
  }
);

export const deleteContentItem = createAsyncThunk(
  `${sliceName}/deleteContentItem`,
  async (contentItem) => {
    await apiDeleteContentItem(contentItem.id);
    return contentItem;
  }
);

const slice = createSlice({
  name: sliceName,
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchContentItems.fulfilled, (state, action) => {
      state.status = APIStatus.Ok;
      contentItemsAdapter.upsertMany(state, action.payload);
    });
    builder.addCase(createContentItem.fulfilled, (state, action) => {
      state.status = APIStatus.Ok;
      contentItemsAdapter.addOne(state, action.payload);
    });
    builder.addCase(updateContentItem.fulfilled, (state, action) => {
      state.status = APIStatus.Ok;
      contentItemsAdapter.setOne(state, action.payload);
    });
    builder.addCase(deleteContentItem.fulfilled, (state, action) => {
      state.status = APIStatus.Ok;
      contentItemsAdapter.removeOne(state, action.payload.id);
    });
    builder.addMatcher(
      isAnyOf(
        fetchContentItems.pending,
        createContentItem.pending,
        updateContentItem.pending,
        deleteContentItem.pending
      ),
      (state) => {
        state.status = APIStatus.Pending;
      }
    );
    builder.addMatcher(
      isAnyOf(
        fetchContentItems.rejected,
        createContentItem.rejected,
        updateContentItem.rejected,
        deleteContentItem.rejected
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
  selectAll: selectAllContentItems,
  selectById: selectContentItemById,
  selectIds: selectContentItemIds,
} = contentItemsAdapter.getSelectors(selectSlice);
export const reducer = slice.reducer;
export default slice;
