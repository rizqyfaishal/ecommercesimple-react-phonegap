import {
	REGISTER_PAGE_ON_REGISTER_POST_REQUEST,
	REGISTER_PAGE_ON_RECEIVE_REGISTER_DATA,
	REGISTER_PAGE_ON_RECEIVE_REGISTER_ERRORS,
	REGISTER_PAGE_SET_PASSWORD_MATCH,
	REGISTER_PAGE_CLEAR_ERRORS,
} from './constants';

import { push } from 'react-router-redux';

import { setFlashMessage } from '../../actions';

import { userRegisterAPI } from '../../api';
import { genericRequest } from '../../request';


export function onRegisterPostRequest() {
	return {
		type: REGISTER_PAGE_ON_REGISTER_POST_REQUEST
	}
}

export function onReceiveRegisterData() {
	return {
		type: REGISTER_PAGE_ON_RECEIVE_REGISTER_DATA,
	}
}

export function onReceiveRegisterErrors(registerData, errors) {
	return {
		type: REGISTER_PAGE_ON_RECEIVE_REGISTER_ERRORS,
		errors,
		registerData
	}
}

export function setPasswordMatch(value) {
	return {
		type:REGISTER_PAGE_SET_PASSWORD_MATCH,
		value
	}
}

export function clearErrors(key) {
	return {
		type: REGISTER_PAGE_CLEAR_ERRORS,
		key
	}
}

export function onRegisterSuccess() {
	return dispatch => {
		dispatch(onReceiveRegisterData());
		dispatch(push('/login'));
		dispatch(setFlashMessage('registerSuccess', 'Registration Complete. Please Login.'));
	}
}

export function onRegisterTappedAction(data) {
	return dispatch => {
		dispatch(onRegisterPostRequest());
		return userRegisterAPI(data)
				.then(response => {
					if(response.statusText == 'Created') {
						dispatch(onRegisterSuccess());
					}
				})
				.catch(error => {
					if(error.response.status == 400) {
						dispatch(onReceiveRegisterErrors(data, error.response.data));
					}
				})
	}
}