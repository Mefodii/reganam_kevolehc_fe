import axios from "axios";

import {
  GET_SERIAL_GROUPS,
  DELETE_SERIAL_GROUP,
  ADD_SERIAL_GROUP,
} from "./types";
import { API_VIDEOS } from "../api/urls";

import { jsonConfig, jsonWithParamsConfig } from "../api/config";

export const getSerials = () => async (dispatch, getState) => {
  const videoType = getState().info.videoTypes.serial;
  const config = jsonWithParamsConfig({ videoType });

  const response = await axios.get(API_VIDEOS, config);
  dispatch({
    type: GET_SERIAL_GROUPS,
    payload: response.data,
  });
};

export const addSerial = (serial) => async (dispatch) => {
  const config = jsonConfig();
  const response = await axios.post(API_VIDEOS, serial, config);
  const payload = response.data;
  dispatch({
    type: ADD_SERIAL_GROUP,
    payload,
  });
};

export const deleteSerial = (id) => async (dispatch) => {
  const url = `${API_VIDEOS}${id}/`;
  const config = jsonConfig();

  await axios.delete(url, config);
  dispatch({
    type: DELETE_SERIAL_GROUP,
    payload: id,
  });
};
