import {
	FILL_ADDITIONAL_INFORMATION_PAGE_SET_ENABLE_BUTTON,
	FILL_ADDITIONAL_INFORMATION_PAGE_SET_DISABLE_BUTTON,
	FILL_ADDITIONAL_INFORMATION_PAGE_ON_SAVE_TAPPED,
  FILL_ADDITIONAL_INFORMATION_PAGE_ON_SAVE_REQUEST,
  FILL_ADDITIONAL_INFORMATION_PAGE_ON_RECEIVE_RESPONSE_DATA,
  FILL_ADDITIONAL_INFORMATION_PAGE_ON_RECEIVE_RESPONSE_ERRORS
} from './constants';

import { userPostAdditionalInformation } from '../../api';

export function setEnableButton() {
	return {
		type: FILL_ADDITIONAL_INFORMATION_PAGE_SET_ENABLE_BUTTON,
	}
}

export function setDisableButton() {
	return {
		type: FILL_ADDITIONAL_INFORMATION_PAGE_SET_DISABLE_BUTTON,
	}
}

export function onSaveRequest(data) {
	return {
		type: FILL_ADDITIONAL_INFORMATION_PAGE_ON_SAVE_REQUEST,
		data
	}
}

export function onReceiveResponseData(data) {
	return {
		type: FILL_ADDITIONAL_INFORMATION_PAGE_ON_RECEIVE_RESPONSE_DATA,
		data
	}
}

export function onReceiveResponseErrors(errors) {
	return {
		type: FILL_ADDITIONAL_INFORMATION_PAGE_ON_RECEIVE_RESPONSE_ERRORS,
		errors
	}
}

export function onSaveTappedAction(address, payment_method) {
	return dispatch => {
		dispatch(onSaveRequest({ address, payment_method }));
		userPostAdditionalInformation({ address, payment_method })
			.then(response => {
				if(response.status == 201) {
					dispatch(onReceiveResponseData(response.data));
				}
			})
			.catch(error => {
				if(error.response.status == 400) {
					dispatch(onReceiveResponseErrors(error.response.data));
				}
			})
	}
}