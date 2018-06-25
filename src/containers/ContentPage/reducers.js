import { fromJS } from 'immutable';
import {
	CONTENT_PAGE_ON_BOTTOM_NAVBAR_TAP,
	BOTTOM_NAVBAR_MY_OFFER,
	BOTTOM_NAVBAR_SHOPPING_LIST,
	BOTTOM_NAVBAR_ACCOUNT,
	BOTTOM_NAVBAR_CONTACTS,
	BOTTOM_NAVBAR_COMING_SOON,
} from './constants';

const contentPageIntialState = fromJS({
	currentBottomNavBar: BOTTOM_NAVBAR_MY_OFFER,
})


const contentPageReducer = function(state = contentPageIntialState, action) {
	switch(action.type) {
		case CONTENT_PAGE_ON_BOTTOM_NAVBAR_TAP:
			return state.set('currentBottomNavBar', action.nextNav);
		default:
			return state;
	}
}

export default contentPageReducer;