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
  PRODUCT_LIST_PAGE_ON_MINUS_TAP_ITEM
} from './constants';

const productListPageInitialState = fromJS({
  currentProfileIndex: -1,
  currentProfile: null,
  tempImage: null,
  tempImageUrl: null,
  isLoading: false,
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
    case PRODUCT_LIST_PAGE_ON_PLUS_TAP_ITEM:
      return state.updateIn(['product', 'itemData', action.itemIndex], 
        item => item.set('quantity', item.get('quantity') + 1));
    case PRODUCT_LIST_PAGE_ON_MINUS_TAP_ITEM:
      return state.updateIn(['product', 'itemData', action.itemIndex], 
        item => item.set('quantity', item.get('quantity') - 1));
    case PRODUCT_LIST_PAGE_ON_REMOVE_ITEM:
      return state.updateIn(['product', 'itemData'], itemData => itemData.delete(action.itemIndex));
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
      return state.set('currentProfileIndex', state.get('tempSelectedProfileIndex'))
                  .set('tempSelectedProfileIndex', state.get('profiles').size == 0 ? -1 : 0)
                  .set('showProfileDialog', false);
    case PRODUCT_LIST_PAGE_ON_USER_CANCELED_SELECT_PROFILE:
      return state.set('tempSelectedProfileIndex', state.get('profiles').size == 0 ? -1 : 0)
                  .set('showProfileDialog', false);
    case PRODUCT_LIST_PAGE_SHOW_PROFILE_DIALOG:
      return state.set('showProfileDialog', true);
    case PRODUCT_LIST_PAGE_HIDE_PROFILE_DIALOG:
      return state.set('showProfileDialog', false);
    case PRODUCT_LIST_PAGE_RECEIVE_PROFILE_DATA:
      const currentProfileIndex = action.data.length == 0 ? -1 : 0;
      return state
        .set('currentProfileIndex', currentProfileIndex)
        .set('tempSelectedProfileIndex', action.data.length == 0 ? -1 : 0)
        .set('currentProfile', action.data.length == 0 ? null : action.data[0])
        .set('profiles', fromJS(action.data.map((profile, index) => {
          if(index == 0) {
            return ({ label: profile.profile_name, value: profile.id, isActive: true, pict: profile.profile_picture });
          } else {
            return ({ label: profile.profile_name, value: profile.id, isActive: false, pict: profile.profile_picture });
          }
        })));
    default:
      return state;
  }
}

export default productListPageReducer;