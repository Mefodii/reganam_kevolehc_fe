import { combineReducers } from '@reduxjs/toolkit';
import {
  name as filtersName,
  reducer as filters,
} from './filters/filtersSlice';
import {
  name as contentWatchersName,
  reducer as contentWatchers,
} from './contentWatchers/contentWatchersSlice';
import {
  name as contentListsName,
  reducer as contentLists,
} from './contentLists/contentListsSlice';
import {
  name as contentItemsName,
  reducer as contentItems,
} from './contentItems/contentItemsSlice';
import {
  name as contentMusicItemsName,
  reducer as contentMusicItems,
} from './contentMusicItems/contentMusicItemsSlice';
import {
  name as contentTracksName,
  reducer as contentTracks,
} from './contentTracks/contentTracksSlice';
import { name } from './constants';

export { name };

export const reducer = combineReducers({
  [filtersName]: filters,
  [contentWatchersName]: contentWatchers,
  [contentListsName]: contentLists,
  [contentItemsName]: contentItems,
  [contentMusicItemsName]: contentMusicItems,
  [contentTracksName]: contentTracks,
});

// TODO - check on google if feateures/slices has to be singular or plural
