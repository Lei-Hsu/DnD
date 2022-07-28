import { takeEvery } from 'redux-saga/effects';

import { call, put, takeLatest } from '@redux-saga/core/effects';
import { testClick } from '@Redux/slices/account/accountSlice';
import { PayloadAction } from '@reduxjs/toolkit';

// handler
function* handleLogin(action: PayloadAction<any>) {
  try {
    console.log('')
  } catch (error) {
    console.log(error)
  } finally {

  }
}

function* handleTestClick(action: PayloadAction<any>) {
  try {
    console.log('成功串接到saga')
  } catch (error) {
    console.log(error)
  } finally {

  }
}

// watcher
export function* watchLogin() {
  //   yield takeLatest(login.type, handleLogin)
}

export function* watchTestClick() {
  yield takeLatest(testClick.type, handleTestClick)
}