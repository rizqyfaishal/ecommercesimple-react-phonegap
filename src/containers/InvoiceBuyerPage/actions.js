import {
	getUserAcceptedProducts
} from '../../api';

import {
  INVOICE_BUYER_PAGE_FETCH_USER_INVOICE_PRODUCTS_REQUEST,
  INVOICE_BUYER_PAGE_RECEIVE_USER_INVOICE_PRODUCTS_DATA,
} from './constants';

export function fetchUserAcceptedProductRequest() {
  return {
    type: INVOICE_BUYER_PAGE_FETCH_USER_INVOICE_PRODUCTS_REQUEST,
  }
}

export function receiveAcceptedProductData(data) {
  return {
    type: INVOICE_BUYER_PAGE_RECEIVE_USER_INVOICE_PRODUCTS_DATA,
    data
  }
}

export function fetchUserAcceptedProductsAction() {
  return dispatch => {
    dispatch(fetchUserAcceptedProductRequest());
    return getUserAcceptedProducts()
      .then(response => {
        if(response.status == 200) {
          dispatch(receiveAcceptedProductData(response.data));
        }
      })
      .catch(error => {
        throw error;
      })
  }
}