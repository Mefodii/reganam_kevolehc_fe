import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getContentingInfo } from '../../../api/api';
import { APIStatus } from '../../../util/constants';
import { name as parentName } from '../constants';

export const name = 'info';
const sliceName = `${parentName}/${name}`;

const initialState = {
  status: APIStatus.None,
  error: null,
  contentItemPartStatusTypes: [],
  downloadStatusTypes: [],
  contentItemTypes: [],
  fileExtensionTypes: [],
  contentWatcherSourceTypes: [],
  contentWatcherStatusTypes: [],
};

export const fetchInfo = createAsyncThunk(
  `${sliceName}/fetchInfo`,
  async () => {
    const response = await getContentingInfo();
    return response.data;
  }
);

const slice = createSlice({
  name: sliceName,
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchInfo.pending, (state) => {
        state.status = APIStatus.Pending;
      })
      .addCase(fetchInfo.fulfilled, (state, action) => {
        return { ...state, status: APIStatus.Ok, ...action.payload };
      })
      .addCase(fetchInfo.rejected, (state, action) => {
        state.status = APIStatus.NotOk;
        state.error = action.error.message;
      });
  },
  selectors: {
    selectContentItemPartStatusTypes: (state) =>
      state.contentItemPartStatusTypes,
    selectDownloadStatusTypes: (state) => state.downloadStatusTypes,
    selectContentItemTypes: (state) => state.contentItemTypes,
    selectFileExtensionTypes: (state) => state.fileExtensionTypes,
    selectContentWatcherSourceTypes: (state) => state.contentWatcherSourceTypes,
    selectContentWatcherStatusTypes: (state) => state.contentWatcherStatusTypes,
    selectStatus: (state) => state.status,
  },
});

const selectSlice = (state) => state[parentName][name];

export const {
  selectContentItemPartStatusTypes,
  selectDownloadStatusTypes,
  selectContentItemTypes,
  selectFileExtensionTypes,
  selectContentWatcherSourceTypes,
  selectContentWatcherStatusTypes,
  selectStatus,
} = slice.getSelectors(selectSlice);
export const reducer = slice.reducer;
export default slice;
