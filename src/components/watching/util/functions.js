import { getToday, initArray } from "../../../util/functions";

const FINISHED = "Finished";

export const isFinished = (status) => status === FINISHED;

export const setVideoFinished = (video) => ({
  ...video,
  status: FINISHED,
  current_episode: video.episodes,
  watched_date: getToday(),
});

export const setGroupFinished = (group) => ({
  ...group,
  status: FINISHED,
  watched_date: getToday(),
});

export const addAliasFields = (aliases, count = 1) => [
  ...aliases,
  ...initArray(count, ""),
];

export const removeAliasField = (aliases) => [...aliases.slice(0, -1)];

export const cleanAliases = (aliases) => {
  return aliases
    .map((alias) => alias.trim())
    .filter((alias) => alias.length > 0);
};
