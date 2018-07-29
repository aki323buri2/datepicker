import { put, call, fork, takeLatest } from 'redux-saga/effects';
import moment from 'moment';
export const datepickerSaga = function *()
{
	yield fork(function *()
	{
		yield put({ type: 'DAY', payload: moment().add(-1, 'days') });
	});
};
export default datepickerSaga;