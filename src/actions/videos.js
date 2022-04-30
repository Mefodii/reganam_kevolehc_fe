import {
  ADD_ANIME_VIDEO,
  ADD_SERIAL_VIDEO,
  ADD_MOVIE_VIDEO,
  UPDATE_ANIME_VIDEO,
  UPDATE_SERIAL_VIDEO,
  UPDATE_MOVIE_VIDEO,
  DELETE_ANIME_VIDEO,
  DELETE_SERIAL_VIDEO,
  DELETE_MOVIE_VIDEO,
} from "./types";

import * as api from "../api/api";

// VIDEOS ACTIONS
export const addVideo =
  (video, groupId, watchioType) => async (dispatch, getState) => {
    const { data } = await api.addVideo(video);
    const dispatchType = getDispatchType(ADD, watchioType, getState);

    dispatch({
      type: dispatchType,
      payload: { video: data, groupId },
    });
  };

export const updateVideo =
  (video, groupId, watchioType) => async (dispatch, getState) => {
    const { data } = await api.updateVideo(video);
    const dispatchType = getDispatchType(UPDATE, watchioType, getState);

    dispatch({
      type: dispatchType,
      payload: { video: data, groupId },
    });
  };

export const deleteVideo =
  (id, groupId, watchioType) => async (dispatch, getState) => {
    await api.deleteVideo(id);
    const dispatchType = getDispatchType(DELETE, watchioType, getState);

    dispatch({
      type: dispatchType,
      payload: { id, groupId },
    });
  };

// ---------------------------------------------------------------------
const ADD = "ADD";
const UPDATE = "UPDATE";
const DELETE = "DELETE";
const getDispatchType = (action, watchioType, getState) => {
  const { anime, serial, movie } = getState().info.watchioTypes;
  var dispatchTypes = {};

  if (action === ADD) {
    dispatchTypes = {
      [anime]: ADD_ANIME_VIDEO,
      [serial]: ADD_SERIAL_VIDEO,
      [movie]: ADD_MOVIE_VIDEO,
    };
  }

  if (action === UPDATE) {
    dispatchTypes = {
      [anime]: UPDATE_ANIME_VIDEO,
      [serial]: UPDATE_SERIAL_VIDEO,
      [movie]: UPDATE_MOVIE_VIDEO,
    };
  }

  if (action === DELETE) {
    dispatchTypes = {
      [anime]: DELETE_ANIME_VIDEO,
      [serial]: DELETE_SERIAL_VIDEO,
      [movie]: DELETE_MOVIE_VIDEO,
    };
  }
  return dispatchTypes[watchioType];
};
