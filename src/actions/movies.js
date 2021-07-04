import axios from "axios";

import { GET_MOVIES, DELETE_MOVIE, ADD_MOVIE } from "./types";
import { API_CRUD_VIDEO, API_GET_VIDEOS } from "../api/urls";

import { jsonConfig, jsonWithParamsConfig } from "../api/config";
import { newVideo } from "./videos";

export const getMovies = () => async (dispatch, getState) => {
  const videoType = getState().info.videoTypes.movie;
  const config = jsonWithParamsConfig({ videoType });

  const response = await axios.get(API_GET_VIDEOS, config);
  dispatch({
    type: GET_MOVIES,
    payload: response.data,
  });
};

export const addMovie = (movie) => async (dispatch) => {
  const config = jsonConfig();
  const response = await axios.post(API_CRUD_VIDEO, movie, config);
  const payload = newVideo(response.data);
  dispatch({
    type: ADD_MOVIE,
    payload,
  });
};

export const deleteMovie = (id) => async (dispatch) => {
  const url = `${API_CRUD_VIDEO}${id}/`;
  const config = jsonConfig();

  await axios.delete(url, config);
  dispatch({
    type: DELETE_MOVIE,
    payload: id,
  });
};
