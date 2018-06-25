import { fromJS } from 'immutable';
import {
	DEAL_PAGE_ON_TOGGLE_TAPPED,
	DEAL_PAGE_ON_SHOW_PROFILE_DIALOG,
	DEAL_PAGE_ON_HIDE_PROFILE_DIALOG,
	TOGGLE_STATUS_BUY,
	TOGGLE_STATUS_SELL,
} from './constants';


const dealPageInitialState = fromJS({
	currentToggleStatus: TOGGLE_STATUS_SELL,
	currentProfile: 1,
	profiles: [
		{
			label: 'Profile 1',
			value: 1
		},
		{
			label: 'Profile 2',
			value: 2
		},
		{
			label: 'Profile 3',
			value: 3
		},
		{
			label: 'Profile 4',
			value: 4
		},
	],
	showProfileDialog: false,
});

function dealPageReducer(state = dealPageInitialState, action) {
	switch(action.type) {
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
		default:
			return state;
	}
}

export default dealPageReducer;