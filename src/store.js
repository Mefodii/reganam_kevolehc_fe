import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import anime from './reducers/anime';
import serials from './reducers/serials';
import movies from './reducers/movies';
import contentWatchers from './reducers/contentWatchers';
import contentLists from './reducers/contentLists';
import contentItems from './reducers/contentItems';
import contentItemParts from './reducers/contentItemParts';
import itemsFilters from './reducers/itemsFilters';
import modal from './reducers/modal';
import navigation from './reducers/navigation/navigation';
import dragAndDrop from './reducers/dragAndDrop';
import loadings from './reducers/loadings';
import {
  reducer as watchingReducer,
  name as watchingName,
} from './features/watching';
import {
  reducer as contentingReducer,
  name as contentingName,
} from './features/contenting';
import { reducer as pageReducer, name as pageName } from './features/page';

import { fetchInfo as fetchWatchingInfo } from './features/watching/info/infoSlice';
import { fetchInfo as fetchContentingInfo } from './features/contenting/info/infoSlice';

const rootReducer = combineReducers({
  anime,
  serials,
  movies,
  contentWatchers,
  contentLists,
  contentItems,
  contentItemParts,
  itemsFilters,
  modal,
  navigation,
  dndData: dragAndDrop,
  loadings,
  [watchingName]: watchingReducer,
  [contentingName]: contentingReducer,
  [pageName]: pageReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

// Actions on the page load
store.dispatch(fetchWatchingInfo());
store.dispatch(fetchContentingInfo());

export default store;
