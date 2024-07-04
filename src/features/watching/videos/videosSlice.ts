import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getGroup as apiGetGroup,
  addVideo as apiAddVideo,
  updateVideo as apiUpdateVideo,
  deleteVideo as apiDeleteVideo,
} from '../../../api/api';

export const name = 'videos';

export const createVideosActions = (sliceName: string) => {
  const createVideo = createAsyncThunk(
    `${sliceName}/createVideo`,
    async (video: Model.VideoSM, { signal }) => {
      const response = await apiAddVideo(video, signal);

      const { data } = await apiGetGroup(response.data.group, signal);
      return data;
    }
  );

  const updateVideo = createAsyncThunk(
    `${sliceName}/updateVideo`,
    async (video: Model.VideoDM, { signal }) => {
      await apiUpdateVideo(video, signal);

      const { data } = await apiGetGroup(video.group, signal);
      return data;
    }
  );

  const updateVideoSimple = createAsyncThunk(
    `${sliceName}/updateVideoSimple`,
    async (video: Model.VideoDM, { signal }) => {
      const { data } = await apiUpdateVideo(video, signal);
      return data;
    }
  );

  const deleteVideo = createAsyncThunk(
    `${sliceName}/deleteVideo`,
    async (video: Model.VideoDM, { signal }) => {
      await apiDeleteVideo(video.id, signal);

      const { data } = await apiGetGroup(video.group, signal);
      return data;
    }
  );

  return { createVideo, updateVideo, updateVideoSimple, deleteVideo };
};
