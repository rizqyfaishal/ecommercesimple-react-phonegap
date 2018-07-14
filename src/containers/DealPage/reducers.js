import { fromJS } from 'immutable';
import { findIndex } from 'lodash';
import {
	DEAL_PAGE_ON_TOGGLE_TAPPED,
	DEAL_PAGE_ON_SHOW_PROFILE_DIALOG,
	DEAL_PAGE_ON_HIDE_PROFILE_DIALOG,
	TOGGLE_STATUS_BUY,
	TOGGLE_STATUS_SELL,
	DEAL_PAGE_FETCH_USER_PROFILES_DATA_REQUEST,
	DEAL_PAGE_RECEIVE_USER_PROFILES_DATA,
	DEAL_PAGE_ON_SAVE_NEW_PROFILE_REQUEST,
	DEAL_PAGE_RECEIVE_SAVED_NEW_PROFILE_DATA,
	DEAL_PAGE_RECEIVE_SAVED_NEW_PROFILE_ERRORS,
	DEAL_PAGE_ON_PROFILE_SELECTED,
	DEAL_PAGE_ON_PROFILE_TEMP_SELECTED,
	DEAL_PAGE_ON_SAVE_NEW_PROFILE_FROM_DIALOG_REQUEST
} from './constants';


const dealPageInitialState = fromJS({
	currentToggleStatus: TOGGLE_STATUS_SELL,
	currentProfile: 1,
	profiles: null,
	showProfileDialog: false,
	isLoading: false,
	isLoadingDialog: false,
	newProfileErrors: {
		profile_name: []
	},
	tempSelectedProfile: -1,
});

function dealPageReducer(state = dealPageInitialState, action) {
	switch(action.type) {
		case DEAL_PAGE_ON_SAVE_NEW_PROFILE_FROM_DIALOG_REQUEST:
			return state.set('isLoadingDialog', true);
		case DEAL_PAGE_ON_TOGGLE_TAPPED: {
			const currentStatus = state.get('currentToggleStatus');
			if(currentStatus == TOGGLE_STATUS_SELL) {
				return state.set('currentToggleStatus', TOGGLE_STATUS_BUY);
			}
			return state.set('currentToggleStatus', TOGGLE_STATUS_SELL);
		}
		case DEAL_PAGE_ON_HIDE_PROFILE_DIALOG:
			return state.set('showProfileDialog', false);
		case DEAL_PAGE_ON_SHOW_PROFILE_DIALOG:
			return state.set('showProfileDialog', true);
		case DEAL_PAGE_FETCH_USER_PROFILES_DATA_REQUEST:
			return state.set('isLoading', true);
		case DEAL_PAGE_RECEIVE_USER_PROFILES_DATA:
			return state.set('profiles', action.data.map(profile =>({ label: profile.profile_name, value: profile.id })))
									.set('isLoading', false);
		case DEAL_PAGE_ON_SAVE_NEW_PROFILE_REQUEST:
			return state.set('isLoading', true);
		case DEAL_PAGE_RECEIVE_SAVED_NEW_PROFILE_DATA:
			return state.set('isLoading', false)
									.set('isLoadingDialog', false)
									.set('profiles', [...state.get('profiles'), { label: action.data.profile_name, value: action.data.id }]);
		case DEAL_PAGE_RECEIVE_SAVED_NEW_PROFILE_ERRORS:
			return state.set('isLoading', false)
									.set('isLoadingDialog', false)
									.set('newProfileErrors', action.errors);
		case DEAL_PAGE_ON_PROFILE_SELECTED:
			return state.set('currentProfile', state.get('tempProfile'))
									.set('tempProfile', -1)
									.set('showProfileDialog', false);
		case DEAL_PAGE_ON_PROFILE_TEMP_SELECTED:
			return state.set('tempSelectedProfile', action.tempProfile);
		default:
			return state;
	}
}

export default dealPageReducer;