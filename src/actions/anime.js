import {
  GET_ANIME_GROUPS,
  DELETE_ANIME_GROUP,
  ADD_ANIME_GROUP,
  ADD_ANIME_POSTER,
  DELETE_ANIME_POSTER,
} from "./types";

import { getGroups, addGroup, deleteGroup, deletePoster } from "../api/api";
import { addPoster } from "./posters";

// GROUP ACTIONS
export const getAnimeGroups = () => async (dispatch, getState) => {
  const { data: payload } = await getGroups(getState().info.videoTypes.anime);
  dispatch({
    type: GET_ANIME_GROUPS,
    payload,
  });
};

export const addAnimeGroup = (anime) => async (dispatch) => {
  const { data: payload } = await addGroup(anime);
  dispatch({
    type: ADD_ANIME_GROUP,
    payload,
  });
};

export const deleteAnimeGroup = (id) => async (dispatch) => {
  await deleteGroup(id);
  dispatch({
    type: DELETE_ANIME_GROUP,
    payload: id,
  });
};
// ----------------------------- //

// POSTER ACTIONS
export const addAnimePoster = (image, videoId, groupId) => async (dispatch) => {
  const response = await addPoster(image, videoId);
  dispatch({
    type: ADD_ANIME_POSTER,
    payload: {
      poster: response.data,
      groupId,
      videoId,
    },
  });
};

export const deleteAnimePoster = (id, videoId, groupId) => async (dispatch) => {
  await deletePoster(id);
  dispatch({
    type: DELETE_ANIME_POSTER,
    payload: { id, videoId, groupId },
  });
};
// ----------------------------- //
