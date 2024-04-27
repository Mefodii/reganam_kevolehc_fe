import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  isAnyOf,
} from '@reduxjs/toolkit';
import {
  getContentItemParts as apiGetContentItemParts,
  addContentItemPart as apiAddContentItemPart,
  updateContentItemPart as apiUpdateContentItemPart,
  deleteContentItemPart as apiDeleteContentItemPart,
} from '../../../api/api';
import { APIStatus } from '../../../util/constants';
import { name as parentName } from '../constants';

export const name = 'contentItemParts';
const sliceName = `${parentName}/${name}`;

const contentItemPartsAdapter = createEntityAdapter({});

const initialState = contentItemPartsAdapter.getInitialState({
  status: APIStatus.None,
  error: null,
});

export const fetchContentItemParts = createAsyncThunk(
  `${sliceName}/fetchContentItemParts`,
  async () => {
    const { data } = await apiGetContentItemParts();
    return data;
  }
);

export const createContentItemPart = createAsyncThunk(
  `${sliceName}/createContentItemPart`,
  async (contentItemPart) => {
    const { data } = await apiAddContentItemPart(contentItemPart);
    return data;
  }
);

export const updateContentItemPart = createAsyncThunk(
  `${sliceName}/updateContentItemPart`,
  async (contentItemPart) => {
    const { data } = await apiUpdateContentItemPart(contentItemPart);
    return data;
  }
);

export const deleteContentItemPart = createAsyncThunk(
  `${sliceName}/deleteContentItemPart`,
  async (contentItemPart) => {
    await apiDeleteContentItemPart(contentItemPart.id);
    return contentItemPart;
  }
);

const slice = createSlice({
  name: sliceName,
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchContentItemParts.fulfilled, (state, action) => {
      state.status = APIStatus.Ok;
      contentItemPartsAdapter.upsertMany(state, action.payload);
    });
    builder.addCase(createContentItemPart.fulfilled, (state, action) => {
      state.status = APIStatus.Ok;
      contentItemPartsAdapter.addOne(state, action.payload);
    });
    builder.addCase(updateContentItemPart.fulfilled, (state, action) => {
      state.status = APIStatus.Ok;
      contentItemPartsAdapter.setOne(state, action.payload);
    });
    builder.addCase(deleteContentItemPart.fulfilled, (state, action) => {
      state.status = APIStatus.Ok;
      contentItemPartsAdapter.removeOne(state, action.payload.id);
    });
    builder.addMatcher(
      isAnyOf(
        fetchContentItemParts.pending,
        createContentItemPart.pending,
        updateContentItemPart.pending,
        deleteContentItemPart.pending
      ),
      (state) => {
        state.status = APIStatus.Pending;
      }
    );
    builder.addMatcher(
      isAnyOf(
        fetchContentItemParts.rejected,
        createContentItemPart.rejected,
        updateContentItemPart.rejected,
        deleteContentItemPart.rejected
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
  selectAll: selectAllContentItemParts,
  selectById: selectContentItemPartById,
  selectIds: selectContentItemPartIds,
} = contentItemPartsAdapter.getSelectors(selectSlice);
export const reducer = slice.reducer;
export default slice;
