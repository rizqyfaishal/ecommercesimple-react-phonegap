import { push } from 'react-router-redux';
import auth from './auth';

import {
	GLOBAL_SET_FLASH_MESSAGE,
	GLOBAL_UNSET_FLASH_MESSAGE,
	GLOBAL_CLEAR_FLASH_MESSAGE,
	GLOBAL_ON_LOGOUT,
	GLOBAL_ON_VERIFY_TOKEN,
	GLOBAL_ON_VERIFY_TOKEN_SUCCESS,
	GLOBAL_ON_VERIFY_TOKEN_ERROR,
	GLOBAL_ON_RENDER
} from './constants';

export function setFlashMessage(key, message) {
	return {
		type: GLOBAL_SET_FLASH_MESSAGE,
		message,
		key
	}
}

export function unsetFlashMessage(key) {
	return {
		type: GLOBAL_UNSET_FLASH_MESSAGE,
		key
	}
}

export function onRender() {
	return {
		type: GLOBAL_ON_RENDER
	}
}

export function clearFlashMessage() {
	return {
		type: GLOBAL_CLEAR_FLASH_MESSAGE,
	}
}

export function onLogout() {
	return {
		type: GLOBAL_ON_LOGOUT
	}
}

export function onVerifyTokenSuccess(data) {
	return {
		type: GLOBAL_ON_VERIFY_TOKEN_SUCCESS,
		data
	}
}

export function onVerifyTokenError() {
	return {
		type: GLOBAL_ON_VERIFY_TOKEN_ERROR
	}
}

export function onLogoutTapped() {
	return dispatch => {
		window.localStorage.clear()
		dispatch(onLogout());
		dispatch(push('/login'));
	}
}

export function onVerifyToken() {
	return {
		type: GLOBAL_ON_VERIFY_TOKEN
	}
}

export function onVerifyTokenAction() {
	const token = window.localStorage.getItem('auth-token');
	return dispatch => {
		dispatch(onVerifyToken());
		auth.verify(token)
			.then(response => {
				if(response.status == 200) {
					window.localStorage.setItem('auth-token', response.data.token);
					dispatch(onVerifyTokenSuccess(response.data));
					dispatch(onRender());
					dispatch(push('/content/deal/make'));
				}
			})
			.catch(error => {
				if(error.response.status == 400) {
					window.localStorage.clear();
					dispatch(onVerifyTokenError());
					dispatch(onRender());
					dispatch(push('/'));
				}
			})
	}
}
