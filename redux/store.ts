import { Action } from 'redux';

import createSagaMiddleware from '@redux-saga/core';
import { configureStore, ThunkAction } from '@reduxjs/toolkit';

import { rootSaga } from './rootSaga';
import { rootReducer } from './rootSlices';

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];

const store = configureStore({
    reducer: rootReducer,
    middleware: middleware,
});

sagaMiddleware.run(rootSaga);

export default store;

export type AppDispatch = typeof store.dispatch;
export type AppState = typeof store.getState;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
