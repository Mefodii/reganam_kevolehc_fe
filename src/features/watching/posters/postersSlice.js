import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  addPoster as apiAddPoster,
  updatePoster as apiUpdatePoster,
  deletePoster as apiDeletePoster,
} from '../../../api/api';

export const createPostersSlice = (parentName, name = 'posters') => {
  const sliceName = `${parentName}/${name}`;

  const initialState = [];

  const createPoster = createAsyncThunk(
    `${sliceName}/createPoster`,
    async ({ image, groupId }) => {
      const posterForm = new FormData();
      posterForm.append('group', groupId);
      posterForm.append('image', image);

      const response = await apiAddPoster(posterForm);
      return {
        poster: response.data,
        groupId,
      };
    }
  );

  const updatePoster = createAsyncThunk(
    `${sliceName}/updatePoster`,
    async ({ poster, image, groupId }) => {
      const posterForm = new FormData();
      posterForm.append('group', groupId);
      posterForm.append('image', image);

      const response = await apiUpdatePoster(poster.id, posterForm);
      return {
        poster: response.data,
        groupId,
      };
    }
  );

  const deletePoster = createAsyncThunk(
    `${sliceName}/deletePoster`,
    async ({ poster, groupId }) => {
      await apiDeletePoster(poster.id);
      return { poster, groupId };
    }
  );

  const slice = createSlice({
    name: sliceName,
    initialState,
    extraReducers: (builder) => {
      builder.addCase(createPoster.fulfilled, (state, action) => {
        state.push(action.payload.poster);
      });
      builder.addCase(updatePoster.fulfilled, (state, action) => {
        const { id } = action.payload.poster;
        const posterIndex = state.findIndex((p) => (p.id = id));
        state[posterIndex] = action.payload.poster;
      });
      builder.addCase(deletePoster.fulfilled, (state, action) => {
        const { id } = action.payload.poster;
        const posterIndex = state.findIndex((p) => (p.id = id));
        state.splice(posterIndex, 1);
      });
    },
  });

  const extraActions = {
    createPoster,
    updatePoster,
    deletePoster,
  };

  return { extraActions, reducer: slice.reducer, slice };
};
