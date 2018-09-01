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
import fillAdditionalInformationPageReducer from './containers/FillAdditionalInformationPage/reducers';
import contactPageReducer from './containers/ContactPage/reducers';
import makeDealReducer from './containers/MakeDealPage/reducers';
import accountPageReducer from './containers/AccountPage/reducers';
import myDealPageReducer from './containers/MyDealPage/reducers';
import editDealPageReducer from './containers/EditDealPage/reducers';
import invoiceSellerPageReducer from './containers/InvoiceSellerPage/reducers';
import invoiceBuyerPageReducer from './containers/InvoiceBuyerPage/reducers';
import invoiceBuyerDetailPageReducer from './containers/InvoiceBuyerDetailPage/reducers';
import invoiceSellerDetailPageReducer from './containers/InvoiceSellerDetailPage/reducers';


import {
  MAKE_DEAL_PAGE_FETCH_USER_CONTACTS_DATA_REQUEST,
  MAKE_DEAL_PAGE_RECEIVE_USER_CONTACTS_DATA
} from './containers/MakeDealPage/constants';

import {
  DEAL_PAGE_FETCH_USER_PROFILES_DATA_REQUEST,
  DEAL_PAGE_RECEIVE_USER_PROFILES_DATA
} from './containers/DealPage/constants';

import {
  GLOBAL_SET_FLASH_MESSAGE,
  GLOBAL_UNSET_FLASH_MESSAGE,
  GLOBAL_CLEAR_FLASH_MESSAGE,
  GLOBAL_ON_VERIFY_TOKEN,
  GLOBAL_ON_VERIFY_TOKEN_SUCCESS,
  GLOBAL_ON_VERIFY_TOKEN_ERROR,
  GLOBAL_ON_LOGOUT,
  GLOBAL_ON_RENDER,
} from './constants';


import {
    LOGIN_PAGE_ON_RECEIVE_LOGIN_DATA,
    LOGIN_PAGE_ON_LOGIN_REQUEST,
    LOGIN_PAGE_ON_RECEIVE_LOGIN_ERRORS
} from './containers/LoginPage/constants';

import {
  ACCOUNT_PAGE_RECEIVE_ACCOUNT_INFO_DATA,
  ACCOUNT_PAGE_RECEIVE_ADDRESS_DATA,
  ACCOUNT_PAGE_RECEIVE_PAYMENT_METHOD_DATA
} from './containers/AccountPage/constants';

import {
  FILL_ADDITIONAL_INFORMATION_PAGE_ON_RECEIVE_RESPONSE_DATA
} from './containers/FillAdditionalInformationPage/constants';

import {
  CONTACT_PAGE_RECEIVE_SAVED_USER_CONTACTS_DATA
} from './containers/ContactPage/constants';

const routeInitialState = fromJS({
  location: null,
});


const globalInitialState = fromJS({
  userData: null,
  flashMessages: {},
  isLoggedIn: false,
  isLoading: false,
  render: false,
  contactsData: [],
  profiles: null
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
    case ACCOUNT_PAGE_RECEIVE_PAYMENT_METHOD_DATA:
    case ACCOUNT_PAGE_RECEIVE_ADDRESS_DATA:
      return state.set('userData', { ...state.get('userData'), ...action.data });
    case ACCOUNT_PAGE_RECEIVE_ACCOUNT_INFO_DATA:
      return state.set('userData', { ...state.get('userData'), ...action.data });
    case CONTACT_PAGE_RECEIVE_SAVED_USER_CONTACTS_DATA:
      return state.set('contactsData', fromJS([...state.get('contactsData'), 
        ...action.data.map(contact => 
          ({ label: `${contact.profile.profile_name} (${contact.profile.user.first_name} ${contact.profile.user.last_name} - ${contact.profile.user.phone_number})`, 
                                                        value: contact.profile.id, data: contact }))]));
    case MAKE_DEAL_PAGE_FETCH_USER_CONTACTS_DATA_REQUEST:
      return state.set('isLoading', true);
    case MAKE_DEAL_PAGE_RECEIVE_USER_CONTACTS_DATA:
      return state.set('isLoading', false)
                  .set('contactsData', fromJS([...state.get('contactsData'), 
        ...action.data.map(contact => 
          ({ label: `${contact.profile.profile_name} (${contact.profile.user.first_name} ${contact.profile.user.last_name} - ${contact.profile.user.phone_number})`, 
                                                        value: contact.profile.id, data: contact }))]));
    case DEAL_PAGE_RECEIVE_USER_PROFILES_DATA:
      return state.set('isLoading', false);
    case DEAL_PAGE_FETCH_USER_PROFILES_DATA_REQUEST:
      return state.set('isLoading', true);
    case LOCATION_CHANGE:
      return state.set('flashMessages', {});
    case GLOBAL_ON_RENDER:
      return state.set('render', true);
    case GLOBAL_ON_LOGOUT:
      return globalInitialState.set('render', true);
    case GLOBAL_SET_FLASH_MESSAGE:
      return state.set('flashMessages', 
        { ...state.get('flashMessages'), [action.key]: action.message});
    case GLOBAL_CLEAR_FLASH_MESSAGE:
      return state.set('flashMessages', fromJS({}));
    case GLOBAL_UNSET_FLASH_MESSAGE: {
      const flashMessages = state.get('flashMessages');
      const newFlashMessage = unset(flashMessages, action.key);
      return state.set('flashMessages', { ...newFlashMessage });
    }
    case LOGIN_PAGE_ON_LOGIN_REQUEST:
      return state.set('isLoading', true);
    case LOGIN_PAGE_ON_RECEIVE_LOGIN_DATA:{
      return state.set('userData', action.data.user)
                  .set('isLoggedIn', true)
                  .set('isLoading', false);
    }
    case LOGIN_PAGE_ON_RECEIVE_LOGIN_ERRORS:
      return state.set('isLoading', false);
    case GLOBAL_ON_VERIFY_TOKEN_SUCCESS:
      return state.set('userData', action.data.user)
                  .set('isLoading', false)
                  .set('isLoggedIn', true);
    case GLOBAL_ON_VERIFY_TOKEN_ERROR:
      return state.set('userData', null)
                  .set('isLoading', false)
                  .set('isLoggedIn', false);
    case GLOBAL_ON_VERIFY_TOKEN:
      return state.set('isLoading', true);
    case FILL_ADDITIONAL_INFORMATION_PAGE_ON_RECEIVE_RESPONSE_DATA: {
      return state.set('userData', action.data)
    }      
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
    fillAdditionalInformationPage: fillAdditionalInformationPageReducer,
    contactPage: contactPageReducer,
    makeDealPage: makeDealReducer,
    accountPage: accountPageReducer,
    myDealPage: myDealPageReducer,
    invoiceSellerPage: invoiceSellerPageReducer,
    invoiceBuyerPage: invoiceBuyerPageReducer,
    invoiceBuyerDetailPage: invoiceBuyerDetailPageReducer,
    invoiceSellerDetailPage: invoiceSellerDetailPageReducer,
    editDealPage: editDealPageReducer,
    ...injectedReducers,
  });
}
