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
  pageInfo?: PageInfo<QParams.ContentItem>;
} = {
  status: APIStatus.NONE,
  error: '',
  pageInfo: undefined,
};

const initialState = contentItemsAdapter.getInitialState(stateFragment);

export const fetchContentItems = createAsyncThunk<
  AxiosPageResult<Model.ContentItemDM, QParams.ContentItem>,
  QParams.ContentItem,
  { state: RootState }
>(`${sliceName}/fetchContentItems`, async (params) => {
  const { data } = await apiGetContentItems(params);
  return data;
});

export const refetchContentItems = createAsyncThunk<
  AxiosPageResult<Model.ContentItemDM, QParams.ContentItem>,
  void,
  { state: RootState }
>(`${sliceName}/refetchContentItems`, async (_, { getState }) => {
  const params = selectCurrentParams(getState());
  if (!params) {
    throw new Error(`params missing on refetchContentItems`);
  }
  const { data } = await apiGetContentItems(params);
  return data;
});

export const createContentItem = createAsyncThunk<
  void,
  Model.ContentItemAM,
  { state: RootState }
>(`${sliceName}/createContentItem`, async (contentItem, { dispatch }) => {
  await apiAddContentItem(contentItem);
  dispatch(refetchContentItems());
});

export const updateContentItem = createAsyncThunk<
  void,
  Model.ContentItemDM,
  { state: RootState }
>(`${sliceName}/updateContentItem`, async (contentItem, { dispatch }) => {
  await apiUpdateContentItem(contentItem);
  dispatch(refetchContentItems());
});

export const updateContentItems = createAsyncThunk<
  void,
  Model.ContentItemDM[],
  { state: RootState }
>(`${sliceName}/updateContentItems`, async (contentItems, { dispatch }) => {
  await apiUpdateContentItems(contentItems);
  dispatch(refetchContentItems());
});

export const deleteContentItem = createAsyncThunk<
  void,
  Model.ContentItemDM,
  { state: RootState }
>(`${sliceName}/deleteContentItem`, async (contentItem, { dispatch }) => {
  await apiDeleteContentItem(contentItem.id);
  dispatch(refetchContentItems());
});

export const deleteContentItems = createAsyncThunk<
  void,
  Model.ContentItemDM[],
  { state: RootState }
>(`${sliceName}/deleteContentItems`, async (contentItems, { dispatch }) => {
  await apiDeleteContentItems(
    contentItems.map((contentItem) => contentItem.id)
  );
  dispatch(refetchContentItems());
});

const slice = createSlice({
  name: sliceName,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchContentItems.fulfilled, (state, action) => {
      state.status = APIStatus.OK;
      const { results, ...pageInfo } = action.payload;

      state.pageInfo = pageInfo;
      contentItemsAdapter.removeAll(state);
      contentItemsAdapter.upsertMany(state, results);
    });
    builder.addCase(refetchContentItems.fulfilled, (state, action) => {
      state.status = APIStatus.OK;
      const { results } = action.payload;

      contentItemsAdapter.removeAll(state);
      contentItemsAdapter.upsertMany(state, results);
    });
    builder.addMatcher(
      isAnyOf(
        fetchContentItems.pending,
        refetchContentItems.pending,
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
        refetchContentItems.rejected,
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
    selectPageInfo: (state) => state.pageInfo,
    selectPage: (state) => state.pageInfo?.page,
    selectCurrentParams: (state) => state.pageInfo?.currentParams,
  },
});

export const selectSlice = (state: RootState) => state[parentName][name];
export const {
  selectAll: selectAllContentItems,
  selectById: selectContentItemById,
  selectIds: selectContentItemIds,
} = contentItemsAdapter.getSelectors(selectSlice);
export const { selectStatus, selectPageInfo, selectPage, selectCurrentParams } =
  slice.getSelectors(selectSlice);
export const selectIsAPIPending = (state: RootState) =>
  selectStatus(state) === APIStatus.PENDING;

export const reducer = slice.reducer;
export default slice;
