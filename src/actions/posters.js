import { addPoster as addPosterApi } from "../api/api";

export const addPoster = async (image, groupId) => {
  const posterForm = new FormData();
  posterForm.append("group", groupId);
  posterForm.append("image", image);

  return await addPosterApi(posterForm);
};
