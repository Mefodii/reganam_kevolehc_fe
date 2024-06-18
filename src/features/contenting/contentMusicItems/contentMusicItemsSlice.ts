import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  isAnyOf,
} from '@reduxjs/toolkit';
import {
  getContentMusicItems as apiGetContentMusicItems,
  addContentMusicItem as apiAddContentMusicItem,
  updateContentMusicItem as apiUpdateContentMusicItem,
  deleteContentMusicItem as apiDeleteContentMusicItem,
} from '../../../api/api';
import { APIStatus } from '../../../util/constants';
import { name as parentName } from '../constants';
import { RootState } from '../../../store';
import { compareByKey } from '../../../util/functions';

export const name = 'contentMusicItems';
const sliceName = `${parentName}/${name}`;

const contentMusicItemsAdapter = createEntityAdapter({
  selectId: (contentMusicItem: Model.ContentMusicItemDM) => contentMusicItem.id,
  sortComparer: compareByKey('position'),
});

const stateFragment: {
  status: APIStatus;
  error?: string;
} = {
  status: APIStatus.NONE,
  error: '',
};

const initialState = contentMusicItemsAdapter.getInitialState(stateFragment);

export const fetchContentMusicItems = createAsyncThunk(
  `${sliceName}/fetchContentMusicItems`,
  async (contentList: number) => {
    const { data } = await apiGetContentMusicItems(contentList);
    return data;
  }
);

export const createContentMusicItem = createAsyncThunk(
  `${sliceName}/createContentMusicItem`,
  async (contentMusicItem: Model.ContentMusicItemAM) => {
    const res = await apiAddContentMusicItem(contentMusicItem);

    const { data } = await apiGetContentMusicItems(res.data.content_list);
    return data;
  }
);

export const updateContentMusicItem = createAsyncThunk(
  `${sliceName}/updateContentMusicItem`,
  async (contentMusicItem: Model.ContentMusicItemDM) => {
    await apiUpdateContentMusicItem(contentMusicItem);

    const { data } = await apiGetContentMusicItems(
      contentMusicItem.content_list
    );
    return data;
  }
);

export const deleteContentMusicItem = createAsyncThunk(
  `${sliceName}/deleteContentMusicItem`,
  async (contentMusicItem: Model.ContentMusicItemDM) => {
    await apiDeleteContentMusicItem(contentMusicItem.id);

    const { data } = await apiGetContentMusicItems(
      contentMusicItem.content_list
    );
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
        fetchContentMusicItems.fulfilled,
        createContentMusicItem.fulfilled,
        updateContentMusicItem.fulfilled,
        deleteContentMusicItem.fulfilled
      ),
      (state, action) => {
        state.status = APIStatus.OK;
        contentMusicItemsAdapter.upsertMany(state, action.payload);
      }
    );
    builder.addMatcher(
      isAnyOf(
        fetchContentMusicItems.pending,
        createContentMusicItem.pending,
        updateContentMusicItem.pending,
        deleteContentMusicItem.pending
      ),
      (state) => {
        state.status = APIStatus.PENDING;
      }
    );
    builder.addMatcher(
      isAnyOf(
        fetchContentMusicItems.rejected,
        createContentMusicItem.rejected,
        updateContentMusicItem.rejected,
        deleteContentMusicItem.rejected
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
  selectAll: selectAllContentMusicItems,
  selectById: selectContentMusicItemById,
  selectIds: selectContentMusicItemIds,
} = contentMusicItemsAdapter.getSelectors(selectSlice);
export const { selectStatus } = slice.getSelectors(selectSlice);
export const selectIsAPIPending = (state: RootState) =>
  selectStatus(state) === APIStatus.PENDING;
export const reducer = slice.reducer;
export default slice;
