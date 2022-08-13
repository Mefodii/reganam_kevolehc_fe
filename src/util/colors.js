import {
  ANIME_URL,
  CONTENTIO_URL,
  MOVIES_URL,
  SERIALS_URL,
} from "./frontend-urls";

const ANIME_THEME = "anime-theme";
const SERIALS_THEME = "serials-theme";
const MOVIES_THEME = "movies-theme";
const DEFAULT_THEME = "default-theme";

export const getThemeForUrl = (url) => {
  if (url.includes(ANIME_URL)) return ANIME_THEME;
  if (url.includes(SERIALS_URL)) return SERIALS_THEME;
  if (url.includes(MOVIES_URL)) return MOVIES_THEME;
  if (url.includes(CONTENTIO_URL)) return ANIME_THEME;
  return DEFAULT_THEME;
};
