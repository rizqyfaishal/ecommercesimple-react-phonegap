import { push } from 'react-router-redux';
import { isUndefined } from 'lodash';
import {  
  CONTACT_PAGE_FETCH_USER_CONTACTS_REQUEST,
  CONTACT_PAGE_RECEIVE_USER_CONTACTS_DATA,
  CONTACT_PAGE_ON_USER_SELECT_CONTACTS,
  CONTACT_PAGE_ON_USER_REMOVE_CONTACTS,
  CONTACT_PAGE_ON_USER_SAVE_CONTACTS_REQUEST,
  CONTACT_PAGE_RECEIVE_SAVED_USER_CONTACTS_DATA,
  CONTACT_PAGE_RECEIVE_USER_CONTACTS_ERRORS,
  CONTACT_PAGE_FETCH_ALL_CONTACTS_REQUEST,
  CONTACT_PAGE_RECEIVE_ALL_CONTACTS_DATA,
  CONTACT_PAGE_RECEIVE_ALL_CONTACTS_ERRORS,
  CONTACT_PAGE_SHOW_ALERT,
  CONTACT_PAGE_HIDE_ALERT,
  CONTACT_PAGE_ON_USER_SEARCH_CONTACT,
  CONTACT_PAGE_IMPORT_CONTACTS_FROM_PHONEBOOK,
  CONTACT_PAGE_RECEIVE_IMPORTED_CONTACT_FROM_PHONEBOOK,
  CONTACT_PAGE_IMPORT_CONTACTS_FROM_PHONEBOOK_REQUEST
} from './constants';

import {
  setFlashMessage
} from '../../actions';

import {
  getUserContacts,
  saveContacts,
  saveContactsFromPhoneBooks
} from '../../api';

export function importContactsFromPhoneBooksRequest() {
  return {
    type: CONTACT_PAGE_IMPORT_CONTACTS_FROM_PHONEBOOK_REQUEST
  }
}

export function importContactsFromPhoneBooks(emails, phone_numbers) {
  return dispatch => {
    dispatch(importContactsFromPhoneBooksRequest());
    return saveContactsFromPhoneBooks({ emails, phone_numbers })
      .then(response => {
        if(response.status == 200) {
          dispatch(receiveImportedContactFromPhoneBooks(response.data.contact_users));
          dispatch(setFlashMessage('saveContactsSuccess', response.data.contact_users.length + ' contacts added.'));
        }
      })
      .catch(err => {
        throw err;
      })
  }
}

export function receiveImportedContactFromPhoneBooks(data) {
  return {
    type: CONTACT_PAGE_RECEIVE_IMPORTED_CONTACT_FROM_PHONEBOOK,
    data
  }
}


export function hideAlert() {
  return {
    type: CONTACT_PAGE_HIDE_ALERT
  }
}

export function showAlert() {
  return {
    type: CONTACT_PAGE_SHOW_ALERT
  }
}

export function fetchUserContactsRequest() {
  return {
    type: CONTACT_PAGE_ON_USER_SAVE_CONTACTS_REQUEST
  }
}

export function onReceiveUserContactsData(data) {
  return {
    type: CONTACT_PAGE_RECEIVE_USER_CONTACTS_DATA,
    data
  }
}

export function onUserSelectContacts(selectedContacts) {
  return {
    type: CONTACT_PAGE_ON_USER_SELECT_CONTACTS,
    selectedContacts
  }
}

export function onUserRemoveContacts(selectedContact) {
  return {
    type: CONTACT_PAGE_ON_USER_REMOVE_CONTACTS,
    selectedContact
  }
}

export function onUserSaveContactRequest() {
  return {
    type: CONTACT_PAGE_ON_USER_SAVE_CONTACTS_REQUEST
  }
}

export function onReceiveSavedUserContactsData(data) {
  return {
    type: CONTACT_PAGE_RECEIVE_SAVED_USER_CONTACTS_DATA,
    data
  }
} 


export function onReceiveUserContactsErrors(errors) {
  return {
    type: CONTACT_PAGE_RECEIVE_USER_CONTACTS_ERRORS,
    errors
  }
}

export function onUserSearchContact(key) {
  return {
    type: CONTACT_PAGE_ON_USER_SEARCH_CONTACT,
    key
  }
}

export function fetchUserContactsRequestAction() {
  return dispatch => {
    dispatch(fetchUserContactsRequest());
    getUserContacts()
      .then(response => {
        if(response.status == 200) {
          dispatch(onReceiveUserContactsData(response.data));
        }
      })
      .catch(err => {
        if(err.response.status == 200) {
          dispatch(onReceiveUserContactsErrors(err.response.data));
        } else {

        }
      })
  }
}

export function onSavingContacts(data) {
  return dispatch => {
    dispatch(onUserSaveContactRequest());
    dispatch(hideAlert());
    return saveContacts(data)
      .then(response => {
        if(response.status == 200) {
          dispatch(onReceiveSavedUserContactsData(response.data));
          dispatch(setFlashMessage('saveContactsSuccess', `${response.data.length} contacts added.`));
          return response;
        }
      })
      .catch(err => {
        if(!isUndefined(err.response) && err.response.status == 400) {
          dispatch(onReceiveUserContactsErrors(err.response.data));
        } else {
          dispatch(push('/error'));
        }
      })
  }
}