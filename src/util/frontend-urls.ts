export const DEFAULT_IMAGE =
  window.location.origin + '/static/icons/image-placeholder.png';

export const ANIME_BACKGROUND =
  window.location.origin + '/static/icons/anime-background.jpg';
export const MOVIES_BACKGROUND =
  window.location.origin + '/static/icons/movies-background.jpg';
export const SERIALS_BACKGROUND =
  window.location.origin + '/static/icons/serials-background.avif';

// LOGO ICONS
export const IMDB_LOGO = window.location.origin + '/static/icons/imdb_logo.png';
export const ANIME9_LOGO =
  window.location.origin + '/static/icons/9anime_logo.png';
export const MAL_LOGO = window.location.origin + '/static/icons/mal_logo.png';
export const DEFAULT_CLIP_LOGO =
  window.location.origin + '/static/icons/default_clip_logo.png';

export const getLogoFromLink = (link: string) => {
  if (link.startsWith('https://9anime.to/')) return ANIME9_LOGO;
  if (link.startsWith('https://www.imdb.com/')) return IMDB_LOGO;
  if (link.startsWith('https://myanimelist.net/')) return MAL_LOGO;

  return DEFAULT_CLIP_LOGO;
};

export enum FE_URL {
  HELPERS = '/helpers',
  GAMING = '/gameio',
  READING = '/readio',
  CONTENTING = '/contentio',
  CONTENT_WATCHER = '/contentio/content_watcher',
  AUDIO = '/audio',
  //
  WATCHING = '/watchio',
  MOVIES = '/watchio/movies',
  SERIALS = '/watchio/serials',
  ANIME = '/watchio/anime',
}
