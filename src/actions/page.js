import { GET_INFO, LOAD_COMPLETE, UPDATE_THEME } from "./types";

import { getWatchingInfo, getContentingInfo } from "../api/api";

import { getThemeForUrl } from "../util/colors";

export const updateTheme = () => (dispatch) => {
  dispatch({
    type: UPDATE_THEME,
    payload: getThemeForUrl(window.location.href),
  });
};

export const getInfo = () => async (dispatch) => {
  const { data: watchingInfo } = await getWatchingInfo();
  const { data: contentingInfo } = await getContentingInfo();

  const payload = { ...watchingInfo, ...contentingInfo };

  dispatch({
    type: GET_INFO,
    payload,
  });

  dispatch({
    type: LOAD_COMPLETE,
  });
};
