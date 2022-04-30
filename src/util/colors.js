const ANIME_THEME = "anime-theme";
const SERIALS_THEME = "serials-theme";
const MOVIES_THEME = "movies-theme";
const DEFAULT_THEME = "default-theme";

export const getThemeForUrl = (url) => {
  if (url.includes("anime")) return ANIME_THEME;
  if (url.includes("serials")) return SERIALS_THEME;
  if (url.includes("movies")) return MOVIES_THEME;
  return DEFAULT_THEME;
};
