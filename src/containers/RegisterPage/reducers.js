import { fromJS } from 'immutable';
import {
	REGISTER_PAGE_ON_REGISTER_POST_REQUEST,
	REGISTER_PAGE_ON_RECEIVE_REGISTER_DATA,
	REGISTER_PAGE_ON_RECEIVE_REGISTER_ERRORS,
	REGISTER_PAGE_SET_PASSWORD_MATCH,
	REGISTER_PAGE_CLEAR_ERRORS,
} from './constants';

const registerPageInitialState = fromJS({
	isLoading: false,
	errors: {
		username: [],
		email: [],
		first_name: [],
		last_name: [],
		password: []
	},
	registerData: {},
	passwordMatch: false,
})

function registerPageReducer(state=registerPageInitialState, action) {
	switch(action.type) {
		case REGISTER_PAGE_CLEAR_ERRORS: {
			console.log(action.key);
			let errors = state.get('errors').toJS();
			errors = {
				...errors,
				[action.key]: []
			}
			console.log(errors);
			return state.set('errors', fromJS(errors));
		}
		case REGISTER_PAGE_SET_PASSWORD_MATCH:
			return state.set('passwordMatch', action.value);
		case REGISTER_PAGE_ON_REGISTER_POST_REQUEST:
			return state.set('isLoading', true);
		case REGISTER_PAGE_ON_RECEIVE_REGISTER_DATA:
			return state.set('isLoading', false);
		case REGISTER_PAGE_ON_RECEIVE_REGISTER_ERRORS:
			return state.set('isLoading', false)
									.set('registerData', action.registerData)
									.set('errors', action.errors)
									.set('passwordMatch', false);
		default:
			return state;
	}
}

export default registerPageReducer;