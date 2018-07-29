import { put, call, fork } from 'redux-saga/effects';
import datepickerSaga from '../lib/datepickerSaga';
export const mainSaga = function *()
{
	yield fork(datepickerSaga);
};
export default mainSaga;