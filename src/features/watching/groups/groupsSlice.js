import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  isAnyOf,
} from '@reduxjs/toolkit';
import {
  getGroups as apiGetGroups,
  addGroup as apiAddGroup,
  updateGroup as apiUpdateGroup,
  deleteGroup as apiDeleteGroup,
} from '../../../api/api';
import { APIStatus } from '../../../util/constants';
import { name as parentName } from '../constants';
import { compareByKey } from '../../../util/functions';
import { createPostersSlice } from '../posters/postersSlice';
import { createVideosActions } from '../videos/videosSlice';

export const name = 'groups';
const sliceName = `${parentName}/${name}`;

const groupsAdapter = createEntityAdapter({
  sortComparer: compareByKey('name', { caseSensitive: false }),
});

const initialState = groupsAdapter.getInitialState({
  status: APIStatus.None,
  error: null,
});

export const fetchGroups = createAsyncThunk(
  `${sliceName}/fetchGroups`,
  async (watchingType) => {
    const response = await apiGetGroups(watchingType);
    return { groups: response.data, watchingType };
  }
);

export const createGroup = createAsyncThunk(
  `${sliceName}/createGroup`,
  async (group) => {
    const response = await apiAddGroup(group);
    return response.data;
  }
);

export const updateGroup = createAsyncThunk(
  `${sliceName}/updateGroup`,
  async (group) => {
    const response = await apiUpdateGroup(group);
    return response.data;
  }
);

export const deleteGroup = createAsyncThunk(
  `${sliceName}/deleteGroup`,
  async (group) => {
    await apiDeleteGroup(group.id);
    return group;
  }
);

export const { createVideo, updateVideo, deleteVideo } =
  createVideosActions(sliceName);

const { extraActions: postersExtraActions, reducer: postersReducer } =
  createPostersSlice(sliceName);

export const { createPoster, updatePoster, deletePoster } = postersExtraActions;

const slice = createSlice({
  name: sliceName,
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchGroups.fulfilled, (state, action) => {
      state.status = APIStatus.Ok;
      const { groups, watchingType } = action.payload;
      const ids = groupsAdapter
        .getSelectors()
        .selectAll(state)
        .filter((group) => group.type === watchingType)
        .map((group) => group.id);
      groupsAdapter.removeMany(state, ids);
      groupsAdapter.upsertMany(state, groups);
    });
    builder.addCase(createGroup.fulfilled, (state, action) => {
      state.status = APIStatus.Ok;
      groupsAdapter.addOne(state, action.payload);
    });
    builder.addCase(deleteGroup.fulfilled, (state, action) => {
      state.status = APIStatus.Ok;
      groupsAdapter.removeOne(state, action.payload.id);
    });
    builder.addMatcher(
      isAnyOf(
        fetchGroups.pending,
        createGroup.pending,
        updateGroup.pending,
        deleteGroup.pending,
        createVideo.pending,
        updateVideo.pending,
        deleteVideo.pending,
        createPoster.pending,
        updatePoster.pending,
        deletePoster.pending
      ),
      (state) => {
        state.status = APIStatus.Pending;
      }
    );
    builder.addMatcher(
      isAnyOf(
        fetchGroups.rejected,
        createGroup.rejected,
        updateGroup.rejected,
        deleteGroup.rejected,
        createVideo.rejected,
        updateVideo.rejected,
        deleteVideo.rejected,
        createPoster.rejected,
        updatePoster.rejected,
        deletePoster.rejected
      ),
      (state, action) => {
        state.status = APIStatus.NotOk;
        state.error = action.error.message;
      }
    );
    builder.addMatcher(
      isAnyOf(
        updateGroup.fulfilled,
        createVideo.fulfilled,
        updateVideo.fulfilled,
        deleteVideo.fulfilled
      ),
      (state, action) => {
        state.status = APIStatus.Ok;
        groupsAdapter.setOne(state, action.payload);
      }
    );
    builder.addMatcher(
      isAnyOf(
        createPoster.fulfilled,
        updatePoster.fulfilled,
        deletePoster.fulfilled
      ),
      (state, action) => {
        state.status = APIStatus.Ok;
        let group = groupsAdapter
          .getSelectors()
          .selectById(state, action.payload.groupId);

        group = { ...group, images: postersReducer(group.images, action) };
        groupsAdapter.setOne(state, group);
      }
    );
  },
});

export const selectSlice = (state) => state[parentName][name];
export const {
  selectAll: selectAllGroups,
  selectById: selectGroupById,
  selectIds: selectGroupIds,
} = groupsAdapter.getSelectors(selectSlice);

export const selectGroupsByWatchingType = (state, watchingType) =>
  selectAllGroups(state).filter((group) => group.type === watchingType);

export const selectGroupsIdByWatchingType = (state, watchingType) =>
  selectGroupsByWatchingType(state, watchingType).map((group) => group.id);

export const reducer = slice.reducer;
export default slice;
