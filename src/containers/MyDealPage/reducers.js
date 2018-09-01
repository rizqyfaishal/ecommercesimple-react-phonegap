import { fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import {
  MY_DEAL_PAGE_FETCH_MY_DEAL_PRODUCTS,
  MY_DEAL_PAGE_RECEIVE_MY_DEAL_PRODUCTS_DATA,

  MY_DEAL_PAGE_FETCH_CURRENT_DEAL_PRODUCT_REQUEST,
  MY_DEAL_PAGE_RECEIVE_CURRENT_DEAL_PRODUCT_DATA,

  MY_DEAL_PAGE_ON_SWITCH_NEXT_OFFER,
  MY_DEAL_PAGE_ON_SWITCH_PREVIOUS_OFFER,

  MY_DEAL_PAGE_SHOW_ACCEPT_DEAL_DIALOG,
  MY_DEAL_PAGE_ON_ACCEPT_DEAL_REQUEST,
  MY_DEAL_PAGE_RECEIVE_ACCEPTED_REQUEST_DATA,

  MY_DEAL_PAGE_SHOW_NEGOTIATE_DEAL_DIALOG,
  MY_DEAL_PAGE_ON_NEGOTIATE_DEAL_REQUEST,
  MY_DEAL_PAGE_RECEIVE_NEGOTIATED_REQUEST_DATA,

  MY_DEAL_PAGE_SHOW_CANCEL_DEAL_DIALOG,
  MY_DEAL_PAGE_ON_CANCEL_DEAL_REQUEST,
  MY_DEAL_PAGE_RECEIVE_CANCELED_REQUEST_DATA,
  MY_DEAL_PAGE_HIDE_ACCEPT_DEAL_DIALOG,
  MY_DEAL_PAGE_HIDE_NEGOTIATE_DEAL_DIALOG,
  MY_DEAL_PAGE_HIDE_CANCEL_DEAL_DIALOG
} from './constants';

const myDealPageInitialState = fromJS({
  myDealProducts: null,
  isLoading: false,
  currentProductId: -1,
  currentProductData: null,
  successCanceled: false,
  successAccepted: false,
  successNegotiated: false,
  showAcceptDialog: false,
  showCancelDialog: false,
  showNegotiateDialog: false
});

function myDealPageReducer(state=myDealPageInitialState, action) {
  switch(action.type) {
    case MY_DEAL_PAGE_ON_SWITCH_PREVIOUS_OFFER:
      return state.set('currentProductId', state.get('currentProductId') - 1);
    case MY_DEAL_PAGE_HIDE_ACCEPT_DEAL_DIALOG:
      return state.set('showAcceptDialog', false);
    case MY_DEAL_PAGE_HIDE_CANCEL_DEAL_DIALOG:
      return state.set('showCancelDialog', false);
    case MY_DEAL_PAGE_HIDE_NEGOTIATE_DEAL_DIALOG:
      return state.set('showNegotiateDialog', false);
    case MY_DEAL_PAGE_SHOW_CANCEL_DEAL_DIALOG:
      return state.set('showCancelDialog', true);
    case MY_DEAL_PAGE_SHOW_NEGOTIATE_DEAL_DIALOG:
      return state.set('showNegotiateDialog', true);
    case MY_DEAL_PAGE_SHOW_ACCEPT_DEAL_DIALOG:
      return state.set('showAcceptDialog', true);
    case MY_DEAL_PAGE_ON_CANCEL_DEAL_REQUEST:
      return state.set('isLoading', true)
                  .set('showCancelDialog', false);
    case MY_DEAL_PAGE_ON_NEGOTIATE_DEAL_REQUEST:
      return state.set('isLoading', true)
                  .set('showNegotiateDialog', false);
    case MY_DEAL_PAGE_ON_ACCEPT_DEAL_REQUEST:
      return state.set('isLoading', true)
                  .set('showAcceptDialog', false);
    case MY_DEAL_PAGE_RECEIVE_CANCELED_REQUEST_DATA:
      return state.set('isLoading', false)
                  .set('successCanceled', true);
    case MY_DEAL_PAGE_RECEIVE_NEGOTIATED_REQUEST_DATA:
      return state.set('isLoading', false)
                  .set('successNegotiated', true);
    case MY_DEAL_PAGE_RECEIVE_ACCEPTED_REQUEST_DATA:
      return state.set('isLoading', false)
                  .set('successAccepted', true);
    case MY_DEAL_PAGE_ON_SWITCH_NEXT_OFFER:
      return state.set('currentProductId', state.get('currentProductId') + 1);
    case LOCATION_CHANGE:
      return myDealPageInitialState;
    case MY_DEAL_PAGE_FETCH_CURRENT_DEAL_PRODUCT_REQUEST:
      return state.set('isLoading', true);
    case MY_DEAL_PAGE_RECEIVE_CURRENT_DEAL_PRODUCT_DATA: {
      return state.set('isLoading', false)
                  .set('currentProductData', fromJS(action.data));
    }
    case MY_DEAL_PAGE_FETCH_MY_DEAL_PRODUCTS:
      return state.set('isLoading', true)
                  .set('successAccepted', false)
                  .set('successNegotiated', false)
                  .set('successCanceled', false);
    case MY_DEAL_PAGE_RECEIVE_MY_DEAL_PRODUCTS_DATA:
      return state.set('isLoading', action.stillLoading)
                  .set('currentProductId', action.data.length > 0 ? 0 : -1)
                  .set('myDealProducts', fromJS(action.data));
    default:
      return state;
  }
}

export default myDealPageReducer;