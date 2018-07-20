import { fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import {
  INVOICE_BUYER_DETAIL_PAGE_FETCH_INVOICE_DATA_REQUEST,
  INVOICE_BUYER_DETAIL_RECEIVE_INVOICE_DATA,
  INVOICE_BUYER_DETAIL_POST_IMAGE_UPLOAD_REQUEST,
  INVOICE_BUYER_DETAIL_RECEIVE_IMAGE_UPLOAD_DATA,
  INVOICE_BUYER_DETAIL_RECEIVE_IMAGE_UPLOAD_ERRORS,
  INVOICE_BUYER_DETAIL_ON_USER_CHOICE_IMAGE,
  INVOICE_BUYER_DETAIL_ON_USER_REMOVE_IMAGE
} from './constants';

const invoiceBuyerDetailPageInitialState = fromJS({
  isLoading: false,
  isUploadingImage: false,
  errors: [],
  imageData: null,
  invoiceData: null,
  tempImage: null,
  tempImageUrl: null,
  successSavedImageData: false
}); 

function invoiceBuyerDetailPageReducer(state=invoiceBuyerDetailPageInitialState, action) {
  switch(action.type) {
    case LOCATION_CHANGE:
      return invoiceBuyerDetailPageInitialState;
    case INVOICE_BUYER_DETAIL_ON_USER_REMOVE_IMAGE:
      return state.set('tempImage', null)
                  .set('errors', fromJS([]))
                  .set('tempImageUrl', null);
    case INVOICE_BUYER_DETAIL_ON_USER_CHOICE_IMAGE:
      return state.set('tempImage', fromJS(action.image))
                  .set('errors', fromJS([]))
                  .set('tempImageUrl', action.imageURL);
    case INVOICE_BUYER_DETAIL_POST_IMAGE_UPLOAD_REQUEST:
      return state.set('isUploadingImage', true);
    case INVOICE_BUYER_DETAIL_RECEIVE_IMAGE_UPLOAD_DATA:
      return state.set('isUploadingImage', false)
                  .set('successSavedImageData', true)
                  .setIn(['invoiceData', 'status'], 2)
                  .set('tempImage', null)
                  .set('tempImageUrl', null)
                  .setIn(['invoiceData', 'attachment_data'], fromJS(action.data));
    case INVOICE_BUYER_DETAIL_RECEIVE_IMAGE_UPLOAD_ERRORS:
      return state.set('isUploadingImage', false)
                  .set('errors', fromJS(action.errors));
    case INVOICE_BUYER_DETAIL_PAGE_FETCH_INVOICE_DATA_REQUEST:
      return state.set('isLoading', true);
    case INVOICE_BUYER_DETAIL_RECEIVE_INVOICE_DATA:
      return state.set('isLoading', false)
                  .set('invoiceData', fromJS(action.data));
    default:
      return state;
  }
}

export default invoiceBuyerDetailPageReducer;