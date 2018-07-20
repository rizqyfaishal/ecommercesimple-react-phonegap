import { fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import {
  INVOICE_BUYER_PAGE_FETCH_USER_INVOICE_PRODUCTS_REQUEST,
  INVOICE_BUYER_PAGE_RECEIVE_USER_INVOICE_PRODUCTS_DATA,
} from './constants';

const invoiceBuyerPageInitialState = fromJS({
  userAcceptedProducts: [],
  isLoading: false
});

function invoiceBuyerPageReducer(state=invoiceBuyerPageInitialState, action) {
  switch(action.type) {
    case LOCATION_CHANGE:
      return invoiceBuyerPageInitialState;
    case INVOICE_BUYER_PAGE_FETCH_USER_INVOICE_PRODUCTS_REQUEST:
      return state.set('isLoading', true);
    case INVOICE_BUYER_PAGE_RECEIVE_USER_INVOICE_PRODUCTS_DATA:
      return state.set('isLoading', false)
                  .set('userAcceptedProducts', fromJS(action.data));
    default:
      return state;
  }
}

export default invoiceBuyerPageReducer;