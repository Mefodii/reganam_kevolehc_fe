import { GET_WATCHIO_INFO, LOAD_COMPLETE, UPDATE_THEME } from "./types";

import { getInfo as getInfoApi } from "../api/api";

import { getThemeForUrl } from "../util/colors";

export const updateTheme = () => (dispatch) => {
  dispatch({
    type: UPDATE_THEME,
    payload: getThemeForUrl(window.location.href),
  });
};

export const getInfo = () => async (dispatch) => {
  const { data: payload } = await getInfoApi();

  dispatch({
    type: GET_WATCHIO_INFO,
    payload,
  });

  dispatch({
    type: LOAD_COMPLETE,
  });
};
