import accountReducer from '@Redux/slices/account/accountSlice';
import { combineReducers } from '@reduxjs/toolkit';

export interface SliceRequest {
  loading: boolean;
  loaded: boolean;
  hasError: boolean;
  error: string;
}

export const rootReducer = combineReducers({
  account: accountReducer,
});