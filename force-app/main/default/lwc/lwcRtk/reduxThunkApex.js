import {UIUtil} from 'c/comApUtil';
// import {NOTIFY_VARIANT_TYPE} from 'c/fdrBcrProjectUtil';

export const APEX_STATUS_TYPE = {
	APEX_START: 'APEX/START',
	APEX_FAIL: 'APEX/FAIL',
	APEX_SUCCESS: 'APEX/SUCCESS'
};

/**
 * @description redux-thunk를 통한 비동기 처리 및 dispatch action 을 처리하는 공통함수.
 * @property { boolean } payload.useReturn - async 통신 후 response를 리턴받고싶을때 true | 선언하지않으면 기본적으로 void
 * @property {function | undefined} payload.beforeAction - Apex 통신 이후 처리되기전 처리할 Action 함수.
 * @property {function | undefined} payload.afterAction - Apex 통신 이후 처리되는 dispatch Action 함수.
 * @property {function} payload.dispatch - thunk dispatch
 * @property {function} payload.apex - apex method
 * @property {string} payload.apexName - business name
 * @property {function | undefined} payload.cb - 정상진행시 처리하고자 하는 콜백함수.
 * @property {function | undefined} payload.errCb - 에러 이후 처리하고자 하는 콜백함수.
 * @property {Promise<void>}
 */
export const reduxThunkSingleApex = async ({
	useReturn = false,
	useStatus = true,
	beforeAction,
	afterAction,
	dispatch,
	apex,
	apexName = '',
	cb = undefined,
	errCb = undefined
}) => {
	let returnValue;

	try {
		if (beforeAction) beforeAction();
		if (useStatus) dispatch({type: APEX_STATUS_TYPE.APEX_START, payload: apexName});
		const result = await apex();
		if (afterAction) await afterAction(result);
		if (cb) cb(result);
		if (useStatus) dispatch({type: APEX_STATUS_TYPE.APEX_SUCCESS, payload: apexName});
		if (useReturn) returnValue = result;
	} catch (error) {
		if (useStatus) dispatch({type: APEX_STATUS_TYPE.APEX_FAIL, payload: apexName});
		if (error && error.errMsg) {
			UIUtil.comShowToast(`[Response Error] Please contact administrator`, 'error');
			console.error(`[Dev] ${error.errMsg}`);
		} else if (error.body) {
			UIUtil.comShowToast(`${error.statusText}[${error.status}] Please contact administrator`, 'error');
			if (error.body.pageErrors.length > 0)
				console.error(`[Dev] ${error.body.pageErrors[0].statusCode} | ${error.body.pageErrors[0].message}`);
			else console.error(`[Dev] ${error.body.message} | ${error.body.stackTrace}`);
		} else {
			UIUtil.comShowToast(`[Error] unknown Error. Please contact administrator`, 'error');
		}

		if (errCb) errCb();
	}

	if (useReturn) return returnValue;
};

export default {reduxThunkSingleApex, APEX_STATUS_TYPE};