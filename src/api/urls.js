const DB_URL = "http://127.0.0.1:8000/";

// WATCHING API
export const API_WATCHING = DB_URL + "watching/api/";
export const API_GET_VIDEOS = API_WATCHING + "video_type/";
export const API_GET_MOVIES = API_GET_VIDEOS + "Movie/";
export const API_GET_ANIME = API_GET_VIDEOS + "Anime/";
export const API_GET_SERIALS = API_GET_VIDEOS + "Serial/";
export const API_CRUD_VIDEO = API_WATCHING + "videos/";
export const API_GET_WATCHIO_INFO = API_WATCHING + "info/";

// POSTERS API
export const API_CRUD_POSTERS = API_WATCHING + "images/";
