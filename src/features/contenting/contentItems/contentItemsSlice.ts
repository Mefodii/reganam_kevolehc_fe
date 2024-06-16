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
  updateContentItems as apiUpdateContentItems,
  deleteContentItem as apiDeleteContentItem,
  deleteContentItems as apiDeleteContentItems,
} from '../../../api/api';
import { APIStatus } from '../../../util/constants';
import { name as parentName } from '../constants';
import { RootState } from '../../../store';
import { compareByKey } from '../../../util/functions';

export const name = 'contentItems';
const sliceName = `${parentName}/${name}`;

const contentItemsAdapter = createEntityAdapter({
  selectId: (contentItem: Model.ContentItemDM) => contentItem.id,
  sortComparer: compareByKey('position'),
});

const stateFragment: {
  status: APIStatus;
  error?: string;
} = {
  status: APIStatus.NONE,
  error: '',
};

const initialState = contentItemsAdapter.getInitialState(stateFragment);

export const fetchContentItems = createAsyncThunk(
  `${sliceName}/fetchContentItems`,
  async (contentList: number) => {
    const { data } = await apiGetContentItems(contentList);
    return data;
  }
);

export const createContentItem = createAsyncThunk(
  `${sliceName}/createContentItem`,
  async (contentItem: Model.ContentItemAM) => {
    const res = await apiAddContentItem(contentItem);

    const { data } = await apiGetContentItems(res.data.content_list);
    return data;
  }
);

export const updateContentItem = createAsyncThunk(
  `${sliceName}/updateContentItem`,
  async (contentItem: Model.ContentItemDM) => {
    await apiUpdateContentItem(contentItem);

    const { data } = await apiGetContentItems(contentItem.content_list);
    return data;
  }
);

export const updateContentItems = createAsyncThunk(
  `${sliceName}/updateContentItems`,
  async (contentItems: Model.ContentItemDM[]) => {
    await apiUpdateContentItems(contentItems);

    const { data } = await apiGetContentItems(contentItems[0].content_list);
    return data;
  }
);

export const deleteContentItem = createAsyncThunk(
  `${sliceName}/deleteContentItem`,
  async (contentItem: Model.ContentItemDM) => {
    await apiDeleteContentItem(contentItem.id);

    const { data } = await apiGetContentItems(contentItem.content_list);
    return data;
  }
);

export const deleteContentItems = createAsyncThunk(
  `${sliceName}/deleteContentItems`,
  async (contentItems: Model.ContentItemDM[]) => {
    await apiDeleteContentItems(
      contentItems.map((contentItem) => contentItem.id)
    );

    const { data } = await apiGetContentItems(contentItems[0].content_list);
    return data;
  }
);

const slice = createSlice({
  name: sliceName,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(
        fetchContentItems.fulfilled,
        createContentItem.fulfilled,
        updateContentItem.fulfilled,
        updateContentItems.fulfilled,
        deleteContentItem.fulfilled,
        deleteContentItems.fulfilled
      ),
      (state, action) => {
        state.status = APIStatus.OK;
        contentItemsAdapter.removeAll(state);
        contentItemsAdapter.upsertMany(state, action.payload);
      }
    );
    builder.addMatcher(
      isAnyOf(
        fetchContentItems.pending,
        createContentItem.pending,
        updateContentItem.pending,
        updateContentItems.pending,
        deleteContentItem.pending,
        deleteContentItems.pending
      ),
      (state) => {
        state.status = APIStatus.PENDING;
      }
    );
    builder.addMatcher(
      isAnyOf(
        fetchContentItems.rejected,
        createContentItem.rejected,
        updateContentItem.rejected,
        updateContentItems.rejected,
        deleteContentItem.rejected,
        deleteContentItems.rejected
      ),
      (state, action) => {
        state.status = APIStatus.NOT_OK;
        state.error = action.error.message;
      }
    );
  },
  selectors: {
    selectStatus: (state) => state.status,
  },
});

export const selectSlice = (state: RootState) => state[parentName][name];
export const {
  selectAll: selectAllContentItems,
  selectById: selectContentItemById,
  selectIds: selectContentItemIds,
} = contentItemsAdapter.getSelectors(selectSlice);
export const { selectStatus } = slice.getSelectors(selectSlice);
export const isAPIPending = (state: RootState) =>
  selectStatus(state) === APIStatus.PENDING;

export const reducer = slice.reducer;
export default slice;
