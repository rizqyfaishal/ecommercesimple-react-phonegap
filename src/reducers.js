/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux-immutable';
import { fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

import contentPageReducer from './containers/ContentPage/reducers';
import dealPageReducer from './containers/DealPage/reducers';
import shoppingListPageReducer from './containers/ShoppingListPage/reducers';
import loginPageReducer from './containers/LoginPage/reducers';

import {
    LOGIN_PAGE_ON_RECEIVE_LOGIN_DATA,
} from './containers/LoginPage/constants';


const routeInitialState = fromJS({
  location: null,
});


const globalInitialState = fromJS({
  userData: null
});
/**
 * Merge route into the global application state
 */
function routeReducer(state = routeInitialState, action) {
  switch (action.type) {
    /* istanbul ignore next */
    case LOCATION_CHANGE:
      return state.merge({
        location: action.payload,
      });
    default:
      return state;
  }
}

function globalReducer(state = globalInitialState, action) {
  switch(action.type) {
    case LOGIN_PAGE_ON_RECEIVE_LOGIN_DATA:
      return state.set('userData', action.data);
    default:
      return state;
  }
}

/**
 * Creates the main reducer with the dynamically injected ones
 */

export default function createReducer(injectedReducers) {
  return combineReducers({
    global: globalReducer,
    contentPage: contentPageReducer,
    shoppingListPage: shoppingListPageReducer,
    loginPage: loginPageReducer,
    dealPage: dealPageReducer,
    route: routeReducer,
    ...injectedReducers,
  });
}
