import {
  PRODUCT_LIST_PAGE_SHOW_PROFILE_DIALOG,
  PRODUCT_LIST_PAGE_HIDE_PROFILE_DIALOG,
  PRODUCT_LIST_PAGE_RECEIVE_PROFILE_DATA,
  PRODUCT_LIST_PAGE_ON_USER_SELECTED_PROFILE,
  PRODUCT_LIST_PAGE_ON_USER_CANCELED_SELECT_PROFILE,
  PRODUCT_LIST_PAGE_ON_USER_SELECTED_PROFILE_FINAL,
  PRODUCT_LIST_PAGE_CHANGE_MODE,
  PRODUCT_LIST_PAGE_ON_ADD_ITEM,
  PRODUCT_LIST_PAGE_ON_REMOVE_ITEM,
  PRODUCT_LIST_PAGE_ON_PLUS_TAP_ITEM,
  PRODUCT_LIST_PAGE_ON_MINUS_TAP_ITEM,
  PRODUCT_LIST_PAGE_ON_CANCEL_DEAL_RESULT,
  PRODUCT_LIST_PAGE_ON_RESET_ERROR_FIELDS,
  PRODUCT_LIST_PAGE_ON_RESET_ITEM_ERROR_FIELDS,
  PRODUCT_LIST_PAGE_ON_ITEM_PRICE_CHANGE,
  PRODUCT_LIST_PAGE_ON_SAVE_PRODUCT,
  PRODUCT_LIST_PAGE_ON_SAVE_PRODUCT_REQUEST,
  PRODUCT_LIST_PAGE_ON_RECEIVE_CREATED_PRODUCT_DATA,
  PRODUCT_LIST_PAGE_ON_RECEIVE_PRODUCT_ERRORS,

  PRODUCT_LIST_FETCH_PRODUCT_LIST,
  PRODUCT_LIST_FETCH_PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_PAGE_ON_RECEIVE_PRODUCTS_DATA,
  PRODUCT_LIST_PAGE_ON_EXPAND_ITEM
} from './constants';

import {
  setFlashMessage
} from '../../actions';

import {
  convertErrorResponse
} from '../../utils';


import {
  saveProduct,
  getProductsData
} from '../../api';

export function onExpandItem(index) {
  return {
    type: PRODUCT_LIST_PAGE_ON_EXPAND_ITEM,
    index
  }
}

export function fetchProductList() {
  return dispatch => {
    dispatch(fetchProductListRequest());
    return getProductsData()
      .then(function(response) {
        if(response.status == 200) {
          dispatch(onReceiveProductData(response.data));
        }
      })
      .catch(error => {
        throw error;
      })
  }
}

export function fetchProductListRequest() {
  return {
    type: PRODUCT_LIST_FETCH_PRODUCT_LIST_REQUEST
  }
}

export function onReceiveProductData(data) {
  return {
    type: PRODUCT_LIST_PAGE_ON_RECEIVE_PRODUCTS_DATA,
    data
  }
}

export function onReceiveCreatedProductData(data) {
  return {
    type: PRODUCT_LIST_PAGE_ON_RECEIVE_CREATED_PRODUCT_DATA,
    data
  }
}

export function onReceiveProductErrors(errors) {
  return {
    type: PRODUCT_LIST_PAGE_ON_RECEIVE_PRODUCT_ERRORS,
    errors
  }
}

export function onSaveProductRequest(data) {
  return {
    type: PRODUCT_LIST_PAGE_ON_SAVE_PRODUCT_REQUEST,
    data
  }
}


export function onSaveProduct(requestData) {
  return dispatch => {
    dispatch(onSaveProductRequest(requestData));
    return saveProduct(requestData)
      .then(response => {
        if(response.status == 201) {
          dispatch(onReceiveCreatedProductData(response.data));
          console.log(setFlashMessage);
          dispatch(setFlashMessage('saveProductSuccess', 'Product created'));
        }
      })
      .catch(error => {
        if(error.response.status == 400) {
          const errors = {
            product_name:  convertErrorResponse(error.response.data.product_name),
            expire_in_day:  convertErrorResponse(error.response.data.expire_in_day),
            user_target: convertErrorResponse(error.response.data.user_target),
            items: !isUndefined(error.response.data.items) ? error.response.data.items.map(item => ({
              item_name: convertErrorResponse(item.item_name),
              price: convertErrorResponse(item.price),
              quantity: convertErrorResponse(item.quantity)
            })) : data.items.map(item => ({ 
              item_name: [],
              price: [],
              quantity: []
            }))
          }
          dispatch(onReceiveProductErrors(errors));
        }
      })
  }
}

export function onItemPriceChange(index, value) {
  return {
    type: PRODUCT_LIST_PAGE_ON_ITEM_PRICE_CHANGE,
    value,
    index
  }
}


export function onResetErrorFields(key) {
  return {
    type: PRODUCT_LIST_PAGE_ON_RESET_ERROR_FIELDS,
    key
  }
}

export function onResetItemErrorFields(index, key) {
  return {
    type: PRODUCT_LIST_PAGE_ON_RESET_ITEM_ERROR_FIELDS,
    key,
    index
  }
}

export function onCancelDealResult() {
  return {
    type: PRODUCT_LIST_PAGE_ON_CANCEL_DEAL_RESULT
  }
}

export function onPlusTapItem(index) {
  return {
    type: PRODUCT_LIST_PAGE_ON_PLUS_TAP_ITEM,
    index
  }
}

export function onMinusTapItem(index) {
  return {
    type: PRODUCT_LIST_PAGE_ON_MINUS_TAP_ITEM,
    index
  }
}

export function onRemoveItem(index) {
  return {
    type: PRODUCT_LIST_PAGE_ON_REMOVE_ITEM,
    index
  }
}

export function onAddItem() {
  return {
    type: PRODUCT_LIST_PAGE_ON_ADD_ITEM
  }
}

export function changeMode() {
  return {
    type: PRODUCT_LIST_PAGE_CHANGE_MODE
  }
}


export function showProfileDialog() {
  return {
    type: PRODUCT_LIST_PAGE_SHOW_PROFILE_DIALOG
  }
}

export function hideProfileDialog() {
  return {
    type: PRODUCT_LIST_PAGE_HIDE_PROFILE_DIALOG
  }
}

export function receiveProfileData(data) {
  return {
    type: PRODUCT_LIST_PAGE_RECEIVE_PROFILE_DATA,
    data
  }
}

export function onUserSelectedProfile(value) {
  return {
    type: PRODUCT_LIST_PAGE_ON_USER_SELECTED_PROFILE,
    value
  }
}

export function onUserCanceledSelectProfile() {
  return {
    type: PRODUCT_LIST_PAGE_ON_USER_CANCELED_SELECT_PROFILE
  }
}

export function onUserSelectedProfileFinal() {
  return {
    type: PRODUCT_LIST_PAGE_ON_USER_SELECTED_PROFILE_FINAL
  }
}