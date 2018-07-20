import { fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

import {
  INVOICE_SELLER_PAGE_FETCH_USER_INVOICE_PRODUCTS_REQUEST,
  INVOICE_SELLER_PAGE_RECEIVE_USER_INVOICE_PRODUCTS_DATA,
  INVOICE_SELLER_PAGE_SELECT_FILTERED_PROFILE
} from './constants';

const invoiceSellerPageInitialState = fromJS({
  currentSelectedFilterProfiles: [],
  invoiceProductData: [],
  isLoading: false
});

function invoiceSellerPageReducer(state=invoiceSellerPageInitialState, action) {
  switch(action.type) {
    case LOCATION_CHANGE:
      return invoiceSellerPageInitialState;
    case INVOICE_SELLER_PAGE_SELECT_FILTERED_PROFILE:
      return state.set('currentSelectedFilterProfiles', fromJS(action.selectedProfiles))
    case INVOICE_SELLER_PAGE_FETCH_USER_INVOICE_PRODUCTS_REQUEST:
      return state.set('isLoading', true);
    case INVOICE_SELLER_PAGE_RECEIVE_USER_INVOICE_PRODUCTS_DATA:
      return state.set('isLoading', false)
                  .set('invoiceProductData', fromJS(action.data));
    default:
      return state;
  }
}

export default invoiceSellerPageReducer;
