import { combineReducers } from '@reduxjs/toolkit';
import infoSlice, { name as infoSliceName } from './info/infoSlice';
import { name } from './constants';

export { name };

export const reducer = combineReducers({ [infoSliceName]: infoSlice.reducer });
