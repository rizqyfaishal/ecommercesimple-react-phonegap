import React from 'react';
import { fromJS } from 'immutable';
import { findIndex } from 'lodash';
import {
  PRODUCT_LIST_PAGE_SHOW_PROFILE_DIALOG,
  PRODUCT_LIST_PAGE_HIDE_PROFILE_DIALOG,
  PRODUCT_LIST_PAGE_RECEIVE_PROFILE_DATA,
  PRODUCT_LIST_PAGE_ON_USER_SELECTED_PROFILE,
  PRODUCT_LIST_PAGE_ON_USER_CANCELED_SELECT_PROFILE,
  PRODUCT_LIST_PAGE_ON_USER_SELECTED_PROFILE_FINAL,
  PRODUCT_LIST_PAGE_CREATE_MODE,
  PRODUCT_LIST_PAGE_LIST_MODE,
  PRODUCT_LIST_PAGE_CHANGE_MODE,
  PRODUCT_LIST_PAGE_ON_ADD_ITEM,
  PRODUCT_LIST_PAGE_ON_REMOVE_ITEM,
  PRODUCT_LIST_PAGE_ON_PLUS_TAP_ITEM,
  PRODUCT_LIST_PAGE_ON_MINUS_TAP_ITEM,
  PRODUCT_LIST_PAGE_ON_CANCEL_DEAL_RESULT,
  PRODUCT_LIST_PAGE_ON_RESET_ERROR_FIELDS,
  PRODUCT_LIST_PAGE_ON_RESET_ITEM_ERROR_FIELDS,
  PRODUCT_LIST_PAGE_ON_ITEM_PRICE_CHANGE,
  PRODUCT_LIST_PAGE_ON_SAVE_PRODUCT_REQUEST,
  PRODUCT_LIST_PAGE_ON_RECEIVE_CREATED_PRODUCT_DATA,
  PRODUCT_LIST_PAGE_ON_RECEIVE_PRODUCT_ERRORS,
  PRODUCT_LIST_FETCH_PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_PAGE_ON_RECEIVE_PRODUCTS_DATA,
  PRODUCT_LIST_PAGE_ON_EXPAND_ITEM
} from './constants';

const productListPageInitialState = fromJS({
  tempImage: null,
  tempImageUrl: null,
  imageData: null,
  isLoadingDialog: false,
  newProfileErrors: {
    profile_name: [],
    description: []
  },
  currentProfileIndex: -1,
  currentProfile: null,
  tempImage: null,
  tempImageUrl: null,
  isLoading: false,
  currentExpandItemIndex: -1,
  isLoadingDialog: false,
  showProfileDialog: false,
  tempSelectedProfileIndex: -1,
  errors: [], 
  newProfileErrors: {
    profile_name: [],
    description: []
  },
  profiles: [],
  products: [],
  mode: PRODUCT_LIST_PAGE_LIST_MODE,
  product: {
    itemData: [
      {
        itemName: '',
        itemNameRef: React.createRef(),
        quantity: 1,
        price: '',
        priceRef: React.createRef(),
      }
    ],
    productNameRef: React.createRef(),
    productName: '',
    expireInDay: 1,
    userTargets: []
  },
   productErrors: {
    items: [
      {
        item_name: [],
        quantity: [],
        price: [],
      }
    ],
    product_name: [],
    expire_in_day: [],
    user_target: [],
  },
  tempRequestData: {
    items: [
      {
        item_name: '',
        quantity: 1,
        price: '',
      }
    ],
    product_name: '',
    expire_in_day: 1,
    user_target: []
  },
});


function productListPageReducer(state=productListPageInitialState, action) {
  switch(action.type) {
    case PRODUCT_LIST_PAGE_ON_EXPAND_ITEM:
      return state.set('currentExpandItemIndex', action.index);
    case PRODUCT_LIST_FETCH_PRODUCT_LIST_REQUEST:
      return state.set('isLoading',true);
    case PRODUCT_LIST_PAGE_ON_RECEIVE_PRODUCTS_DATA:
      return state.set('isLoading', false)
                  .set('products', fromJS(action.data));
    case PRODUCT_LIST_PAGE_ON_RECEIVE_PRODUCT_ERRORS:
      const errors = fromJS(action.errors).delete('items');
      const stateErrors = state.get('productErrors');
      const itemErrors = fromJS(action.errors.items);
      const finalErrors = stateErrors.merge(errors).update('items', 
        items => items.map((item, index) => {
          return item.merge(fromJS(action.errors.items[index]));
        }));
      return state.set('isLoading', false)
                  .set('productErrors', finalErrors);
    case PRODUCT_LIST_PAGE_ON_RECEIVE_CREATED_PRODUCT_DATA:
      return state.set('isLoading', false)
                  .set('mode', PRODUCT_LIST_PAGE_LIST_MODE)
                  .set('tempRequestData', productListPageInitialState.get('tempRequestData'))
                  .update('products', products => products.push(fromJS(action.data)));
    case PRODUCT_LIST_PAGE_ON_SAVE_PRODUCT_REQUEST:
      return state.set('isLoading', true)
                  .set('tempRequestData', action.data);
    case PRODUCT_LIST_PAGE_ON_ITEM_PRICE_CHANGE:
      return state.setIn(['product', 'itemData', action.index, 'price'], action.value);
    case PRODUCT_LIST_PAGE_ON_RESET_ERROR_FIELDS:
      return state.setIn(['productErrors', action.key], fromJS([]));
    case PRODUCT_LIST_PAGE_ON_RESET_ITEM_ERROR_FIELDS:
      return state.setIn(['productErrors', 'items', action.index, action.key], fromJS([]));
    case PRODUCT_LIST_PAGE_ON_CANCEL_DEAL_RESULT:
      return state.set('mode', PRODUCT_LIST_PAGE_LIST_MODE)
                  .set('product', productListPageInitialState.get('product'));
    case PRODUCT_LIST_PAGE_ON_PLUS_TAP_ITEM:
      return state.updateIn(['product', 'itemData', action.index], 
        item => item.set('quantity', item.get('quantity') + 1));
    case PRODUCT_LIST_PAGE_ON_MINUS_TAP_ITEM:
      return state.updateIn(['product', 'itemData', action.index], 
        item => item.set('quantity', item.get('quantity') - 1));
    case PRODUCT_LIST_PAGE_ON_REMOVE_ITEM:
      return state.updateIn(['product', 'itemData'], itemData => itemData.delete(action.index));
    case PRODUCT_LIST_PAGE_ON_ADD_ITEM:
      return state
            .updateIn(['product', 'itemData'], itemData => itemData.push(fromJS({
              itemName: '',
              itemNameRef: React.createRef(),
              quantity: 1,
              itemName: '',
              price: '',
              priceRef: React.createRef(),
            })))
            .updateIn(['productErrors', 'items'], itemDataErrors => itemDataErrors.push(fromJS({
              item_name: [],
              quantity: [],
              price: [],
            })))
            .updateIn(['tempRequestData', 'items'], items => items.push(fromJS({
              item_name: '',
              quantity: 1,
              price: '',
            })));
    case PRODUCT_LIST_PAGE_CHANGE_MODE:
      return state.set('mode', state.get('mode') == PRODUCT_LIST_PAGE_LIST_MODE 
        ? PRODUCT_LIST_PAGE_CREATE_MODE : PRODUCT_LIST_PAGE_LIST_MODE);
    case PRODUCT_LIST_PAGE_ON_USER_SELECTED_PROFILE:
      const index = findIndex(state.get('profiles').toJS(), profile => profile.value == action.value);
      const prevIndex = state.get('tempSelectedProfileIndex');
      return state.set('tempSelectedProfileIndex', index)
                  .updateIn(['profiles', prevIndex], profile => profile.set('isActive', false))
                  .updateIn(['profiles', index], profile => profile.set('isActive', true));
    case PRODUCT_LIST_PAGE_ON_USER_SELECTED_PROFILE_FINAL:
      return state.updateIn(['profiles', state.get('currentProfileIndex')], 
                    profileData => profileData.set('isActive', false))
                  .updateIn(['profiles', state.get('tempSelectedProfileIndex')], profileData => 
                    profileData.set('isActive', true))
                  .set('currentProfileIndex', state.get('tempSelectedProfileIndex'))
                  .set('currentProfile', state.get('profiles').toJS()[state.get('tempSelectedProfileIndex')])
                  .set('tempSelectedProfileIndex', state.get('profiles').size == 0 ? -1 : 0)
                  .set('showProfileDialog', false);
    case PRODUCT_LIST_PAGE_ON_USER_CANCELED_SELECT_PROFILE:
      const previousIndex = state.get('tempSelectedProfileIndex');
      const indexC = state.get('currentProfileIndex');
      return state.set('tempSelectedProfileIndex', state.get('profiles').size == 0 ? -1 : 0)
                  .updateIn(['profiles', previousIndex], profile => profile.set('isActive', false))
                  .updateIn(['profiles', indexC], profile => profile.set('isActive', true))
                  .set('showProfileDialog', false);
    case PRODUCT_LIST_PAGE_SHOW_PROFILE_DIALOG:
      return state.set('showProfileDialog', true);
    case PRODUCT_LIST_PAGE_HIDE_PROFILE_DIALOG:
      return state.set('showProfileDialog', false);
    case PRODUCT_LIST_PAGE_RECEIVE_PROFILE_DATA:
      const currentProfileIndex = action.data.length == 0 ? -1 : 0;
      const profileData = action.data.map((profile, index) => {
          if(index == 0) {
            return ({ label: profile.profile_name, value: profile.id, isActive: true, pict: profile.profile_picture });
          } else {
            return ({ label: profile.profile_name, value: profile.id, isActive: false, pict: profile.profile_picture });
          }
        });
      return state
        .set('currentProfileIndex', currentProfileIndex)
        .set('tempSelectedProfileIndex', action.data.length == 0 ? -1 : 0)
        .set('profiles', fromJS(profileData))
        .set('currentProfile', action.data.length == 0 ? null : profileData[0]);
    default:
      return state;
  }
}

export default productListPageReducer;