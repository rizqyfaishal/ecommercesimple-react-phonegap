import {
  saveEdittedUser,
  saveEdittedAdditionalInformation,
  saveProfileAPI
} from '../../api';

import {
  ACCOUNT_PAGE_SET_ENABLE_EDITTING_ACCOUNT_INFO,
  ACCOUNT_PAGE_SET_DISABLE_EDITTING_ACCOUNT_INFO,
  ACCOUNT_PAGE_SET_ENABLE_EDITTING_ADDRESS,
  ACCOUNT_PAGE_SET_DISABLE_EDITTING_ADDRESS, 
  ACCOUNT_PAGE_SET_ENABLE_EDITTING_PAYMENT_METHOD,
  ACCOUNT_PAGE_SET_DISABLE_EDITTING_PAYMENT_METHOD,
  ACCOUNT_PAGE_ON_SAVE_ACCOUNT_INFO_REQUEST,
  ACCOUNT_PAGE_RECEIVE_ACCOUNT_INFO_DATA,
  ACCOUNT_PAGE_RECEIVE_ACCOUNT_INFO_ERRORS,

  ACCOUNT_PAGE_ON_SAVE_ADDRESS_REQUEST,
  ACCOUNT_PAGE_RECEIVE_ADDRESS_ERRORS,
  ACCOUNT_PAGE_RECEIVE_ADDRESS_DATA,

  ACCOUNT_PAGE_ON_SAVE_PAYMENT_METHOD_REQUEST,
  ACCOUNT_PAGE_RECEIVE_PAYMENT_METHOD_ERRORS,
  ACCOUNT_PAGE_RECEIVE_PAYMENT_METHOD_DATA,
  ACCOUNT_PAGE_ON_SEARCH_PROFILES_KEY_CHANGE,

  ACCOUNT_PAGE_ON_RESET_FIELD_ERRORS,
  ACCOUNT_PAGE_ON_CREATE_PROFILE_ACTIVE,
  ACCOUNT_PAGE_ON_DISABLE_CREATE_NEW_PROFILE,
  ACCOUNT_PAGE_ON_CANCEL_CREATE_PROFILE,
  ACCOUNT_PAGE_ON_USER_CHOICE_IMAGE,
  ACCOUNT_PAGE_ON_USER_REMOVE_IMAGE,
  ACCOUNT_PAGE_ON_SAVE_NEW_PROFILE_REQUEST,
  ACCOUNT_PAGE_ON_RECEIVE_NEW_PROFILE_DATA,
  ACCOUNT_PAGE_ON_RECEIVE_ERRORS_PROFILE_DATA
} from './constants';

export function onSaveNewProfileRequets() {
  return {
    type: ACCOUNT_PAGE_ON_SAVE_NEW_PROFILE_REQUEST
  }
}

export function onReceiveNewProfileData(data) {
  return {
    type: ACCOUNT_PAGE_ON_RECEIVE_NEW_PROFILE_DATA,
    data
  }
}

export function onReceiveErrorsProfileData(errors) {
  return {
    type: ACCOUNT_PAGE_ON_RECEIVE_ERRORS_PROFILE_DATA, 
    errors
  }
}

export function onSaveNewProfile(requestData) {
  return dispatch => {
    dispatch(onSaveNewProfileRequets());
    return saveProfileAPI(requestData)
      .then(response => {
        if(response.status == 201) {
          dispatch(onReceiveNewProfileData(response.data));
        }
      })
      .catch(error => {
        if(error.response.status == 400) {
          dispatch(onReceiveErrorsProfileData(error.response.data));
        }
      })
  }
}

export function onUserChoiceImage(image, imageURL) {
  return {
    type: ACCOUNT_PAGE_ON_USER_CHOICE_IMAGE,
    image,
    imageURL
  }
}

export function onUserRemoveImage() {
  return {
    type: ACCOUNT_PAGE_ON_USER_REMOVE_IMAGE
  }
}

export function onCancelCreateProfile() {
  return {
    type: ACCOUNT_PAGE_ON_CANCEL_CREATE_PROFILE
  }
}

export function onDisableCreateNewProfile() {
  return {
    type: ACCOUNT_PAGE_ON_DISABLE_CREATE_NEW_PROFILE
  }
}

export function onCreateNewProfileActive() {
  return {
    type: ACCOUNT_PAGE_ON_CREATE_PROFILE_ACTIVE
  }
}


export function onSearchProfilesKeyChange(key) {
  return {
    type: ACCOUNT_PAGE_ON_SEARCH_PROFILES_KEY_CHANGE,
    key
  }
}


export function onResetFieldErrors(mainKey, key) {
  return {
    type: ACCOUNT_PAGE_ON_RESET_FIELD_ERRORS,
    mainKey,
    key
  }
}

export function onSaveAccountInfoRequest() {
  return {
    type: ACCOUNT_PAGE_ON_SAVE_ACCOUNT_INFO_REQUEST,
  }
}

export function receiveAccountInfoData(data) {
  return {
    type: ACCOUNT_PAGE_RECEIVE_ACCOUNT_INFO_DATA,
    data
  }
}

export function receiveAccountInfoErrors(errors) {
  return {
    type: ACCOUNT_PAGE_RECEIVE_ACCOUNT_INFO_ERRORS,
    errors
  }
}

export function onSaveAddressRequest() {
  return {
    type: ACCOUNT_PAGE_ON_SAVE_ADDRESS_REQUEST,
  }
}

export function receiveAddressData(data) {
  return {
    type: ACCOUNT_PAGE_RECEIVE_ADDRESS_DATA,
    data
  }
}

export function receiveAddressErrors(errors) {
  return {
    type: ACCOUNT_PAGE_RECEIVE_ADDRESS_ERRORS,
    errors
  }
}

export function onSavePaymentMethodRequest() {
  return {
    type: ACCOUNT_PAGE_ON_SAVE_PAYMENT_METHOD_REQUEST,
  }
}

export function receivePaymentMethodData(data) {
  return {
    type: ACCOUNT_PAGE_RECEIVE_PAYMENT_METHOD_DATA,
    data
  }
}

export function receivePaymentMethodErrors(errors) {
  return {
    type: ACCOUNT_PAGE_RECEIVE_PAYMENT_METHOD_ERRORS,
    errors
  }
}

export function setEnableEdittingAccountInfo() {
  return {
    type: ACCOUNT_PAGE_SET_ENABLE_EDITTING_ACCOUNT_INFO
  }
}

export function setDisableEdittingAccountInfo() {
  return {
    type: ACCOUNT_PAGE_SET_DISABLE_EDITTING_ACCOUNT_INFO,
  }
}

export function setDisableEdittingAddress() {
  return {
    type: ACCOUNT_PAGE_SET_DISABLE_EDITTING_ADDRESS
  }
}

export function setEnableEdittingAddress() {
  return {
    type: ACCOUNT_PAGE_SET_ENABLE_EDITTING_ADDRESS
  }
}

export function setDisableEdittingPaymentMethod() {
  return {
    type: ACCOUNT_PAGE_SET_DISABLE_EDITTING_PAYMENT_METHOD
  }
}

export function setEnableEdittingPaymentMethod() {
  return {
    type: ACCOUNT_PAGE_SET_ENABLE_EDITTING_PAYMENT_METHOD
  }
}

export function onSaveAccountInfoAction(data, userId) {
  return dispatch => {
    dispatch(onSaveAccountInfoRequest());
    return saveEdittedUser(data, userId)
      .then(response => {
        if(response.status == 200) {
          dispatch(receiveAccountInfoData(response.data));
        }
      })
      .catch(error => {
        if(error.response.status == 400) {
          dispatch(receiveAccountInfoErrors(error.response.data));
        }
      })
  }
}

export function onSavePaymentMethodAction(data, userId) {
  return dispatch => {
    dispatch(onSavePaymentMethodRequest());
    return saveEdittedUser(data, userId)
      .then(response => {
        if(response.status == 200) {
          dispatch(receivePaymentMethodData(response.data));
        }
      })
      .catch(error => {
        if(error.response.status == 400) {
          dispatch(receivePaymentMethodErrors(error.response.data));
        }
      })
  }
} 

export function onSaveAddressAction(data, userId) {
  return dispatch => {
    dispatch(onSaveAddressRequest());
    return saveEdittedUser(data, userId)
      .then(response => {
        if(response.status == 200) {
          dispatch(receiveAddressData(response.data));
        }
      })
      .catch(error => {
        if(error.response.status == 400) {
          dispatch(receiveAddressErrors(error.response.data));
        }
      })
  }
}