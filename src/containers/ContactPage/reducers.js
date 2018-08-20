import { fromJS } from 'immutable';
import { findIndex } from 'lodash';
import { LOCATION_CHANGE } from 'react-router-redux';
import {  
  CONTACT_PAGE_FETCH_USER_CONTACTS_REQUEST,
  CONTACT_PAGE_RECEIVE_USER_CONTACTS_DATA,
  CONTACT_PAGE_ON_USER_SELECT_CONTACTS,
  CONTACT_PAGE_ON_USER_REMOVE_CONTACTS,
  CONTACT_PAGE_ON_USER_SAVE_CONTACTS_REQUEST,
  CONTACT_PAGE_RECEIVE_SAVED_USER_CONTACTS_DATA,
  CONTACT_PAGE_FETCH_ALL_CONTACTS_REQUEST,
  CONTACT_PAGE_RECEIVE_ALL_CONTACTS_DATA,
  CONTACT_PAGE_RECEIVE_ALL_CONTACTS_ERRORS,
  CONTACT_PAGE_SHOW_ALERT,
  CONTACT_PAGE_HIDE_ALERT,
  CONTACT_PAGE_ON_USER_SEARCH_CONTACT,
  CONTACT_PAGE_RECEIVE_IMPORTED_CONTACT_FROM_PHONEBOOK,
  CONTACT_PAGE_IMPORT_CONTACTS_FROM_PHONEBOOK_REQUEST
} from './constants';

const contactPageInitialState = fromJS({
  isLoading: false,
  selectedContacts: [],
  contactsData: [],
  showAlert: false,
  searchKey: ''
});

function contactPageReducer(state=contactPageInitialState, action) {
  switch(action.type) {
    case CONTACT_PAGE_IMPORT_CONTACTS_FROM_PHONEBOOK_REQUEST:
      return state.set('isLoading', true);
    case CONTACT_PAGE_RECEIVE_IMPORTED_CONTACT_FROM_PHONEBOOK:
      return state.set('isLoading', false)
                  .update('contactsData', contactsData => contactsData.push(action.data));
    case LOCATION_CHANGE:
      return contactPageInitialState;
    case CONTACT_PAGE_ON_USER_SEARCH_CONTACT:
      return state.set('searchKey', action.key);
    case CONTACT_PAGE_HIDE_ALERT:
      return state.set('showAlert', false)
                  .set('selectedContacts', []);
    case CONTACT_PAGE_SHOW_ALERT:
      return state.set('showAlert', true);
    case CONTACT_PAGE_FETCH_ALL_CONTACTS_REQUEST:
      return state.set('isLoading', true);
    case CONTACT_PAGE_RECEIVE_ALL_CONTACTS_DATA:
      return state.set('isLoading', false)
                  .set('contactsData', action.data);
    case CONTACT_PAGE_RECEIVE_ALL_CONTACTS_ERRORS:
      return state.set('isLoading', false);
    case CONTACT_PAGE_FETCH_USER_CONTACTS_REQUEST:
      return state.set('isLoading', true);
    case CONTACT_PAGE_RECEIVE_USER_CONTACTS_DATA:
      return state.set('isLoading', false)
                  .set('contactsData', action.data);
    case CONTACT_PAGE_ON_USER_SAVE_CONTACTS_REQUEST:
      return state.set('isLoading', true);
    case CONTACT_PAGE_RECEIVE_SAVED_USER_CONTACTS_DATA:
      return state.set('isLoading', false)
                  .set('contactsData', [...state.get('contactsData'), ...action.data.contact_users]);
    case CONTACT_PAGE_ON_USER_SELECT_CONTACTS:
      return state.set('selectedContacts', action.selectedContacts);
    case CONTACT_PAGE_ON_USER_REMOVE_CONTACTS:{
      const index = findIndex(state.get('selectedContacts'), action.selectedContact);
      return state.set('selectedContacts', [
          ...state.get('selectedContacts').slice(0, index-1), 
          ...state.get('selectedContacts').slice(index, state.get('selectedContacts').length)]);
    }
    default:
      return state;
  }
}

export default contactPageReducer;