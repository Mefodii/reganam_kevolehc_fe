const ANIME_THEME = "anime-theme";
const DEFAULT_THEME = "default-theme";

export const getThemeForUrl = (url) => {
  if (url.includes("anime")) return ANIME_THEME;
  return DEFAULT_THEME;
};
