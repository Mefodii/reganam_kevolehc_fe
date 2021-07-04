import {
  ADD_POSTER,
  ADD_ANIME_POSTER,
  DELETE_POSTER,
  DELETE_ANIME_POSTER,
  buildTypes,
} from "./types";
import { API_CRUD_POSTERS } from "../api/urls";
import { addConfigFormDataType, defaultPost, defaultDelete } from "./default";

export const addAnimePoster = (poster) => (dispatch) => {
  addPoster(ADD_ANIME_POSTER, poster)(dispatch);
};

export const addPoster = (actionType, poster) => (dispatch) => {
  const config = addConfigFormDataType();
  const posterForm = new FormData();
  posterForm.append("video", poster.video);
  posterForm.append("image", poster.image);
  defaultPost(
    API_CRUD_POSTERS,
    buildTypes(ADD_POSTER, actionType),
    posterForm,
    config
  )(dispatch);
};

export const deleteAnimePoster = (id, videoId) => (dispatch) => {
  const url = `${API_CRUD_POSTERS}${id}/`;
  defaultDelete(url, buildTypes(DELETE_POSTER, DELETE_ANIME_POSTER), {
    id,
    videoId,
  })(dispatch);
};
