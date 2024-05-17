import { createAsyncThunk } from '@reduxjs/toolkit';
import {
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
      return response.data;
    }
  );

  const updateVideo = createAsyncThunk(
    `${sliceName}/updateVideo`,
    async (video: Model.VideoDM) => {
      const response = await apiUpdateVideo(video);
      return response.data;
    }
  );

  const deleteVideo = createAsyncThunk(
    `${sliceName}/deleteVideo`,
    async (video: Model.VideoDM) => {
      if (!video.id) {
        throw Error(`Cannot delete video without id. Video: ${video}`);
      }

      const response = await apiDeleteVideo(video.id);
      return response.data;
    }
  );

  return { createVideo, updateVideo, deleteVideo };
};
