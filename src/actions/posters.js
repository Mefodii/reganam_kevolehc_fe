import {
  ADD_ANIME_POSTER,
  ADD_MOVIE_POSTER,
  ADD_SERIAL_POSTER,
  DELETE_ANIME_POSTER,
  DELETE_MOVIE_POSTER,
  DELETE_SERIAL_POSTER,
  UPDATE_ANIME_POSTER,
  UPDATE_MOVIE_POSTER,
  UPDATE_SERIAL_POSTER,
} from "./types";

import * as api from "../api/api";

export const addPoster =
  (image, groupId, watchioType) => async (dispatch, getState) => {
    const posterForm = new FormData();
    posterForm.append("group", groupId);
    posterForm.append("image", image);

    const { data } = await api.addPoster(posterForm);
    const dispatchType = getDispatchType(ADD, watchioType, getState);

    dispatch({
      type: dispatchType,
      payload: {
        poster: data,
        groupId,
      },
    });
  };

export const deletePoster =
  (id, groupId, watchioType) => async (dispatch, getState) => {
    await api.deletePoster(id);
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
      [anime]: ADD_ANIME_POSTER,
      [serial]: ADD_SERIAL_POSTER,
      [movie]: ADD_MOVIE_POSTER,
    };
  }

  if (action === UPDATE) {
    dispatchTypes = {
      [anime]: UPDATE_ANIME_POSTER,
      [serial]: UPDATE_SERIAL_POSTER,
      [movie]: UPDATE_MOVIE_POSTER,
    };
  }

  if (action === DELETE) {
    dispatchTypes = {
      [anime]: DELETE_ANIME_POSTER,
      [serial]: DELETE_SERIAL_POSTER,
      [movie]: DELETE_MOVIE_POSTER,
    };
  }
  return dispatchTypes[watchioType];
};
