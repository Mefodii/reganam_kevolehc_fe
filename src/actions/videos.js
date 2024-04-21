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
} from './types';

import * as api from '../api/api';
import { addGroupLoading, deleteGroupLoading } from './loadings';
import { selectWatchingTypes } from '../features/watching/info/infoSlice';

// VIDEOS ACTIONS
export const addVideo = (video, watchingType) => async (dispatch, getState) => {
  addGroupLoading(video.group)(dispatch);

  const { data } = await api.addVideo(video);
  const dispatchType = getDispatchType(ADD, watchingType, getState);

  dispatch({
    type: dispatchType,
    payload: { group: data },
  });

  deleteGroupLoading(video.group)(dispatch);
};

export const updateVideo =
  (video, watchingType) => async (dispatch, getState) => {
    addGroupLoading(video.group)(dispatch);

    const { data } = await api.updateVideo(video);
    const dispatchType = getDispatchType(UPDATE, watchingType, getState);

    dispatch({
      type: dispatchType,
      payload: { group: data },
    });

    deleteGroupLoading(video.group)(dispatch);
  };

export const deleteVideo =
  (video, watchingType) => async (dispatch, getState) => {
    addGroupLoading(video.group)(dispatch);

    const { data } = await api.deleteVideo(video.id);
    const dispatchType = getDispatchType(DELETE, watchingType, getState);

    dispatch({
      type: dispatchType,
      payload: { group: data },
    });

    deleteGroupLoading(video.group)(dispatch);
  };

// ---------------------------------------------------------------------
const ADD = 'ADD';
const UPDATE = 'UPDATE';
const DELETE = 'DELETE';
const getDispatchType = (action, watchingType, getState) => {
  const { anime, serial, movie } = selectWatchingTypes(getState());
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
  return dispatchTypes[watchingType];
};
