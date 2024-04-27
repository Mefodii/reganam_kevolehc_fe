import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  createVideo,
  deleteVideo,
  updateVideo,
} from '../features/watching/groups/groupsSlice';

export const name = 'loadings';

const initialState = {
  groups: [],
};

const slice = createSlice({
  name,
  initialState,
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(createVideo.pending, updateVideo.pending, deleteVideo.pending),
      (state, action) => {
        const { group } = action.meta.arg;
        state.groups.push(group);
      }
    );
    builder.addMatcher(
      isAnyOf(
        createVideo.fulfilled,
        updateVideo.fulfilled,
        deleteVideo.fulfilled
      ),
      (state, action) => {
        const { group } = action.meta.arg;
        state.groups = state.groups.filter((id) => id !== group);
      }
    );
  },
  selectors: {
    selectGroupId: (state, groupId) =>
      state.groups.find((id) => id === groupId),
  },
});

export const selectSlice = (state) => state[name];
export const { selectGroupId } = slice.getSelectors(selectSlice);

export const isGroupLoading = (state, groupId) =>
  selectGroupId(state, groupId) !== undefined;

export const reducer = slice.reducer;
export default slice;
