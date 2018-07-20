import {
  getUserInvoiceProducts
} from '../../api';

import {
  INVOICE_SELLER_PAGE_FETCH_USER_INVOICE_PRODUCTS_REQUEST,
  INVOICE_SELLER_PAGE_RECEIVE_USER_INVOICE_PRODUCTS_DATA,
  INVOICE_SELLER_PAGE_SELECT_FILTERED_PROFILE
} from './constants';


export function onSelectFilteredProfile(selectedProfiles) {
  return {
    type: INVOICE_SELLER_PAGE_SELECT_FILTERED_PROFILE,
    selectedProfiles
  }
}

export function fetchUserInvoiceProductRequest() {
  return {
    type: INVOICE_SELLER_PAGE_FETCH_USER_INVOICE_PRODUCTS_REQUEST,
  }
}

export function receiveInvoiceProductData(data) {
  return {
    type: INVOICE_SELLER_PAGE_RECEIVE_USER_INVOICE_PRODUCTS_DATA,
    data
  }
}

export function fetchUserInvoiceProductAction() {
  return dispatch => {
    dispatch(fetchUserInvoiceProductRequest());
    return getUserInvoiceProducts()
      .then(response => {
        if(response.status == 200) {
          dispatch(receiveInvoiceProductData(response.data));
        }
      })
      .catch(error => {
        throw error;
      })
  }
}