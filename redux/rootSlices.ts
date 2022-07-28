import accountReducer from '@Redux/slices/account/accountSlice';
import { combineReducers } from '@reduxjs/toolkit';

export const rootReducer = combineReducers({
    account: accountReducer,
});