const DB_URL = 'http://127.0.0.1:8000/';

// WATCHING API
export const API_WATCHING = DB_URL + 'watching/api/';
export const API_VIDEOS = API_WATCHING + 'videos/';
export const API_GROUPS = API_WATCHING + 'groups/';
export const API_POSTERS = API_WATCHING + 'images/';

// CONTENTING API
export const API_CONTENTING = DB_URL + 'contenting/api/';
export const API_CONTENT_LISTS = API_CONTENTING + 'contentLists/';
export const API_CONTENT_ITEMS = API_CONTENTING + 'contentItems/';
export const API_CONTENT_MUSIC_ITEMS = API_CONTENTING + 'contentMusicItems/';
export const API_CONTENT_TRACKS = API_CONTENTING + 'contentTracks/';
export const API_CONTENT_WATCHERS = API_CONTENTING + 'contentWatchers/';

// LISTENING API
export const API_LISTENING = DB_URL + 'listening/api/';
export const API_TRACKS = API_LISTENING + 'tracks/';
export const API_ARTISTS = API_LISTENING + 'artists/';
