import axios from "axios";

import { GET_MOVIE_GROUPS, DELETE_MOVIE_GROUP, ADD_MOVIE_GROUP } from "./types";
import { API_VIDEOS } from "../api/urls";

import { jsonConfig, jsonWithParamsConfig } from "../api/config";

export const getMovies = () => async (dispatch, getState) => {
  const videoType = getState().info.videoTypes.movie;
  const config = jsonWithParamsConfig({ videoType });

  const response = await axios.get(API_VIDEOS, config);
  dispatch({
    type: GET_MOVIE_GROUPS,
    payload: response.data,
  });
};

export const addMovie = (movie) => async (dispatch) => {
  const config = jsonConfig();
  const response = await axios.post(API_VIDEOS, movie, config);
  const payload = response.data;
  dispatch({
    type: ADD_MOVIE_GROUP,
    payload,
  });
};

export const deleteMovie = (id) => async (dispatch) => {
  const url = `${API_VIDEOS}${id}/`;
  const config = jsonConfig();

  await axios.delete(url, config);
  dispatch({
    type: DELETE_MOVIE_GROUP,
    payload: id,
  });
};
