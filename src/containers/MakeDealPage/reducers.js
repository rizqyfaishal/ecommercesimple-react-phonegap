import { fromJS } from 'immutable';
import React from 'react';
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


const makeDealInitialState = fromJS({
	contactData: [],
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
		userTarget: null
	},
	isLoading: false,
	showSelectContactDialog: false,
	tempSelectedContact: null,
	successSaved: false,
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
	tempRequestData: null
});


function makeDealReducer(state=makeDealInitialState, action) {
	console.log(action);
	switch(action.type) {
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
			return state.set('isLoading', false)
									.set('successSaved', true);
		case MAKE_DEAL_SAVE_PRODUCT_REQUEST:
			return state.set('isLoading', true)
									.set('tempRequestData', action.data);
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
						})));
		case MAKE_DEAL_PAGE_ON_CONTACT_FINAL_SELECTED:
			return state.set('showSelectContactDialog', false);
		case MAKE_DEAL_PAGE_FETCH_USER_CONTACTS_DATA_REQUEST:
			return state.set('isLoading', true);
		case MAKE_DEAL_PAGE_RECEIVE_USER_CONTACTS_DATA:
			return state
							.set('isLoading', false)
							.set('contactData', action.data.map(contact => ({ value: contact.contact_user.id, 
								label: contact.contact_user.username })));
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