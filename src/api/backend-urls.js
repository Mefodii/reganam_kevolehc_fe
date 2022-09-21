const DB_URL = "http://127.0.0.1:8000/";

// WATCHING API
export const API_WATCHING = DB_URL + "watching/api/";
export const API_VIDEOS = API_WATCHING + "videos/";
export const API_GROUPS = API_WATCHING + "groups/";
export const API_WATCHING_INFO = API_WATCHING + "info/";

// CONTENTING API
export const API_CONTENTING = DB_URL + "contenting/api/";
export const API_CONTENT_LISTS = API_CONTENTING + "contentLists/";
export const API_CONTENT_ITEMS = API_CONTENTING + "contentItems/";
export const API_CONTENT_ITEM_PARTS = API_CONTENTING + "contentItemParts/";
export const API_CONTENT_WATCHERS = API_CONTENTING + "contentWatchers/";
export const API_CONTENTING_INFO = API_CONTENTING + "info/";

// POSTERS API
export const API_POSTERS = API_WATCHING + "images/";
