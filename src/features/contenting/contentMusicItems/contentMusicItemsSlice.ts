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
  updateContentMusicItems as apiUpdateContentMusicItems,
  deleteContentMusicItem as apiDeleteContentMusicItem,
  deleteContentMusicItems as apiDeleteContentMusicItems,
} from '../../../api/api';
import { APIStatus } from '../../../util/constants';
import { name as parentName } from '../constants';
import { AppThunkApiConfig, RootState } from '../../../store';
import { compareByKey, isAbortError } from '../../../util/functions';

export const name = 'contentMusicItems';
const sliceName = `${parentName}/${name}`;

const contentMusicItemsAdapter = createEntityAdapter({
  selectId: (contentMusicItem: Model.ContentMusicItemDM) => contentMusicItem.id,
  sortComparer: compareByKey('position'),
});

const stateFragment: {
  status: APIStatus;
  error?: string;
  pageInfo?: PageInfo<QParams.ContentMusicItem>;
} = {
  status: APIStatus.NONE,
  error: '',
  pageInfo: undefined,
};

const initialState = contentMusicItemsAdapter.getInitialState(stateFragment);

export const fetchContentMusicItems = createAsyncThunk<
  Axios.PagedResult<Model.ContentMusicItemDM, QParams.ContentMusicItem>,
  QParams.ContentMusicItem
>(`${sliceName}/fetchContentMusicItems`, async (params, { signal }) => {
  const { data } = await apiGetContentMusicItems(params, signal);
  return data;
});

export const refetchContentMusicItems = createAsyncThunk<
  Axios.PagedResult<Model.ContentMusicItemDM, QParams.ContentMusicItem>,
  void,
  AppThunkApiConfig
>(`${sliceName}/refetchContentMusicItems`, async (_, { getState, signal }) => {
  const params = selectCurrentParams(getState());
  if (!params) {
    throw new Error(`params missing on refetchContentItems`);
  }
  const { data } = await apiGetContentMusicItems(params, signal);
  return data;
});

export const createContentMusicItem = createAsyncThunk<
  void,
  Model.ContentMusicItemAM,
  AppThunkApiConfig
>(
  `${sliceName}/createContentMusicItem`,
  async (contentMusicItem, { dispatch, signal }) => {
    await apiAddContentMusicItem(contentMusicItem, signal);
    // TODO: (L): propagate abort on the dispatched thunks
    dispatch(refetchContentMusicItems());
  }
);

export const updateContentMusicItem = createAsyncThunk<
  void,
  Model.ContentMusicItemDM,
  AppThunkApiConfig
>(
  `${sliceName}/updateContentMusicItem`,
  async (contentMusicItem, { dispatch, signal }) => {
    await apiUpdateContentMusicItem(contentMusicItem, signal);
    dispatch(refetchContentMusicItems());
  }
);

export const updateContentMusicItems = createAsyncThunk<
  void,
  Model.ContentMusicItemDM[],
  AppThunkApiConfig
>(
  `${sliceName}/updateContentMusicItems`,
  async (contentMusicItems, { dispatch, signal }) => {
    await apiUpdateContentMusicItems(contentMusicItems, signal);
    dispatch(refetchContentMusicItems());
  }
);

export const deleteContentMusicItem = createAsyncThunk<
  void,
  Model.ContentMusicItemDM,
  AppThunkApiConfig
>(
  `${sliceName}/deleteContentMusicItem`,
  async (contentMusicItem, { dispatch, signal }) => {
    await apiDeleteContentMusicItem(contentMusicItem.id, signal);
    dispatch(refetchContentMusicItems());
  }
);

export const deleteContentMusicItems = createAsyncThunk<
  void,
  Model.ContentMusicItemDM[],
  AppThunkApiConfig
>(
  `${sliceName}/deleteContentMusicItem`,
  async (contentMusicItems, { dispatch, signal }) => {
    await apiDeleteContentMusicItems(
      contentMusicItems.map((item) => item.id),
      signal
    );
    dispatch(refetchContentMusicItems());
  }
);

const slice = createSlice({
  name: sliceName,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchContentMusicItems.fulfilled, (state, action) => {
      state.status = APIStatus.OK;
      const { results, ...pageInfo } = action.payload;

      state.pageInfo = pageInfo;
      contentMusicItemsAdapter.removeAll(state);
      contentMusicItemsAdapter.upsertMany(state, results);
    });
    builder.addCase(refetchContentMusicItems.fulfilled, (state, action) => {
      state.status = APIStatus.OK;
      const { results } = action.payload;

      contentMusicItemsAdapter.removeAll(state);
      contentMusicItemsAdapter.upsertMany(state, results);
    });
    builder.addMatcher(
      isAnyOf(
        fetchContentMusicItems.pending,
        refetchContentMusicItems.pending,
        createContentMusicItem.pending,
        updateContentMusicItem.pending,
        updateContentMusicItems.pending,
        deleteContentMusicItem.pending,
        deleteContentMusicItems.pending
      ),
      (state) => {
        state.status = APIStatus.PENDING;
      }
    );
    builder.addMatcher(
      isAnyOf(
        fetchContentMusicItems.rejected,
        refetchContentMusicItems.rejected,
        createContentMusicItem.rejected,
        updateContentMusicItem.rejected,
        updateContentMusicItems.rejected,
        deleteContentMusicItem.rejected,
        deleteContentMusicItems.rejected
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
  selectAll: selectAllContentMusicItems,
  selectById: selectContentMusicItemById,
  selectIds: selectContentMusicItemIds,
} = contentMusicItemsAdapter.getSelectors(selectSlice);
export const { selectStatus, selectPageInfo, selectPage, selectCurrentParams } =
  slice.getSelectors(selectSlice);
export const selectIsAPIPending = (state: RootState) =>
  selectStatus(state) === APIStatus.PENDING;
export const reducer = slice.reducer;
export default slice;
