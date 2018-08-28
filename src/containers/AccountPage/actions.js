import {
  saveEdittedUser,
  saveEdittedAdditionalInformation
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


  ACCOUNT_PAGE_ON_RESET_FIELD_ERRORS
} from './constants';


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