import { combineReducers } from '@reduxjs/toolkit';
import { name as infoSliceName, reducer as info } from './info/infoSlice';
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
  name as contentItemPartsName,
  reducer as contentItemParts,
} from './contentItemParts/contentItemPartsSlice';
import { name } from './constants';

export { name };

export const reducer = combineReducers({
  [infoSliceName]: info,
  [filtersName]: filters,
  [contentWatchersName]: contentWatchers,
  [contentListsName]: contentLists,
  [contentItemsName]: contentItems,
  [contentItemPartsName]: contentItemParts,
});
