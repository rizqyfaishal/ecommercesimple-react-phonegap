import {
  getMyDealProducts,
  getProductDetailByUserTarget,
  userAcceptProduct,
  userNegotiateProduct,
  userCancelProduct
} from '../../api';

import {
  MY_DEAL_PAGE_FETCH_MY_DEAL_PRODUCTS,
  MY_DEAL_PAGE_RECEIVE_MY_DEAL_PRODUCTS_DATA,

  MY_DEAL_PAGE_FETCH_CURRENT_DEAL_PRODUCT_REQUEST,
  MY_DEAL_PAGE_RECEIVE_CURRENT_DEAL_PRODUCT_DATA,

  MY_DEAL_PAGE_ON_SWITCH_NEXT_OFFER,

  MY_DEAL_PAGE_SHOW_ACCEPT_DEAL_DIALOG,
  MY_DEAL_PAGE_HIDE_ACCEPT_DEAL_DIALOG,
  MY_DEAL_PAGE_ON_ACCEPT_DEAL_REQUEST,
  MY_DEAL_PAGE_RECEIVE_ACCEPTED_REQUEST_DATA,

  MY_DEAL_PAGE_SHOW_NEGOTIATE_DEAL_DIALOG,
  MY_DEAL_PAGE_HIDE_NEGOTIATE_DEAL_DIALOG,
  MY_DEAL_PAGE_ON_NEGOTIATE_DEAL_REQUEST,
  MY_DEAL_PAGE_RECEIVE_NEGOTIATED_REQUEST_DATA,

  MY_DEAL_PAGE_SHOW_CANCEL_DEAL_DIALOG,
  MY_DEAL_PAGE_HIDE_CANCEL_DEAL_DIALOG,
  MY_DEAL_PAGE_ON_CANCEL_DEAL_REQUEST,
  MY_DEAL_PAGE_RECEIVE_CANCELED_REQUEST_DATA,
  MY_DEAL_PAGE_ON_SWITCH_PREVIOUS_OFFER
} from './constants';

export function showCancelDealDialog() {
  return {
    type: MY_DEAL_PAGE_SHOW_CANCEL_DEAL_DIALOG
  }
}

export function hideCancelDealDialog() {
  return {
    type: MY_DEAL_PAGE_HIDE_CANCEL_DEAL_DIALOG
  }
}

export function onCancelDealRequest() {
  return {
    type: MY_DEAL_PAGE_ON_CANCEL_DEAL_REQUEST
  }
}

export function receiveCanceledDealRequestData(data) {
  return {
    data,
    type: MY_DEAL_PAGE_RECEIVE_CANCELED_REQUEST_DATA
  }
}

export function showNegotiateDealDialog() {
  return {
    type: MY_DEAL_PAGE_SHOW_NEGOTIATE_DEAL_DIALOG
  }
}

export function hideNegotiateDealDialog() {
  return {
    type: MY_DEAL_PAGE_HIDE_NEGOTIATE_DEAL_DIALOG
  }
}

export function onNegotiateDealRequest() {
  return {
    type: MY_DEAL_PAGE_ON_NEGOTIATE_DEAL_REQUEST
  }
}

export function receiveNegotiateDealRequestData(data) {
  return {
    type: MY_DEAL_PAGE_RECEIVE_NEGOTIATED_REQUEST_DATA,
    data
  }
}

export function showAcceptDealDialog() {
  return {
    type: MY_DEAL_PAGE_SHOW_ACCEPT_DEAL_DIALOG
  }
}

export function hideAcceptDealDialog() {
  return {
    type: MY_DEAL_PAGE_HIDE_ACCEPT_DEAL_DIALOG
  }
}

export function onAcceptDealRequest() {
  return {
    type: MY_DEAL_PAGE_ON_ACCEPT_DEAL_REQUEST
  }
}

export function receiveAcceptedDealRequestData(data) {
  return {
    type: MY_DEAL_PAGE_RECEIVE_ACCEPTED_REQUEST_DATA,
    data
  }
}

export function onSwitchNextOffer() {
  return {
    type: MY_DEAL_PAGE_ON_SWITCH_NEXT_OFFER,
  }
}

export function onSwitchPreviousOffer() {
  return {
    type: MY_DEAL_PAGE_ON_SWITCH_PREVIOUS_OFFER
  }
}

export function fetchMyDealProductsRequest() {
  return {
    type: MY_DEAL_PAGE_FETCH_MY_DEAL_PRODUCTS
  }
}

export function receiveMyDealProductsData(data, stillLoading) {
  return {
    type: MY_DEAL_PAGE_RECEIVE_MY_DEAL_PRODUCTS_DATA,
    data,
    stillLoading
  }
}

export function fetchCurrentDealProductRequest() {
  return {
    type: MY_DEAL_PAGE_FETCH_CURRENT_DEAL_PRODUCT_REQUEST
  }
}

export function receiveCurrentDealProductData(data) {
  return {
    type: MY_DEAL_PAGE_RECEIVE_CURRENT_DEAL_PRODUCT_DATA,
    data
  }
}

export function fetchMyDealProductsAction() {
  return dispatch => {
    dispatch(fetchMyDealProductsRequest());
    return getMyDealProducts()
      .then(response => {
        if(response.status == 200) {
          if(response.data.length > 0) {
            dispatch(receiveMyDealProductsData(response.data, true));
            dispatch(fetchCurrentDealProductAction(response.data[0].id));
          } else {
            dispatch(receiveMyDealProductsData(response.data, false));
          }
        }
      })
      .catch(error => {
        throw error;
      })
  }
}

export function fetchCurrentDealProductAction(productId) {
  return dispatch => {
    dispatch(fetchCurrentDealProductRequest());
    return getProductDetailByUserTarget(productId)
      .then(response => {
        if(response.status == 200) {
          dispatch(receiveCurrentDealProductData(response.data));
        }
      })
      .catch(error => {
        throw error;
      })
  }
}

export function onSwitchNextOfferAction(nextId) {
  return dispatch => {
    dispatch(onSwitchNextOffer());
    dispatch(fetchCurrentDealProductRequest());
    return getProductDetailByUserTarget(nextId)
      .then(response => {
        if(response.status == 200) {
          dispatch(receiveCurrentDealProductData(response.data));
        }
      })
      .catch(error => {
        throw error;
      })
  }
}

export function onSwitchPreviousOfferAction(prevId) {
  return dispatch => {
    dispatch(onSwitchPreviousOffer());
    dispatch(fetchCurrentDealProductRequest());
    return getProductDetailByUserTarget(prevId)
      .then(response => {
        if(response.status == 200) {
          dispatch(receiveCurrentDealProductData(response.data));
        }
      })
      .catch(error => {
        throw error;
      })
  }
}


export function onAcceptDealRequestAction(productId) {
  return dispatch => {
    dispatch(onAcceptDealRequest());
    return userAcceptProduct(productId)
      .then(response => {
        if(response.status == 200) {
          dispatch(receiveAcceptedDealRequestData(response.data));
        }
      })
      .catch(error => {
        throw error;
      })
  }
}

export function onCancelDealRequestAction(productId) {
  return dispatch => {
    dispatch(onCancelDealRequest());
    return userCancelProduct(productId)
      .then(response => {
        if(response.status == 200) {
          dispatch(receiveCanceledDealRequestData(response.data));
        }
      })
      .catch(error => {
        throw error;
      })
  }
}

export function onNegotiateDealRequestAction(productId) {
  return dispatch => {
    dispatch(onNegotiateDealRequest());
    return userNegotiateProduct(productId)
      .then(response => {
        if(response.status == 200) {
          dispatch(receiveNegotiateDealRequestData(response.data));
        }
      })
      .catch(error => {
        throw error;
      })
  }
}

