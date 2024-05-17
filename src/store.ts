import { ThunkAction, configureStore, Action } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { reducer as watching, name as watchingName } from './features/watching';
import {
  reducer as contenting,
  name as contentingName,
} from './features/contenting';
import { reducer as page, name as pageName } from './redux/pageSlice';
import {
  name as loadingsName,
  reducer as loadings,
} from './redux/loadingsSlice';
import {
  name as dragAndDropName,
  reducer as dragAndDrop,
} from './redux/dragAndDropSlice';

import { fetchInfo as fetchWatchingInfo } from './features/watching/info/infoSlice';
import { fetchInfo as fetchContentingInfo } from './features/contenting/info/infoSlice';

const rootReducer = combineReducers({
  [dragAndDropName]: dragAndDrop,
  [loadingsName]: loadings,
  [pageName]: page,
  [watchingName]: watching,
  [contentingName]: contenting,
});

const store = configureStore({
  reducer: rootReducer,
});

// Actions on the page load
store.dispatch(fetchWatchingInfo());
store.dispatch(fetchContentingInfo());

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
