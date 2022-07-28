import { all, fork } from 'redux-saga/effects';

import * as accountSaga from '@Redux/sagas/account/accountSaga';

export function* rootSaga() {
  yield all([...Object.values(accountSaga)].map(fork));
}