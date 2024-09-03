import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  createVideo,
  deleteVideo,
  updateVideo,
  updateVideoSimple,
} from '../features/watching/groups/groupsSlice';
import { RootState } from '../store';

export const name = 'loadings';

type LoadingStateProps = {
  groupIds: number[];
};

const initialState: LoadingStateProps = {
  groupIds: [],
};

export const slice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(
        createVideo.pending,
        updateVideo.pending,
        updateVideoSimple.pending,
        deleteVideo.pending
      ),
      (state, action) => {
        const { group } = action.meta.arg;
        state.groupIds.push(group);
      }
    );
    builder.addMatcher(
      isAnyOf(
        createVideo.fulfilled,
        updateVideo.fulfilled,
        updateVideoSimple.fulfilled,
        deleteVideo.fulfilled
      ),
      (state, action) => {
        const { group } = action.meta.arg;
        state.groupIds = state.groupIds.filter((id) => id !== group);
      }
    );
  },
  selectors: {
    selectGroupId: (state, groupId) =>
      state.groupIds.find((id) => id === groupId),
  },
});

export const selectSlice = (state: RootState) => state[name];
export const { selectGroupId } = slice.getSelectors(selectSlice);

export const isGroupLoading = (state: RootState, groupId: number) =>
  selectGroupId(state, groupId) !== undefined;

export const reducer = slice.reducer;
