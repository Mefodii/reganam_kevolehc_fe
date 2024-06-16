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
    async (video: Model.VideoAM) => {
      const response = await apiAddVideo(video);

      const { data } = await apiGetGroup(response.data.group);
      return data;
    }
  );

  const updateVideo = createAsyncThunk(
    `${sliceName}/updateVideo`,
    async (video: Model.VideoDM) => {
      await apiUpdateVideo(video);

      const { data } = await apiGetGroup(video.group);
      return data;
    }
  );

  const deleteVideo = createAsyncThunk(
    `${sliceName}/deleteVideo`,
    async (video: Model.VideoDM) => {
      await apiDeleteVideo(video.id);

      const { data } = await apiGetGroup(video.group);
      return data;
    }
  );

  return { createVideo, updateVideo, deleteVideo };
};
