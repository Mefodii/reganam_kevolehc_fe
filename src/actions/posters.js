import axios from "axios";
import { ADD_ANIME_POSTER, DELETE_ANIME_POSTER } from "./types";
import { API_CRUD_POSTERS } from "../api/urls";

import { jsonConfig, formDataConfig } from "../api/config";

export const addAnimePoster = (poster) => async (dispatch) => {
  const response = await addPoster(poster);
  dispatch({
    type: ADD_ANIME_POSTER,
    payload: response.data,
  });
};

export const deleteAnimePoster = (posterId, videoId) => async (dispatch) => {
  await deletePoster(posterId);
  dispatch({
    type: DELETE_ANIME_POSTER,
    payload: { posterId, videoId },
  });
};

export const addPoster = async (poster) => {
  const config = formDataConfig();
  const posterForm = new FormData();
  posterForm.append("video", poster.video);
  posterForm.append("image", poster.image);

  const response = await axios.post(API_CRUD_POSTERS, posterForm, config);
  return response;
};

export const deletePoster = async (id) => {
  const url = `${API_CRUD_POSTERS}${id}/`;
  const config = jsonConfig();

  await axios.delete(url, config);
};
