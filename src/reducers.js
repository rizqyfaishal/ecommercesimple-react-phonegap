/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux-immutable';
import { fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import { unset } from 'lodash';

import contentPageReducer from './containers/ContentPage/reducers';
import dealPageReducer from './containers/DealPage/reducers';
import shoppingListPageReducer from './containers/ShoppingListPage/reducers';
import loginPageReducer from './containers/LoginPage/reducers';
import registerPageReducer from './containers/RegisterPage/reducers';




import {
  GLOBAL_SET_FLASH_MESSAGE,
  GLOBAL_UNSET_FLASH_MESSAGE,
  GLOBAL_CLEAR_FLASH_MESSAGE,
} from './constants';


import {
    LOGIN_PAGE_ON_RECEIVE_LOGIN_DATA,
    LOGIN_PAGE_ON_LOGIN_REQUEST
} from './containers/LoginPage/constants';


const routeInitialState = fromJS({
  location: null,
});


const globalInitialState = fromJS({
  userData: null,
  flashMessages: {}
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
    case GLOBAL_SET_FLASH_MESSAGE:
      return state.set('flashMessages', 
        fromJS({ ...state.get('flashMessages').toJS(), [action.key]: action.message}));
    case GLOBAL_CLEAR_FLASH_MESSAGE:
      return state.set('flashMessages', fromJS({}));
    case GLOBAL_UNSET_FLASH_MESSAGE: {
      const flashMessages = state.get('flashMessages').toJS();
      const newFlashMessage = unset(flashMessages, action.key);
      return state.set('flashMessages', fromJS({ ...newFlashMessage }));
    }
    case LOGIN_PAGE_ON_LOGIN_REQUEST:
      return state.set('isLoading', true);
    case LOGIN_PAGE_ON_RECEIVE_LOGIN_DATA:
      return state.set('userData', action.data)
                  .set('isLoading', false);
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
    registerPage: registerPageReducer,
    route: routeReducer,
    ...injectedReducers,
  });
}
