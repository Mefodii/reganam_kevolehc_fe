import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  isAnyOf,
} from '@reduxjs/toolkit';
import {
  addGroup as apiAddGroup,
  deleteGroup as apiDeleteGroup,
  getGroups as apiGetGroups,
  updateGroup as apiUpdateGroup,
} from '../../../api/api';
import { RootState } from '../../../store';
import { APIStatus, ReduxRootName } from '../../../util/constants';
import { compareByKey, isAbortError } from '../../../util/functions';
import { createPostersSlice } from '../posters/postersSlice';
import { createVideosActions } from '../videos/videosSlice';

const parentName = ReduxRootName.WATCHING;

export const name = 'groups';
const sliceName = `${parentName}/${name}`;

const groupsAdapter = createEntityAdapter({
  selectId: (group: Model.GroupDM) => group.id,
  sortComparer: compareByKey('name', { caseSensitive: false }),
});

const stateFragment: {
  status: APIStatus;
  error?: string;
} = {
  status: APIStatus.NONE,
  error: '',
};

const initialState = groupsAdapter.getInitialState(stateFragment);

export const fetchGroups = createAsyncThunk(
  `${sliceName}/fetchGroups`,
  async (watchingType: string, { signal }) => {
    const response = await apiGetGroups(watchingType, signal);
    return response.data;
  }
);

export const createGroup = createAsyncThunk(
  `${sliceName}/createGroup`,
  async (group: Model.GroupSM, { signal }) => {
    const response = await apiAddGroup(group, signal);
    return response.data;
  }
);

export const updateGroup = createAsyncThunk(
  `${sliceName}/updateGroup`,
  async (group: Model.GroupDM, { signal }) => {
    const response = await apiUpdateGroup(group, signal);
    return response.data;
  }
);

export const deleteGroup = createAsyncThunk(
  `${sliceName}/deleteGroup`,
  async (group: Model.GroupDM, { signal }) => {
    await apiDeleteGroup(group.id, signal);
    return group;
  }
);

export const { createVideo, updateVideo, updateVideoSimple, deleteVideo } =
  createVideosActions(sliceName);

const { extraActions: postersExtraActions, reducer: postersReducer } =
  createPostersSlice(sliceName);

export const { createPoster, updatePoster, deletePoster } = postersExtraActions;

export const slice = createSlice({
  name: sliceName,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGroups.fulfilled, (state, action) => {
      state.status = APIStatus.OK;
      groupsAdapter.removeAll(state);
      groupsAdapter.upsertMany(state, action.payload);
    });
    builder.addCase(createGroup.fulfilled, (state, action) => {
      state.status = APIStatus.OK;
      groupsAdapter.addOne(state, action.payload);
    });
    builder.addCase(deleteGroup.fulfilled, (state, action) => {
      state.status = APIStatus.OK;
      groupsAdapter.removeOne(state, action.payload.id);
    });
    builder.addCase(updateVideoSimple.fulfilled, (state, action) => {
      state.status = APIStatus.OK;
      const group = state.entities[action.payload.group];
      if (group.single) {
        return;
      }

      const i = group.videos.findIndex((v) => v.id === action.payload.id);
      group.videos[i] = action.payload;
      groupsAdapter.setOne(state, group);
    });
    builder.addMatcher(
      isAnyOf(
        fetchGroups.pending,
        createGroup.pending,
        updateGroup.pending,
        deleteGroup.pending,
        createVideo.pending,
        updateVideo.pending,
        updateVideoSimple.pending,
        deleteVideo.pending,
        createPoster.pending,
        updatePoster.pending,
        deletePoster.pending
      ),
      (state) => {
        state.status = APIStatus.PENDING;
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
        updateVideoSimple.rejected,
        deleteVideo.rejected,
        createPoster.rejected,
        updatePoster.rejected,
        deletePoster.rejected
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
    builder.addMatcher(
      isAnyOf(
        updateGroup.fulfilled,
        createVideo.fulfilled,
        updateVideo.fulfilled,
        deleteVideo.fulfilled
      ),
      (state, action) => {
        state.status = APIStatus.OK;
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
        state.status = APIStatus.OK;
        let group = groupsAdapter
          .getSelectors()
          .selectById(state, action.payload.group);

        group = { ...group, images: postersReducer(group.images, action) };
        groupsAdapter.setOne(state, group);
      }
    );
  },
});

export const selectSlice = (state: RootState) => state[parentName][name];
export const {
  selectAll: selectAllGroups,
  selectById: selectGroupById,
  selectIds: selectGroupIds,
} = groupsAdapter.getSelectors(selectSlice);

export const selectGroupsByWatchingType = createSelector(
  [selectAllGroups, (state: RootState, watchingType?: string) => watchingType],
  (groups, watchingType) =>
    groups.filter((group) => group.type === watchingType)
);

export const selectGroupsIdByWatchingType = createSelector(
  [selectGroupsByWatchingType],
  (groups) => groups.map((group) => group.id)
);

export const reducer = slice.reducer;
