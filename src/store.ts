import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import {
  reducer as contentItems,
  name as contentItemsName,
} from './features/contenting/contentItems/contentItemsSlice';
import {
  reducer as contentLists,
  name as contentListsName,
} from './features/contenting/contentLists/contentListsSlice';
import {
  reducer as contentMusicItems,
  name as contentMusicItemsName,
} from './features/contenting/contentMusicItems/contentMusicItemsSlice';
import {
  reducer as contentTracks,
  name as contentTracksName,
} from './features/contenting/contentTracks/contentTracksSlice';
import {
  reducer as contentWatchers,
  name as contentWatchersName,
} from './features/contenting/contentWatchers/contentWatchersSlice';
import {
  reducer as contentingFilters,
  name as contentingFiltersName,
} from './features/contenting/filters/filtersSlice';
import {
  reducer as artists,
  name as artistsName,
} from './features/listening/artists/artistsSlice';
import {
  reducer as tracks,
  name as tracksName,
} from './features/listening/tracks/tracksSlice';
import {
  reducer as filters,
  name as filtersName,
} from './features/watching/filters/filtersSlice';
import {
  reducer as groups,
  name as groupsName,
} from './features/watching/groups/groupsSlice';
import {
  reducer as loadings,
  name as loadingsName,
} from './redux/loadingsSlice';
import { reducer as page, name as pageName } from './redux/pageSlice';
import { ReduxRootName } from './util/constants';

const rootReducer = combineReducers({
  [loadingsName]: loadings,
  [pageName]: page,
  [ReduxRootName.WATCHING]: combineReducers({
    [groupsName]: groups,
    [filtersName]: filters,
  }),
  [ReduxRootName.CONTENTING]: combineReducers({
    [contentingFiltersName]: contentingFilters,
    [contentWatchersName]: contentWatchers,
    [contentListsName]: contentLists,
    [contentItemsName]: contentItems,
    [contentMusicItemsName]: contentMusicItems,
    [contentTracksName]: contentTracks,
  }),
  [ReduxRootName.LISTENING]: combineReducers({
    [tracksName]: tracks,
    [artistsName]: artists,
  }),
});

export const store = configureStore({
  reducer: rootReducer,
});

// Actions on the page load
//

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export type AppThunkApiConfig = {
  state: RootState;
  dispatch: AppDispatch;
};
