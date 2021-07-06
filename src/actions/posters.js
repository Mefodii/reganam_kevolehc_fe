import { addPoster as addPosterApi } from "../api/api";

export const addPoster = async (image, videoId) => {
  const posterForm = new FormData();
  posterForm.append("video", videoId);
  posterForm.append("image", image);

  return await addPosterApi(posterForm);
};
