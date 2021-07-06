import axios from "axios";

import { API_GROUPS, API_POSTERS, API_GET_WATCHIO_INFO } from "./urls";

import {
  jsonConfig as json,
  jsonWithParamsConfig as paramsConf,
  formDataConfig as formConf,
} from "./config";

// GROUPS API
export const getGroups = async (videoType) =>
  await axios.get(API_GROUPS, paramsConf({ videoType }));

export const addGroup = async (group) =>
  await axios.post(API_GROUPS, group, json());

export const deleteGroup = async (id) =>
  await axios.delete(`${API_GROUPS}${id}/`, json());
// ----------------------------- //

// POSTERS API
export const addPoster = async (poster) =>
  await axios.post(API_POSTERS, poster, formConf());

export const deletePoster = async (id) =>
  await axios.delete(`${API_POSTERS}${id}/`, json());
// ----------------------------- //

// OTHER API
export const getInfo = async () =>
  await axios.get(API_GET_WATCHIO_INFO, json());
// ----------------------------- //
