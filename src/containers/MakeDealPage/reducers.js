import { fromJS } from 'immutable';
import React from 'react';
import { LOCATION_CHANGE } from 'react-router-redux';

import {
  MAKE_DEAL_PAGE_FETCH_USER_CONTACTS_DATA_REQUEST,
  MAKE_DEAL_PAGE_RECEIVE_USER_CONTACTS_DATA,
  MAKE_DEAL_PAGE_SHOW_SELECT_CONTACT_DIALOG,
  MAKE_DEAL_PAGE_HIDE_SELECT_CONTACT_DIALOG,
  MAKE_DEAL_PAGE_ON_CONTACT_SELECTED,
  MAKE_DEAL_PAGE_ON_CONTACT_FINAL_SELECTED,
  MAKE_DEAL_PAGE_ON_ADD_ITEM,
  MAKE_DEAL_PAGE_ON_REMOVE_ITEM,
  MAKE_DEAL_PAGE_ON_PLUS_TAP,
  MAKE_DEAL_PAGE_ON_MINUS_TAP,
  MAKE_DEAL_PAGE_ON_PLUS_TAP_ITEM,
  MAKE_DEAL_PAGE_ON_MINUS_TAP_ITEM,
  MAKE_DEAL_PAGE_ON_ITEM_PRICE_CHANGE,
  MAKE_DEAL_SAVE_PRODUCT_REQUEST,
  MAKE_DEAL_RECEIVE_PRODUCT_DATA,
  MAKE_DEAL_RECEIVE_PRODUCT_ERRORS,
  MAKE_DEAL_RESET_ERRORS_FIELD,
  MAKE_DEAL_RESET_ERRORS_ITEM_FIELD,
  MAKE_DEAL_ON_USER_CHOICE_IMAGE,
  MAKE_DEAL_ON_USER_REMOVE_IMAGE,
  MAKE_DEAL_ON_USER_CHOICE_CREATION_PRODUCT_MODE,
  MAKE_DEAL_ON_SELECT_CONTACT_SEARCH_KEY_CHANGE,
  MAKE_DEAL_RESET_CONTACTS_DATA,
  MAKE_DEAL_ON_CONTACT_CLICK
} from './constants';


const makeDealInitialState = fromJS({
  contactsData: [],
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
  isLoading: false,
  showSelectContactDialog: false,
  tempSelectedContact: fromJS([]),
  successSaved: false,
  successSavedData: null,
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
  tempImage: null,
  tempImageUrl: null,
  isOnChoiceImage: null,
  creationProductMode: { value: 1, label: "Buat product baru"},
  selectContactSearchKey: '',
});


function makeDealReducer(state=makeDealInitialState, action) {
  switch(action.type) {
    case MAKE_DEAL_ON_CONTACT_CLICK:
      return state.updateIn(['contactsData', action.index], contact => {
        return contact.set('isSelected', !contact.get('isSelected'));
      });
    case MAKE_DEAL_RESET_CONTACTS_DATA:
      return state.set('contactsData', fromJS(action.data.map(contact => ({ ...contact, isSelected: false }))));
    case MAKE_DEAL_ON_SELECT_CONTACT_SEARCH_KEY_CHANGE:
      return state.set('selectContactSearchKey', action.key);
    case MAKE_DEAL_ON_USER_CHOICE_CREATION_PRODUCT_MODE:
      return state.set('creationProductMode', action.newMode || { value: 1, label: "Buat product baru"});
    case MAKE_DEAL_ON_USER_REMOVE_IMAGE:
      return state;
    case MAKE_DEAL_ON_USER_CHOICE_IMAGE:
      return state;
    case MAKE_DEAL_RESET_ERRORS_FIELD:
      return state.setIn(['productErrors', action.key], fromJS([]));
    case MAKE_DEAL_RESET_ERRORS_ITEM_FIELD:
      return state.setIn(['productErrors', 'items', action.itemIndex, action.key], fromJS([]));
    case LOCATION_CHANGE:
      return makeDealInitialState;
    case MAKE_DEAL_RECEIVE_PRODUCT_ERRORS: {
      const errors = fromJS(action.errors).delete('items');
      const stateErrors = state.get('productErrors');
      const itemErrors = fromJS(action.errors.items);
      const finalErrors = stateErrors.merge(errors).update('items', 
        items => items.map((item, index) => {
          return item.merge(fromJS(action.errors.items[index]));
        }));
      return state.set('isLoading', false)
                  .set('productErrors', finalErrors);
    }
    case MAKE_DEAL_RECEIVE_PRODUCT_DATA:
      return makeDealInitialState
              .set('successSaved', true)
              .set('successSavedData', fromJS(action.data));
    case MAKE_DEAL_SAVE_PRODUCT_REQUEST:
      return state.set('isLoading', true)
                  .set('tempRequestData', fromJS(action.data));
    case MAKE_DEAL_PAGE_ON_ITEM_PRICE_CHANGE:
      return state.updateIn(['product', 'itemData', action.index], 
        item => item.set('price', action.newPrice));
    case MAKE_DEAL_PAGE_ON_PLUS_TAP_ITEM:
      return state.updateIn(['product', 'itemData', action.itemIndex], 
        item => item.set('quantity', item.get('quantity') + 1));
    case MAKE_DEAL_PAGE_ON_MINUS_TAP_ITEM:
      return state.updateIn(['product', 'itemData', action.itemIndex], 
        item => item.set('quantity', item.get('quantity') - 1));
    case MAKE_DEAL_PAGE_ON_PLUS_TAP:
      return state.updateIn(['product', 'expireInDay'], number => number + 1);
    case MAKE_DEAL_PAGE_ON_MINUS_TAP:
      return state.updateIn(['product', 'expireInDay'], number => number - 1);
    case MAKE_DEAL_PAGE_ON_REMOVE_ITEM:
      return state.updateIn(['product', 'itemData'], itemData => itemData.delete(action.itemIndex));
    case MAKE_DEAL_PAGE_ON_ADD_ITEM:
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
    case MAKE_DEAL_PAGE_ON_CONTACT_FINAL_SELECTED:
      return state.set('showSelectContactDialog', false)
                  .setIn(['product', 'userTargets'], state.get('contactsData').filter(contact => contact.get('isSelected')));
    case MAKE_DEAL_PAGE_FETCH_USER_CONTACTS_DATA_REQUEST:
      return state.set('isLoading', true);
    case MAKE_DEAL_PAGE_RECEIVE_USER_CONTACTS_DATA:
      return state
              .set('isLoading', false)
              .set('contactsData', fromJS([...state.get('contactsData'), 
        ...action.data.map(contact => 
          ({ label: `${contact.profile.profile_name} (${contact.profile.user.first_name} ${contact.profile.user.last_name} - ${contact.profile.user.phone_number})`, 
                                                        value: contact.profile.id, data: contact }))]));
    case MAKE_DEAL_PAGE_SHOW_SELECT_CONTACT_DIALOG:
      return state
              .set('tempSelectedContact', state.get('product').get('userTarget'))
              .set('showSelectContactDialog', true);
    case MAKE_DEAL_PAGE_HIDE_SELECT_CONTACT_DIALOG:
      return state
              .set('product', fromJS({ ...state.get('product').toJS(), userTarget: state.get('tempSelectedContact')}))
              .set('showSelectContactDialog', false);
    case MAKE_DEAL_PAGE_ON_CONTACT_SELECTED:
      return state.set('product', fromJS({ ...state.get('product').toJS(), userTarget: action.selectedContact }));
    default:
      return state;
  }
}

export default makeDealReducer;