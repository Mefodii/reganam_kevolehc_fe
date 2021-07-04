import axios from "axios";

import { GET_SERIALS, DELETE_SERIAL, ADD_SERIAL } from "./types";
import { API_CRUD_VIDEO, API_GET_VIDEOS } from "../api/urls";

import { jsonConfig, jsonWithParamsConfig } from "../api/config";
import { newVideo } from "./videos";

export const getSerials = () => async (dispatch, getState) => {
  const videoType = getState().info.videoTypes.serial;
  const config = jsonWithParamsConfig({ videoType });

  const response = await axios.get(API_GET_VIDEOS, config);
  dispatch({
    type: GET_SERIALS,
    payload: response.data,
  });
};

export const addSerial = (serial) => async (dispatch) => {
  const config = jsonConfig();
  const response = await axios.post(API_CRUD_VIDEO, serial, config);
  const payload = newVideo(response.data);
  dispatch({
    type: ADD_SERIAL,
    payload,
  });
};

export const deleteSerial = (id) => async (dispatch) => {
  const url = `${API_CRUD_VIDEO}${id}/`;
  const config = jsonConfig();

  await axios.delete(url, config);
  dispatch({
    type: DELETE_SERIAL,
    payload: id,
  });
};
