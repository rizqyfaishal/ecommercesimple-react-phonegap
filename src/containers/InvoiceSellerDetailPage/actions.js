import {
  getUserInvoiceData
} from '../../api';

import {
  INVOICE_SELLER_DETAIL_FETCH_INVOICE_DATA_REQUEST,
  INVOICE_SELLER_DETAIL_RECEIVE_INVOICE_DATA,
} from './constants';

export function fetchInvoiceDataRequest() {
  return {
    type: INVOICE_SELLER_DETAIL_FETCH_INVOICE_DATA_REQUEST
  }
}

export function receiveInvoiceData(data) {
  return {
    type: INVOICE_SELLER_DETAIL_RECEIVE_INVOICE_DATA,
    data
  }
}

export function fetchInvoiceDataAction(productId) {
  return dispatch => {
    dispatch(fetchInvoiceDataRequest());
    return getUserInvoiceData(productId)
      .then(response => {
        if(response.status == 200) {
          dispatch(receiveInvoiceData(response.data));
        }
      })
  }
}