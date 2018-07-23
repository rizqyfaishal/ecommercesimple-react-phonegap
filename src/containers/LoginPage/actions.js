import { push } from 'react-router-redux';
import {
  LOGIN_PAGE_ON_LOGIN_REQUEST,
  LOGIN_PAGE_ON_RECEIVE_LOGIN_DATA,
  LOGIN_PAGE_ON_RECEIVE_LOGIN_ERRORS,
  LOGIN_PAGE_ON_LOGIN_TAP,
  LOGIN_PAGE_CLEAR_ERRORS,
  LOGIN_PAGE_SET_BUTTON_ENABLED,
  LOGIN_PAGE_SET_BUTTON_DISABLED
} from './constants';

import {
  fetchUserProfilesData
} from '../DealPage/actions';

import {
  fetchUserContactsData
} from '../MakeDealPage/actions';



import auth from '../../auth';

export function loginPageClearErrors() {
  return {
    type: LOGIN_PAGE_CLEAR_ERRORS
  }
}

export function onLoginRequest() {
  return {
    type: LOGIN_PAGE_ON_LOGIN_REQUEST
  }
}

export function onReceiveLoginData(data) {
  return {
    type: LOGIN_PAGE_ON_RECEIVE_LOGIN_DATA,
    data
  }
}

export function onReceiveLoginErrors(errors) {
  return {
    type: LOGIN_PAGE_ON_RECEIVE_LOGIN_ERRORS,
    errors
  }
}

export function onLoginTap(data) {
  return {
    type: LOGIN_PAGE_ON_LOGIN_TAP,
    data
  }
}


export function setButtonEnabled() {
  return {
    type: LOGIN_PAGE_SET_BUTTON_ENABLED
  }
}

export function setButtonDisabled() {
  return {
    type: LOGIN_PAGE_SET_BUTTON_DISABLED
  }
}


export function onLoginTapAction(username, password) {
  return (dispatch) => {
    dispatch(onLoginTap({ username, password }));
    dispatch(onLoginRequest());
    return auth.login(username, password)
      .then(response => {
        if(response.status == 200) {
          window.localStorage.setItem('auth-token', response.data.token);
          dispatch(onReceiveLoginData(response.data));
          dispatch(fetchUserProfilesData());
        }
      })
      .catch(error => {
        if(error.response.status == 400) {
          dispatch(onReceiveLoginErrors(error.response.data));
        }
      })
  }
}