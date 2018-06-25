import { fromJS } from 'immutable';
import {
	SHOPPING_LIST_PAGE_ON_CUSTOM_TAB_TAP,
	SHOPPING_LIST_PAGE_CUSTOM_TAB_BUYER
} from './constants';


const shoppingListPageInitialState = fromJS({
	currentTab: SHOPPING_LIST_PAGE_CUSTOM_TAB_BUYER,
});


function shoppingListPageReducer(state=shoppingListPageInitialState, action) {
	switch(action.type) {
		case SHOPPING_LIST_PAGE_ON_CUSTOM_TAB_TAP:
			return state.set('currentTab', action.currentTab);
		default:
			return state;
	}
}

export default shoppingListPageReducer;