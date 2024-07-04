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
import { AppThunkApiConfig, RootState } from '../../../store';
import { compareByKey, isAbortError } from '../../../util/functions';

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
  Axios.PagedResult<Model.ContentItemDM, QParams.ContentItem>,
  QParams.ContentItem
>(`${sliceName}/fetchContentItems`, async (params, { signal }) => {
  const { data } = await apiGetContentItems(params, signal);
  return data;
});

export const refetchContentItems = createAsyncThunk<
  Axios.PagedResult<Model.ContentItemDM, QParams.ContentItem>,
  void,
  AppThunkApiConfig
>(`${sliceName}/refetchContentItems`, async (_, { getState, signal }) => {
  const params = selectCurrentParams(getState());
  if (!params) {
    throw new Error(`params missing on refetchContentItems`);
  }
  const { data } = await apiGetContentItems(params, signal);
  return data;
});

export const createContentItem = createAsyncThunk<
  void,
  Model.ContentItemSM,
  AppThunkApiConfig
>(
  `${sliceName}/createContentItem`,
  async (contentItem, { dispatch, signal }) => {
    await apiAddContentItem(contentItem, signal);
    dispatch(refetchContentItems());
  }
);

export const updateContentItem = createAsyncThunk<
  void,
  Model.ContentItemDM,
  AppThunkApiConfig
>(
  `${sliceName}/updateContentItem`,
  async (contentItem, { dispatch, signal }) => {
    await apiUpdateContentItem(contentItem, signal);
    dispatch(refetchContentItems());
  }
);

export const updateContentItems = createAsyncThunk<
  void,
  Model.ContentItemDM[],
  AppThunkApiConfig
>(
  `${sliceName}/updateContentItems`,
  async (contentItems, { dispatch, signal }) => {
    await apiUpdateContentItems(contentItems, signal);
    dispatch(refetchContentItems());
  }
);

export const deleteContentItem = createAsyncThunk<
  void,
  Model.ContentItemDM,
  AppThunkApiConfig
>(
  `${sliceName}/deleteContentItem`,
  async (contentItem, { dispatch, signal }) => {
    await apiDeleteContentItem(contentItem.id, signal);
    dispatch(refetchContentItems());
  }
);

export const deleteContentItems = createAsyncThunk<
  void,
  Model.ContentItemDM[],
  AppThunkApiConfig
>(
  `${sliceName}/deleteContentItems`,
  async (contentItems, { dispatch, signal }) => {
    await apiDeleteContentItems(
      contentItems.map((contentItem) => contentItem.id),
      signal
    );
    dispatch(refetchContentItems());
  }
);

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
