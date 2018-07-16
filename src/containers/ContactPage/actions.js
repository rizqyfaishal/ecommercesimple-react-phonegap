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
  CONTACT_PAGE_ON_USER_SEARCH_CONTACT
} from './constants';

import {
  setFlashMessage
} from '../../actions';

import {
  getUserContacts,
  saveContacts
} from '../../api';

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
        console.log(response);
        if(response.status == 200) {
          dispatch(onReceiveUserContactsData(response.data));
        }
      })
      .catch(err => {
        if(err.response.status == 200) {
          dispatch(onReceiveUserContactsErrors(err.response.data));
        }
      })
  }
}

export function onSavingContacts(data) {
  return dispatch => {
    dispatch(onUserSaveContactRequest());
    dispatch(hideAlert());
    saveContacts(data)
      .then(response => {

        if(response.status == 201) {
          dispatch(onReceiveSavedUserContactsData(response.data));
          dispatch(setFlashMessage('saveContactsSuccess', 'Contact Added.'));
          return response;
        }

      })
      .catch(err => {
        if(err.response.status == 400) {
          dispatch(onReceiveUserContactsErrors(err.response.data));
        }
      })
  }
}