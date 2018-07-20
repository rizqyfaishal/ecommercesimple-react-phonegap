import { fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

import {
  SHOPPING_LIST_PAGE_ON_CUSTOM_TAB_TAP,
  SHOPPING_LIST_PAGE_CUSTOM_TAB_SELLER
} from './constants';


const shoppingListPageInitialState = fromJS({
  currentTab: SHOPPING_LIST_PAGE_CUSTOM_TAB_SELLER,
});


function shoppingListPageReducer(state=shoppingListPageInitialState, action) {
  switch(action.type) {
    case LOCATION_CHANGE:
      return shoppingListPageInitialState;
    case SHOPPING_LIST_PAGE_ON_CUSTOM_TAB_TAP:
      return state.set('currentTab', action.currentTab);
    default:
      return state;
  }
}

export default shoppingListPageReducer;