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

const rootReducer = combineReducers({
  [loadingsName]: loadings,
  [pageName]: page,
  [watchingName]: watching,
  [contentingName]: contenting,
});

const store = configureStore({
  reducer: rootReducer,
});

// Actions on the page load

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
