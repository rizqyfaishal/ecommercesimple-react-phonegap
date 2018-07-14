import { fromJS } from 'immutable';
import {
	LOGIN_PAGE_ON_LOGIN_REQUEST,
	LOGIN_PAGE_ON_RECEIVE_LOGIN_DATA,
	LOGIN_PAGE_ON_RECEIVE_LOGIN_ERRORS,
	LOGIN_PAGE_ON_LOGIN_TAP,
	LOGIN_PAGE_CLEAR_ERRORS,
	LOGIN_PAGE_SET_BUTTON_ENABLED,
	LOGIN_PAGE_SET_BUTTON_DISABLED
} from './constants';

const loginPageInitialState = fromJS({
	errors: [],
	formData: {
		username: null,
		password: null
	},
	buttonEnabled: false
})

function loginPageReducer(state = loginPageInitialState, action) {
	switch(action.type) {
		case LOGIN_PAGE_ON_LOGIN_TAP:
			return state.set('formData', action.data);
		case LOGIN_PAGE_ON_RECEIVE_LOGIN_ERRORS:
			return state.set('errors', action.errors.non_field_errors);
		case LOGIN_PAGE_ON_RECEIVE_LOGIN_DATA:
			return loginPageInitialState;
		case LOGIN_PAGE_CLEAR_ERRORS:
			return state.set('errors', []);
		case LOGIN_PAGE_SET_BUTTON_ENABLED:
			return state.set('buttonEnabled', true);
		case LOGIN_PAGE_SET_BUTTON_DISABLED:
			return state.set('buttonEnabled', false);
		default:
			return state;
	}
}

export default loginPageReducer;