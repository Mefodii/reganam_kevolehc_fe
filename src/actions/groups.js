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
} from './types';

import * as api from '../api/api';
import { selectWatchingTypes } from '../features/watching/info/infoSlice';

// GROUP ACTIONS
export const getGroups = (watchingType) => async (dispatch, getState) => {
  const { data: payload } = await api.getGroups(watchingType);
  const dispatchType = getDispatchType(GET, watchingType, getState);

  dispatch({
    type: dispatchType,
    payload,
  });
};

export const addGroup = (group, watchingType) => async (dispatch, getState) => {
  const { data } = await api.addGroup(group);
  const dispatchType = getDispatchType(ADD, watchingType, getState);

  dispatch({
    type: dispatchType,
    payload: { group: data },
  });

  return data;
};

export const updateGroup =
  (group, watchingType) => async (dispatch, getState) => {
    const { data } = await api.updateGroup(group);
    const dispatchType = getDispatchType(UPDATE, watchingType, getState);

    dispatch({
      type: dispatchType,
      payload: { group: data },
    });
  };

export const deleteGroup = (id, watchingType) => async (dispatch, getState) => {
  await api.deleteGroup(id);
  const dispatchType = getDispatchType(DELETE, watchingType, getState);
  dispatch({
    type: dispatchType,
    payload: { id },
  });
};

// ---------------------------------------------------------------------
const GET = 'GET';
const ADD = 'ADD';
const UPDATE = 'UPDATE';
const DELETE = 'DELETE';
const getDispatchType = (action, watchingType, getState) => {
  const { anime, serial, movie } = selectWatchingTypes(getState());
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
  return dispatchTypes[watchingType];
};
