import { GET_WATCHIO_INFO, LOAD_COMPLETE, UPDATE_THEME } from "./types";

import { API_GET_WATCHIO_INFO } from "../api/urls";
import { addConfigJsonType } from "./default";

import { getThemeForUrl } from "../util/colors";

import axios from "axios";

export const updateTheme = () => (dispatch) => {
  dispatch({
    type: UPDATE_THEME,
    payload: getThemeForUrl(window.location.href),
  });
};

export const getInfo = () => async (dispatch) => {
  const response = await axios.get(API_GET_WATCHIO_INFO, addConfigJsonType());

  dispatch({
    type: GET_WATCHIO_INFO,
    payload: response.data,
  });

  dispatch({
    type: LOAD_COMPLETE,
  });
};
