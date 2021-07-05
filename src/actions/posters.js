import axios from "axios";
import { ADD_ANIME_POSTER, DELETE_ANIME_POSTER } from "./types";
import { API_POSTERS } from "../api/urls";

import { jsonConfig, formDataConfig } from "../api/config";

export const addAnimePoster = (image, videoId, groupId) => async (dispatch) => {
  const response = await addPoster(image, videoId);
  dispatch({
    type: ADD_ANIME_POSTER,
    payload: {
      poster: response.data,
      groupId,
    },
  });
};

export const deleteAnimePoster =
  (posterId, videoId, groupId) => async (dispatch) => {
    await deletePoster(posterId);
    dispatch({
      type: DELETE_ANIME_POSTER,
      payload: { posterId, videoId, groupId },
    });
  };

export const addPoster = async (image, videoId) => {
  const config = formDataConfig();
  const posterForm = new FormData();
  posterForm.append("video", videoId);
  posterForm.append("image", image);

  const response = await axios.post(API_POSTERS, posterForm, config);
  return response;
};

export const deletePoster = async (id) => {
  const url = `${API_POSTERS}${id}/`;
  const config = jsonConfig();

  await axios.delete(url, config);
};
