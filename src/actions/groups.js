import {
  GET_ANIME_GROUPS,
  GET_SERIAL_GROUPS,
  GET_MOVIE_GROUPS,
  ADD_ANIME_GROUP,
  ADD_SERIAL_GROUP,
  ADD_MOVIE_GROUP,
  UPDATE_ANIME_GROUP,
  UPDATE_SERIAL_GROUP,
  UPDATE_MOVIE_GROUP,
  DELETE_ANIME_GROUP,
  DELETE_SERIAL_GROUP,
  DELETE_MOVIE_GROUP,
} from "./types";

import * as api from "../api/api";

// GROUP ACTIONS
export const getGroups = (watchioType) => async (dispatch, getState) => {
  const { data: payload } = await api.getGroups(watchioType);
  const dispatchType = getDispatchType(GET, watchioType, getState);

  dispatch({
    type: dispatchType,
    payload,
  });
};

export const addGroup = (group, watchioType) => async (dispatch, getState) => {
  const { data } = await api.addGroup(group);
  const dispatchType = getDispatchType(ADD, watchioType, getState);

  dispatch({
    type: dispatchType,
    payload: { group: data },
  });
};

export const updateGroup =
  (group, watchioType) => async (dispatch, getState) => {
    const { data } = await api.updateGroup(group);
    const dispatchType = getDispatchType(UPDATE, watchioType, getState);

    dispatch({
      type: dispatchType,
      payload: { group: data },
    });
  };

export const deleteGroup = (id, watchioType) => async (dispatch, getState) => {
  await api.deleteGroup(id);
  const dispatchType = getDispatchType(DELETE, watchioType, getState);
  dispatch({
    type: dispatchType,
    payload: { id },
  });
};

// ---------------------------------------------------------------------
const GET = "GET";
const ADD = "ADD";
const UPDATE = "UPDATE";
const DELETE = "DELETE";
const getDispatchType = (action, watchioType, getState) => {
  const { anime, serial, movie } = getState().info.watchioTypes;
  var dispatchTypes = {};

  if (action === GET) {
    dispatchTypes = {
      [anime]: GET_ANIME_GROUPS,
      [serial]: GET_SERIAL_GROUPS,
      [movie]: GET_MOVIE_GROUPS,
    };
  }

  if (action === ADD) {
    dispatchTypes = {
      [anime]: ADD_ANIME_GROUP,
      [serial]: ADD_SERIAL_GROUP,
      [movie]: ADD_MOVIE_GROUP,
    };
  }

  if (action === UPDATE) {
    dispatchTypes = {
      [anime]: UPDATE_ANIME_GROUP,
      [serial]: UPDATE_SERIAL_GROUP,
      [movie]: UPDATE_MOVIE_GROUP,
    };
  }

  if (action === DELETE) {
    dispatchTypes = {
      [anime]: DELETE_ANIME_GROUP,
      [serial]: DELETE_SERIAL_GROUP,
      [movie]: DELETE_MOVIE_GROUP,
    };
  }
  return dispatchTypes[watchioType];
};
