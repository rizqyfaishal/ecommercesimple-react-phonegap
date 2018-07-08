import { fromJS } from 'immutable';
import {
	LOGIN_PAGE_ON_LOGIN_REQUEST,
	LOGIN_PAGE_ON_RECEIVE_LOGIN_DATA,
} from './constants';

const loginPageInitialState = fromJS({

})

function loginPageReducer(state = loginPageInitialState, action) {
	switch(action.type) {
		default:
			return state;
	}
}

export default loginPageReducer;