import { fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import React from 'react';
import {
  EDIT_DEAL_PAGE_FETCH_DEAL_PROUCT_DATA_REQUEST,
  EDIT_DEAL_PAGE_RECEIVE_DEAL_PRODUCT_DATA,
  EDIT_DEAL_PAGE_RESET_ERRORS_FIELD,
  EDIT_DEAL_PAGE_ON_PLUS_TAPPED,
  EDIT_DEAL_PAGE_ON_MINUS_TAPPED,
  EDIT_DEAL_PAGE_ON_REMOVE_ITEM,
  EDIT_DEAL_PAGE_ON_PLUS_EXPIRED_IN_DAY,
  EDIT_DEAL_PAGE_ON_MINUS_EXPIRED_IN_DAY,
  EDIT_DEAL_PAGE_ON_ADD_ITEM,
  EDIT_DEAL_PAGE_SHOW_SELECT_CONTACTS_DIALOG,
  EDIT_DEAL_PAGE_HIDE_SELECT_CONTACTS_DIALOG,
  EDIT_DEAL_PAGE_ON_SELECT_CONTACT,
  EDIT_DEAL_PAGE_ON_SELECT_CONTACT_FINAL,
  EDIT_DEAL_PAGE_ON_ITEM_PRICE_CHANGE,
  EDIT_DEAL_PAGE_RESET_ITEM_ERRORS_FIELD,
  EDIT_DEAL_PAGE_ON_SAVE_EDITED_PRODUCT_REQUEST,
  EDIT_DEAL_PAGE_RECEIVE_SAVED_PRODUCT_DATA,
  EDIT_DEAL_PAGE_RECEIVE_SAVED_PRODUCT_ERRORS,
} from './constants';

const editDealPageInitialState = fromJS({
  productData: null,
  productErrors: {
    product_name: [],
    expired_in_day: [],
    user_target: [],
    items: []
  },
  isLoading: false,
  tempRequestData: null,
  successSaved: false,
  showSelectContactDialog: false,
  tempSelectedContact: null,
})

function editDealPageReducer(state=editDealPageInitialState, action) {
  switch(action.type) {
    case LOCATION_CHANGE:
      return editDealPageInitialState;
    case EDIT_DEAL_PAGE_ON_SAVE_EDITED_PRODUCT_REQUEST:
      return state.set('isLoading', true)
                  .set('tempRequestData', fromJS(action.data));
    case EDIT_DEAL_PAGE_RECEIVE_SAVED_PRODUCT_DATA:
      return state.set('isLoading', false)
                  .set('successSaved', true);
    case EDIT_DEAL_PAGE_RECEIVE_SAVED_PRODUCT_ERRORS:
      return state.set('isLoading', false)
                  .set('productErrors', fromJS(action.errors));
    case EDIT_DEAL_PAGE_ON_ITEM_PRICE_CHANGE:
      return state.setIn(['productData', 'item_data', action.index, 'price'], action.value);
    case EDIT_DEAL_PAGE_RESET_ITEM_ERRORS_FIELD:
      return state.setIn(['productErrors', 'items', action.index, action.key], fromJS([]));
    case EDIT_DEAL_PAGE_HIDE_SELECT_CONTACTS_DIALOG:
      return state.set('showSelectContactDialog', false)
                  .setIn(['productData', 'user_target'], state.get('tempSelectedContact'));
    case EDIT_DEAL_PAGE_SHOW_SELECT_CONTACTS_DIALOG:
      return state.set('showSelectContactDialog', true)
                  .set('tempSelectedContact', state.getIn(['productData', 'user_target']));
    case EDIT_DEAL_PAGE_ON_SELECT_CONTACT:
      return state.setIn(['productData', 'user_target'], action.value);
    case EDIT_DEAL_PAGE_ON_SELECT_CONTACT_FINAL:
      return state.set('tempSelectedContact', null)
                  .set('showSelectContactDialog', false);
    case EDIT_DEAL_PAGE_ON_ADD_ITEM:
      return state.updateIn(['productData', 'item_data'], itemData => itemData.push(fromJS({
                      item_name: '',
                      price: '',
                      quantity: 1,
                      order_no: itemData.size,
                      itemNameRef: React.createRef(),
                      priceRef: React.createRef()
                   })))
                  .updateIn(['productErrors', 'items'], items => items.push(fromJS({
                      item_name: [],
                      price: [],
                      quantity: []
                  })))
                  .updateIn(['tempRequestData', 'item_data'], items => items.push(fromJS({
                      item_name: '',
                      price: '',
                      quantity: 1,
                      order_no: items.size
                   })))
    case EDIT_DEAL_PAGE_ON_PLUS_EXPIRED_IN_DAY:
      return state.updateIn(['productData', 'expired_in_day'], expiredInDay => expiredInDay + 1);
    case EDIT_DEAL_PAGE_ON_MINUS_EXPIRED_IN_DAY:
      return state.updateIn(['productData', 'expired_in_day'], expiredInDay => expiredInDay - 1);
    case EDIT_DEAL_PAGE_ON_PLUS_TAPPED:
      return state.updateIn(['productData', 'item_data', action.index, 'quantity'], quantity => quantity + 1)
    case EDIT_DEAL_PAGE_ON_MINUS_TAPPED:
      return state.updateIn(['productData', 'item_data', action.index, 'quantity'], quantity => quantity - 1)
    case EDIT_DEAL_PAGE_ON_REMOVE_ITEM:
      return state.updateIn(['productData', 'item_data'], items => items.delete(action.index));
    case EDIT_DEAL_PAGE_RESET_ERRORS_FIELD:
      return state.setIn(['productErrors', action.key], fromJS([]));
    case EDIT_DEAL_PAGE_FETCH_DEAL_PROUCT_DATA_REQUEST:
      return state.set('isLoading', true)
    case EDIT_DEAL_PAGE_RECEIVE_DEAL_PRODUCT_DATA:
      return state.set('isLoading', false)
                  .set('productData', fromJS(action.data))
                  .set('tempRequestData', fromJS(action.data))
                  .updateIn(['productData'], productData => productData.set('productNameRef', React.createRef()))
                  .setIn(['productErrors', 'items'], fromJS(action.data.item_data.map(item => ({
                    item_name: [],
                    price: [],
                    quantity: []
                  }))))
                  .updateIn(['productData', 'item_data'], 
                    items => items.map(item => item.set('itemNameRef', React.createRef())
                                                   .set('priceRef', React.createRef())));
    default:
      return state;
  }
}

export default editDealPageReducer;