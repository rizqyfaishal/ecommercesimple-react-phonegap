import {
  getUserInvoiceData,
  postImageUpload,
  userCreateAttachment
} from '../../api';

import {
  INVOICE_BUYER_DETAIL_PAGE_FETCH_INVOICE_DATA_REQUEST,
  INVOICE_BUYER_DETAIL_RECEIVE_INVOICE_DATA,
  INVOICE_BUYER_DETAIL_POST_IMAGE_UPLOAD_REQUEST,
  INVOICE_BUYER_DETAIL_RECEIVE_IMAGE_UPLOAD_DATA,
  INVOICE_BUYER_DETAIL_RECEIVE_IMAGE_UPLOAD_ERRORS,
  INVOICE_BUYER_DETAIL_ON_USER_CHOICE_IMAGE,
  INVOICE_BUYER_DETAIL_ON_USER_REMOVE_IMAGE
} from './constants';

export function onUserRemoveImage() {
  return {
    type: INVOICE_BUYER_DETAIL_ON_USER_REMOVE_IMAGE
  }
}

export function onUserChoiceImage(image, imageURL) {
  return {
    type: INVOICE_BUYER_DETAIL_ON_USER_CHOICE_IMAGE,
    image,
    imageURL
  }
}


export function fetchInvoiceDataRequest() {
  return {
    type: INVOICE_BUYER_DETAIL_PAGE_FETCH_INVOICE_DATA_REQUEST,
  }
}

export function receiveInvoiceData(data) {
  return {
    type: INVOICE_BUYER_DETAIL_RECEIVE_INVOICE_DATA,
    data
  }
}

export function postImageUploadRequest(){
  return {
    type: INVOICE_BUYER_DETAIL_POST_IMAGE_UPLOAD_REQUEST
  }
}

export function receiveImageUploadData(data) {
  return {
    type: INVOICE_BUYER_DETAIL_RECEIVE_IMAGE_UPLOAD_DATA,
    data
  }
}

export function receiveImageUploadErrors(errors) {
  return {
    type: INVOICE_BUYER_DETAIL_RECEIVE_IMAGE_UPLOAD_ERRORS,
    errors
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
      .catch(error => {
        return Promise.reject(error);
      })
  }
}

export function postImageUploadAction(image, productId) {
  return dispatch => {
    dispatch(postImageUploadRequest());
    return postImageUpload(image)
      .then(response => {
        if(response.status == 201) {
          image = response.data
          return userCreateAttachment({ invoice: productId, invoice_file: image.id })
            .then(response => {
              console.log(response);
              if(response.status == 201) {
                dispatch(receiveImageUploadData(response.data));
              }
            })
        }
      })
      .catch(error => {
        if(error.response.status == 400) {
          dispatch(receiveImageUploadErrors(error.response.data.image));
        }
      })
  }
}