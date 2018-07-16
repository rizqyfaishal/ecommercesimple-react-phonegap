import { isUndefined } from 'lodash';
import { getUserContacts, saveProduct } from '../../api';
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
	MAKE_DEAL_RECEIVE_PRODUCT_ERRORS
} from './constants';
import {
	convertErrorResponse
} from '../../utils';


export function receiveProductErrors(errors) {
	return {
		type: MAKE_DEAL_RECEIVE_PRODUCT_ERRORS,
		errors
	}
}

export function receiveProductData(data) {
	return {
		type: MAKE_DEAL_RECEIVE_PRODUCT_DATA,
		data
	}
}

export function onSaveProductRequest(data) {
	return {
		type: MAKE_DEAL_SAVE_PRODUCT_REQUEST,
		data
	}
}

export function onItemPriceChange(index, newPrice) {
	return {
		type: MAKE_DEAL_PAGE_ON_ITEM_PRICE_CHANGE,
		index,
		newPrice
	}
}

export function onPlusTapItem(itemIndex) {
	return {
		type: MAKE_DEAL_PAGE_ON_PLUS_TAP_ITEM,
		itemIndex
	}
}

export function onMinusTapItem(itemIndex) {
	return {
		type: MAKE_DEAL_PAGE_ON_MINUS_TAP_ITEM,
		itemIndex
	}
}

export function onMinusTap() {
	return {
		type: MAKE_DEAL_PAGE_ON_MINUS_TAP
	}
}

export function onPlusTap() {
	return {
		type: MAKE_DEAL_PAGE_ON_PLUS_TAP
	}
}

export function onRemoveItem(itemIndex) {
	return {
		type: MAKE_DEAL_PAGE_ON_REMOVE_ITEM,
		itemIndex
	}
}

export function onAddItem() {
	return {
		type: MAKE_DEAL_PAGE_ON_ADD_ITEM,
	}
}

export function onContactFinalSelected() {
	return {
		type: MAKE_DEAL_PAGE_ON_CONTACT_FINAL_SELECTED
	}
}

export function onContactSelected(selectedContact) {
	return {
		type: MAKE_DEAL_PAGE_ON_CONTACT_SELECTED,
		selectedContact
	}
}

export function fetchUserContactsDataRequest() {
	return {
		type: MAKE_DEAL_PAGE_FETCH_USER_CONTACTS_DATA_REQUEST
	}
}

export function receiveUserContactsData(data) {
	return {
		type: MAKE_DEAL_PAGE_RECEIVE_USER_CONTACTS_DATA,
		data
	}
}

export function showSelectContactDialog() {
	return {
		type: MAKE_DEAL_PAGE_SHOW_SELECT_CONTACT_DIALOG,
	}
}

export function hideSelectContactDialog() {
	return {
		type: MAKE_DEAL_PAGE_HIDE_SELECT_CONTACT_DIALOG
	}
}

export function fetchUserContactsData() {
	return dispatch => {
		dispatch(fetchUserContactsDataRequest());
		return getUserContacts()
			.then(response => {
				if(response.status == 200) {
					dispatch(receiveUserContactsData(response.data));
					dispatch(push('/content/deal/make'));
				}
			})
			.catch(error => {
				throw error;
			})
	}
}


export function saveProductAction(data) {
	return dispatch => {
		dispatch(onSaveProductRequest(data));
		return saveProduct(data)
			.then(response => {
				console.log(response);
				if(response.status == 201) {
					dispatch(receiveProductData(response.data));
				}
			})
			.catch(error => {
				if(error.response.status == 400) {
					const errors = {
						product_name:  convertErrorResponse(error.response.data.product_name),
						expire_in_day:  convertErrorResponse(error.response.data.expire_in_day),
						user_target: convertErrorResponse(error.response.data.user_target),
						items: !isUndefined(error.response.data) ? error.response.data.items.map(item => ({
							item_name: convertErrorResponse(item.item_name),
							price: convertErrorResponse(item.price),
							quantity: convertErrorResponse(item.quantity)
						})) : data.items.map(item => ({ 
							item_name: [],
							price: [],
							quantity: []
						}))
					}
					dispatch(receiveProductErrors(errors));
				}
			})

	}
}