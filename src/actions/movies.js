import {
  GET_MOVIE_GROUPS,
  ADD_MOVIE_GROUP,
  UPDATE_MOVIE_GROUP,
  DELETE_MOVIE_GROUP,
  ADD_MOVIE_VIDEO,
  UPDATE_MOVIE_VIDEO,
  DELETE_MOVIE_VIDEO,
  ADD_MOVIE_POSTER,
  DELETE_MOVIE_POSTER,
} from "./types";

import {
  getGroups,
  addGroup,
  updateGroup,
  addVideo,
  updateVideo,
  deleteVideo,
  deleteGroup,
  deletePoster,
} from "../api/api";
import { addPoster } from "./posters";

// GROUP ACTIONS
export const getMovieGroups = () => async (dispatch, getState) => {
  const videoType = getState().info.videoTypes.movie;
  const { data: payload } = await getGroups(videoType);
  dispatch({
    type: GET_MOVIE_GROUPS,
    payload,
  });
};

export const addMovieGroup = (group) => async (dispatch) => {
  const { data } = await addGroup(group);
  dispatch({
    type: ADD_MOVIE_GROUP,
    payload: { group: data },
  });
};

export const updateMovieGroup = (group) => async (dispatch) => {
  const { data } = await updateGroup(group);
  dispatch({
    type: UPDATE_MOVIE_GROUP,
    payload: { group: data },
  });
};

export const deleteMovieGroup = (id) => async (dispatch) => {
  await deleteGroup(id);
  dispatch({
    type: DELETE_MOVIE_GROUP,
    payload: { id },
  });
};
// ----------------------------- //

// VIDEO ACTIONS
export const addMovieVideo = (video, groupId) => async (dispatch) => {
  const { data } = await addVideo(video);
  dispatch({
    type: ADD_MOVIE_VIDEO,
    payload: { video: data, groupId },
  });
};

export const updateMovieVideo = (video, groupId) => async (dispatch) => {
  const { data } = await updateVideo(video);
  dispatch({
    type: UPDATE_MOVIE_VIDEO,
    payload: { video: data, groupId },
  });
};

export const deleteMovieVideo = (id, groupId) => async (dispatch) => {
  await deleteVideo(id);
  dispatch({
    type: DELETE_MOVIE_VIDEO,
    payload: { id, groupId },
  });
};
// ----------------------------- //

// POSTER ACTIONS
export const addMoviePoster = (image, videoId, groupId) => async (dispatch) => {
  const response = await addPoster(image, videoId);
  dispatch({
    type: ADD_MOVIE_POSTER,
    payload: {
      poster: response.data,
      groupId,
      videoId,
    },
  });
};

export const deleteMoviePoster = (id, videoId, groupId) => async (dispatch) => {
  await deletePoster(id);
  dispatch({
    type: DELETE_MOVIE_POSTER,
    payload: { id, videoId, groupId },
  });
};
// ----------------------------- //
