import {
	isUndefined
} from 'lodash';

import {
	userGetDealProductData,
	saveEditedProduct
} from '../../api';

import {
	onSwitchToFreezeToggle
} from '../DealPage/actions';

import {
	convertErrorResponse
} from '../../utils';

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

export function onSaveEditedProductRequest(data) {
	return {
		type: EDIT_DEAL_PAGE_ON_SAVE_EDITED_PRODUCT_REQUEST,
		data
	}
}

export function receiveSavedProductData(data) {
	return {
		type: EDIT_DEAL_PAGE_RECEIVE_SAVED_PRODUCT_DATA,
		data
	}
}

export function receiveSavedProductErrors(errors) {
	return {
		type: EDIT_DEAL_PAGE_RECEIVE_SAVED_PRODUCT_ERRORS,
		errors
	}
}

export function onItemPriceChange(index, value) {
	return {
		type: EDIT_DEAL_PAGE_ON_ITEM_PRICE_CHANGE,
		value,
		index
	}
}

export function resetItemErrorsField(index, key) {
	return {
		type: EDIT_DEAL_PAGE_RESET_ITEM_ERRORS_FIELD,
		index,
		key
	}
}

export function onSelectContact(value) {
	return {
		type: EDIT_DEAL_PAGE_ON_SELECT_CONTACT,
		value
	}
}

export function onSelectContactFinal() {
	return {
		type: EDIT_DEAL_PAGE_ON_SELECT_CONTACT_FINAL,
		value
	}
}

export function showSelectContactsDialog() {
	return {
		type: EDIT_DEAL_PAGE_SHOW_SELECT_CONTACTS_DIALOG
	}
}

export function hideSelectContactsDialog() {
	return {
		type: EDIT_DEAL_PAGE_HIDE_SELECT_CONTACTS_DIALOG
	}
}


export function onAddItem() {
	return {
		type: EDIT_DEAL_PAGE_ON_ADD_ITEM
	}
}


export function onPlusExpiredInDay() {
	return {
		type: EDIT_DEAL_PAGE_ON_PLUS_EXPIRED_IN_DAY
	}
}

export function onMinusExpiredInDay() {
	return {
		type: EDIT_DEAL_PAGE_ON_MINUS_EXPIRED_IN_DAY,
	}
}

export function onPlusTapped(index) {
	return {
		type: EDIT_DEAL_PAGE_ON_PLUS_TAPPED,
		index
	}
}

export function onMinusTapped(index) {
	return {
		type: EDIT_DEAL_PAGE_ON_MINUS_TAPPED,
		index
	}
}

export function onRemoveItem(index) {
	return {
		type: EDIT_DEAL_PAGE_ON_REMOVE_ITEM,
		index
	}
}

export function resetErrorsField(key) {
	return {
		type: EDIT_DEAL_PAGE_RESET_ERRORS_FIELD,
		key
	}
}

export function fetchDealProductDataRequest() {
	return {
		type: EDIT_DEAL_PAGE_FETCH_DEAL_PROUCT_DATA_REQUEST,
	}
}

export function receiveDealProductData(data) {
	return {
		type: EDIT_DEAL_PAGE_RECEIVE_DEAL_PRODUCT_DATA,
		data
	}
}

export function fetchDealProductDataAction(productId) {
	return dispatch => {
		dispatch(onSwitchToFreezeToggle());
		dispatch(fetchDealProductDataRequest());
		return userGetDealProductData(productId)
			.then(response => response.data)
			.then(data => { dispatch(receiveDealProductData(data))})
			.catch(error => Promise.reject(error));
	}
}

export function saveEditedProductAction(productId, data) {
	return dispatch => {
		dispatch(onSaveEditedProductRequest(data));
		return saveEditedProduct(productId, data)
			.then(response => {
				if(response.status == 200) {
					dispatch(receiveSavedProductData(response.data));
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
					dispatch(receiveSavedProductErrors(errors));
				}
			})
	}
}