import axios from "axios";

import { API_GROUPS } from "./urls";

import {
  jsonConfig as json,
  jsonWithParamsConfig as paramsConf,
} from "./config";

// GROUPS API
export const getGroups = async (videoType) =>
  await axios.get(API_GROUPS, paramsConf({ videoType }));

export const addGroup = async (group) =>
  await axios.post(API_GROUPS, group, json());

export const deleteGroup = async (id) =>
  await axios.delete(`${API_GROUPS}${id}/`, json());
