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
    async ({ image, group }: { image: File; group: number }, { signal }) => {
      const posterForm = new FormData();
      posterForm.append('group', group + '');
      posterForm.append('image', image);

      const response = await apiAddPoster(posterForm, signal);
      return response.data;
    }
  );

  const updatePoster = createAsyncThunk(
    `${sliceName}/updatePoster`,
    async (
      { poster, image }: { poster: Model.PosterDM; image: File },
      { signal }
    ) => {
      const posterForm = new FormData();
      posterForm.append('group', poster.group + '');
      posterForm.append('image', image);

      const response = await apiUpdatePoster(poster, posterForm, signal);
      return response.data;
    }
  );

  const deletePoster = createAsyncThunk(
    `${sliceName}/deletePoster`,
    async (poster: Model.PosterDM, { signal }) => {
      await apiDeletePoster(poster.id, signal);
      return poster;
    }
  );

  const slice = createSlice({
    name: sliceName,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(createPoster.fulfilled, (state, action) => {
        state.push(action.payload);
      });
      builder.addCase(updatePoster.fulfilled, (state, action) => {
        const { id } = action.payload;
        const posterIndex = state.findIndex((p) => (p.id = id));
        state[posterIndex] = action.payload;
      });
      builder.addCase(deletePoster.fulfilled, (state, action) => {
        const { id } = action.payload;
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
