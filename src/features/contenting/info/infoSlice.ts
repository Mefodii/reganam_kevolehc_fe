import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getContentingInfo } from '../../../api/api';
import { APIStatus } from '../../../util/constants';
import { name as parentName } from '../constants';
import { RootState } from '../../../store';

export const name = 'info';
const sliceName = `${parentName}/${name}`;

type InfoStateProps = Model.ContentingInfo & {
  status: APIStatus;
  error?: string;
};

const initialState: InfoStateProps = {
  status: APIStatus.NONE,
  error: '',
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInfo.pending, (state) => {
        state.status = APIStatus.PENDING;
      })
      .addCase(fetchInfo.fulfilled, (state, action) => {
        return { ...state, status: APIStatus.OK, ...action.payload };
      })
      .addCase(fetchInfo.rejected, (state, action) => {
        state.status = APIStatus.NOT_OK;
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

const selectSlice = (state: RootState) => state[parentName][name];

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
