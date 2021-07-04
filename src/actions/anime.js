import axios from "axios";

import { GET_ANIME, DELETE_ANIME, ADD_ANIME } from "./types";
import { API_CRUD_VIDEO, API_GET_VIDEOS } from "../api/urls";

import { jsonConfig, jsonWithParamsConfig } from "../api/config";
import { newVideo } from "./videos";

export const getAnime = () => async (dispatch, getState) => {
  const videoType = getState().info.videoTypes.anime;
  const config = jsonWithParamsConfig({ videoType });

  const response = await axios.get(API_GET_VIDEOS, config);
  dispatch({
    type: GET_ANIME,
    payload: response.data,
  });
};

export const addAnime = (anime) => async (dispatch) => {
  const config = jsonConfig();
  const response = await axios.post(API_CRUD_VIDEO, anime, config);
  const payload = newVideo(response.data);
  dispatch({
    type: ADD_ANIME,
    payload,
  });
};

export const deleteAnime = (id) => async (dispatch) => {
  const url = `${API_CRUD_VIDEO}${id}/`;
  const config = jsonConfig();

  await axios.delete(url, config);
  dispatch({
    type: DELETE_ANIME,
    payload: id,
  });
};
