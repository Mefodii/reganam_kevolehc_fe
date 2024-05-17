// import {
//   ANIME_URL,
//   CONTENTING_URL,
//   MOVIES_URL,
//   SERIALS_URL,
// } from "./frontend-urls";

enum Themes {
  DEFAULT = 'default-theme',
  ANIME_THEME = 'anime-theme',
  SERIALS_THEME = 'serials-theme',
  MOVIES_THEME = 'movies-theme',
  DARK_THEME = 'dark-theme',
}

export const getThemeForUrl = (url: string) => {
  // if (url.includes(ANIME_URL)) return DARK_THEME;
  // if (url.includes(SERIALS_URL)) return DARK_THEME;
  // if (url.includes(MOVIES_URL)) return DARK_THEME;
  // if (url.includes(CONTENTING_URL)) return DARK_THEME;
  return Themes.DEFAULT;
};
