import axios from "axios";

import { GET_ANIME_GROUP, DELETE_ANIME_GROUP, ADD_ANIME_GROUP } from "./types";
import { API_VIDEOS, API_VIDEO_GROUPS } from "../api/urls";

import { jsonConfig, jsonWithParamsConfig } from "../api/config";
import { newVideo } from "./videos";

export const getAnime = () => async (dispatch, getState) => {
  const videoType = getState().info.videoTypes.anime;
  const config = jsonWithParamsConfig({ videoType });

  const response = await axios.get(API_VIDEO_GROUPS, config);
  dispatch({
    type: GET_ANIME_GROUP,
    payload: response.data,
  });
};

export const addAnime = (anime) => async (dispatch) => {
  const config = jsonConfig();
  const response = await axios.post(API_VIDEOS, anime, config);
  const payload = newVideo(response.data);
  dispatch({
    type: ADD_ANIME_GROUP,
    payload,
  });
};

export const deleteAnime = (id) => async (dispatch) => {
  const url = `${API_VIDEOS}${id}/`;
  const config = jsonConfig();

  await axios.delete(url, config);
  dispatch({
    type: DELETE_ANIME_GROUP,
    payload: id,
  });
};
