import accountReducer from '@Redux/slices/account/accountSlice';
import globalReducer from '@Redux/slices/global/globalSlice';
import mainReducer from '@Redux/slices/main/mainSlice';
import { combineReducers } from '@reduxjs/toolkit';

export interface SliceRequest {
  loading: boolean;
  loaded: boolean;
  hasError: boolean;
  error: string;
}

export const rootReducer = combineReducers({
  account: accountReducer,
  main: mainReducer,
  global: globalReducer,
});