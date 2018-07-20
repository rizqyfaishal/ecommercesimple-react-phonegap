import { fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

import {
  INVOICE_SELLER_DETAIL_FETCH_INVOICE_DATA_REQUEST,
  INVOICE_SELLER_DETAIL_RECEIVE_INVOICE_DATA,
} from './constants';

const invoiceSellerDetailPageInitialState = fromJS({
	invoiceData: null,
	isLoading: false
});

function invoiceSellerDetailPageReducer(state=invoiceSellerDetailPageInitialState, action) {
	switch(action.type) {
		case LOCATION_CHANGE:
			return invoiceSellerDetailPageInitialState;
		case INVOICE_SELLER_DETAIL_FETCH_INVOICE_DATA_REQUEST:
			return state.set('isLoading', true);
		case INVOICE_SELLER_DETAIL_RECEIVE_INVOICE_DATA:
			return state.set('isLoading', false)	
									.set('invoiceData', fromJS(action.data));
		default:
			return state;
	}
}

export default invoiceSellerDetailPageReducer;
