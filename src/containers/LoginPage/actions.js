import {
	LOGIN_PAGE_ON_LOGIN_REQUEST,
	LOGIN_PAGE_ON_RECEIVE_LOGIN_DATA,
} from './constants';

import auth from '../../auth';

export function onLoginRequest() {
	return {
		type: LOGIN_PAGE_ON_LOGIN_REQUEST
	}
}

export function onReceiveLoginData(data) {
	return {
		type: LOGIN_PAGE_ON_RECEIVE_LOGIN_DATA,
		data
	}
}

export function onLoginTap(username, password) {
	return (dispatch) => {
		dispatch(onLoginRequest());
		console.log(username, password);
		return auth.login(username, password)
			.then(status => {
				if(status) {
					console.log(status);
				}
			})
	}
}