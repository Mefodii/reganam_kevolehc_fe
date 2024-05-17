import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  addPoster as apiAddPoster,
  updatePoster as apiUpdatePoster,
  deletePoster as apiDeletePoster,
} from '../../../api/api';

type PosterSliceProps = Model.PosterDM[];

export const createPostersSlice = (parentName: string, name = 'posters') => {
  const sliceName = `${parentName}/${name}`;

  const initialState: PosterSliceProps = [];

  const createPoster = createAsyncThunk(
    `${sliceName}/createPoster`,
    async ({ image, group }: { image: File; group: number }) => {
      const posterForm = new FormData();
      posterForm.append('group', group + '');
      posterForm.append('image', image);

      const response = await apiAddPoster(posterForm);
      return {
        poster: response.data,
        groupId: group,
      };
    }
  );

  const updatePoster = createAsyncThunk(
    `${sliceName}/updatePoster`,
    async ({ poster, image }: { poster: Model.PosterDM; image: File }) => {
      const posterForm = new FormData();
      posterForm.append('group', poster.group + '');
      posterForm.append('image', image);

      const response = await apiUpdatePoster(poster, posterForm);
      return {
        poster: response.data,
        groupId: poster.group,
      };
    }
  );

  const deletePoster = createAsyncThunk(
    `${sliceName}/deletePoster`,
    async (poster: Model.PosterDM) => {
      await apiDeletePoster(poster.id);
      return { poster, groupId: poster.group };
    }
  );

  const slice = createSlice({
    name: sliceName,
    initialState,
    reducers: {},
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
