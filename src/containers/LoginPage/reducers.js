import { fromJS } from 'immutable';
import {
	LOGIN_PAGE_ON_LOGIN_REQUEST,
	LOGIN_PAGE_ON_RECEIVE_LOGIN_DATA,
} from './constants';

const loginPageInitialState = fromJS({
	isLoading: false,

})

function loginPageReducer(state=loginPageInitialState, action) {
	switch(action.type) {
		case LOGIN_PAGE_ON_LOGIN_REQUEST:
			return state.set('isLoading', true);
		case LOGIN_PAGE_ON_RECEIVE_LOGIN_DATA:
			return state.set('isLoading', false);
		default:
			return state;
	}
}

export default loginPageReducer;