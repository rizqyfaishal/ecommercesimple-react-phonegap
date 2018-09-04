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
  PRODUCT_LIST_PAGE_ON_MINUS_TAP_ITEM
} from './constants';

export function onPlusTapItem(index) {
  return {
    type: PRODUCT_LIST_PAGE_ON_PLUS_TAP_ITEM,
    index
  }
}

export function onMinuxTapItem(index) {
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