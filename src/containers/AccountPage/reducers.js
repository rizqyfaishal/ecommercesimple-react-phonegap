import { fromJS } from 'immutable';

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
  ACCOUNT_PAGE_ON_RESET_FIELD_ERRORS,

  ACCOUNT_PAGE_ON_SAVE_ADDRESS_REQUEST,
  ACCOUNT_PAGE_RECEIVE_ADDRESS_ERRORS,
  ACCOUNT_PAGE_RECEIVE_ADDRESS_DATA,

  ACCOUNT_PAGE_ON_SAVE_PAYMENT_METHOD_REQUEST,
  ACCOUNT_PAGE_RECEIVE_PAYMENT_METHOD_ERRORS,
  ACCOUNT_PAGE_RECEIVE_PAYMENT_METHOD_DATA,

} from './constants';

const accountPageInitialState = fromJS({
  accountInfoEditted: false,
  addressEditted: false,
  paymentMethodEditted: false,
  isSavingAccountInfo: false,
  isSavingAddress: false,
  isSavingPaymentMethod: false,
  accountInfoErrors: {
    first_name: [],
    last_name: [],
    username: [],
    email: []
  },
  addressErrors: {
    address: []
  }
  ,
  paymentMethodErrors: {
    payment_method: []
  }
});

function accountPageReducer(state=accountPageInitialState, action) {
  switch(action.type) {
    case ACCOUNT_PAGE_RECEIVE_ADDRESS_DATA:
      return state.set('isSavingAddress', false)
                  .set('addressEditted', false);
    case ACCOUNT_PAGE_RECEIVE_PAYMENT_METHOD_DATA:
      return state.set('isSavingPaymentMethod', false)
                  .set('paymentMethodEditted', false);
    case ACCOUNT_PAGE_RECEIVE_PAYMENT_METHOD_ERRORS:
      return state.set('isSavingPaymentMethod', false)
                  .update('paymentMethodErrors', info => info.merge(action.errors));
    case ACCOUNT_PAGE_RECEIVE_ADDRESS_ERRORS:
      return state.set('isSavingAddress', false)
                  .update('addressErrors', info => info.merge(action.errors));
    case ACCOUNT_PAGE_ON_RESET_FIELD_ERRORS:
      return state.setIn([action.mainKey, action.key], fromJS([]));
    case ACCOUNT_PAGE_ON_SAVE_ACCOUNT_INFO_REQUEST:
      return state.set('isSavingAccountInfo', true);
    case ACCOUNT_PAGE_ON_SAVE_ADDRESS_REQUEST:
      return state.set('isSavingAddress', true);
    case ACCOUNT_PAGE_ON_SAVE_PAYMENT_METHOD_REQUEST:
      return state.set('isSavingPaymentMethod', true);
    case ACCOUNT_PAGE_RECEIVE_ACCOUNT_INFO_DATA:
      return state.set('isSavingAccountInfo', false)
                  .set('accountInfoEditted', false);
    case ACCOUNT_PAGE_RECEIVE_ACCOUNT_INFO_ERRORS:
      return state.set('isSavingAccountInfo', false)
                  .update('accountInfoErrors', info => info.merge(action.errors));
    case ACCOUNT_PAGE_SET_DISABLE_EDITTING_ADDRESS:
      return state.set('addressEditted', false);
    case ACCOUNT_PAGE_SET_ENABLE_EDITTING_ADDRESS:
      return state.set('addressEditted', true);
    case ACCOUNT_PAGE_SET_DISABLE_EDITTING_ACCOUNT_INFO:
      return state.set('accountInfoEditted', false);
    case ACCOUNT_PAGE_SET_ENABLE_EDITTING_ACCOUNT_INFO:
      return state.set('accountInfoEditted', true);
    case ACCOUNT_PAGE_SET_DISABLE_EDITTING_PAYMENT_METHOD:
      return state.set('paymentMethodEditted', false);
    case ACCOUNT_PAGE_SET_ENABLE_EDITTING_PAYMENT_METHOD:
      return state.set('paymentMethodEditted', true);
    default:
      return state;
  }
}

export default accountPageReducer;
