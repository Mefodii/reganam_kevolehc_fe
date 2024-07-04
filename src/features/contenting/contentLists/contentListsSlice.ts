import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  isAnyOf,
} from '@reduxjs/toolkit';
import {
  getContentListsPure as apiGetContentLists,
  getContentList as apiGetContentList,
  addContentList as apiAddContentList,
  updateContentList as apiUpdateContentList,
  deleteContentList as apiDeleteContentList,
} from '../../../api/api';
import { APIStatus } from '../../../util/constants';
import { name as parentName } from '../constants';
import { RootState } from '../../../store';
import { isAbortError } from '../../../util/functions';

export const name = 'contentLists';
const sliceName = `${parentName}/${name}`;

const contentListsAdapter = createEntityAdapter({
  selectId: (contetList: Model.ContentListPureDM) => contetList.id,
});
const stateFragment: {
  status: APIStatus;
  error?: string;
  details?: Model.ContentListPureDM;
} = {
  status: APIStatus.NONE,
  error: '',
  details: undefined,
};

const initialState = contentListsAdapter.getInitialState(stateFragment);

export const fetchContentLists = createAsyncThunk(
  `${sliceName}/fetchContentLists`,
  async (_, { signal }) => {
    const { data } = await apiGetContentLists(signal);
    return data;
  }
);

export const fetchContentList = createAsyncThunk(
  `${sliceName}/fetchContentList`,
  async (id: number, { signal }) => {
    const { data } = await apiGetContentList(id, signal);
    return data;
  }
);

export const createContentList = createAsyncThunk(
  `${sliceName}/createContentList`,
  async (contentList: Model.ContentListSM, { signal }) => {
    const { data } = await apiAddContentList(contentList, signal);
    return data;
  }
);

export const updateContentList = createAsyncThunk(
  `${sliceName}/updateContentList`,
  async (
    {
      contentList,
      scope,
    }: {
      contentList: Model.ContentListPureDM;
      scope: Redux.Scope;
    },
    { signal }
  ) => {
    const { data } = await apiUpdateContentList(contentList, signal);
    return { data, scope };
  }
);

export const deleteContentList = createAsyncThunk(
  `${sliceName}/deleteContentList`,
  async (contentList: Model.ContentListPureDM, { signal }) => {
    await apiDeleteContentList(contentList.id, signal);
    return contentList;
  }
);

const slice = createSlice({
  name: sliceName,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchContentLists.fulfilled, (state, action) => {
      state.status = APIStatus.OK;
      contentListsAdapter.upsertMany(state, action.payload);
    });
    builder.addCase(fetchContentList.fulfilled, (state, action) => {
      state.status = APIStatus.OK;
      state.details = action.payload;
    });
    builder.addCase(createContentList.fulfilled, (state, action) => {
      state.status = APIStatus.OK;
      contentListsAdapter.addOne(state, action.payload);
    });
    builder.addCase(updateContentList.fulfilled, (state, action) => {
      state.status = APIStatus.OK;
      const { data, scope } = action.payload;
      if (scope === 'LIST') {
        contentListsAdapter.setOne(state, data);
      }
      if (scope === 'DETAILS') {
        state.details = data;
      }
    });
    builder.addCase(deleteContentList.fulfilled, (state, action) => {
      state.status = APIStatus.OK;
      contentListsAdapter.removeOne(state, action.payload.id);
    });
    builder.addMatcher(
      isAnyOf(
        fetchContentLists.pending,
        fetchContentList.pending,
        createContentList.pending,
        updateContentList.pending,
        deleteContentList.pending
      ),
      (state) => {
        state.status = APIStatus.PENDING;
      }
    );
    builder.addMatcher(
      isAnyOf(
        fetchContentLists.rejected,
        fetchContentList.rejected,
        createContentList.rejected,
        updateContentList.rejected,
        deleteContentList.rejected
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
    selectDetails: (state) => state.details,
    selectStatus: (state) => state.status,
  },
});

export const selectSlice = (state: RootState) => state[parentName][name];
export const {
  selectAll: selectAllContentLists,
  selectById: selectContentListById,
  selectIds: selectContentListIds,
} = contentListsAdapter.getSelectors(selectSlice);
export const { selectDetails, selectStatus } = slice.getSelectors(selectSlice);
export const reducer = slice.reducer;
export default slice;
