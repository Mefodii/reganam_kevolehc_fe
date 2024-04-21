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
});

const getSliceState = (state) => state[parentName][name];

export const selectContentItemPartStatusTypes = (state) =>
  getSliceState(state).contentItemPartStatusTypes;

export const selectDownloadStatusTypes = (state) =>
  getSliceState(state).downloadStatusTypes;

export const selectContentItemTypes = (state) =>
  getSliceState(state).contentItemTypes;

export const selecctFileExtensionTypes = (state) =>
  getSliceState(state).fileExtensionTypes;

export const selectContentWatcherSourceTypes = (state) =>
  getSliceState(state).contentWatcherSourceTypes;

export const selectContentWatcherStatusTypes = (state) =>
  getSliceState(state).contentWatcherStatusTypes;

export const selectStatus = (state) => getSliceState(state).status;

export default slice;
