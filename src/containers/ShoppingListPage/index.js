import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { push } from 'react-router-redux';
import swal from 'sweetalert';

import {
	SHOPPING_LIST_PAGE_CUSTOM_TAB_BUYER,
	SHOPPING_LIST_PAGE_CUSTOM_TAB_SELLER
} from './constants';

import {
	onCustomTabTap
} from './actions';

import CustomTab from '../../components/CustomTab';

import InvoiceBuyerPage from '../../containers/InvoiceBuyerPage';
import InvoiceSellerPage from '../../containers/InvoiceSellerPage';



const ShoppingListPageWrapper = styled.div`
	display: grid;
	grid-template-rows: 52px 1fr;
	grid-template-columns: 1fr;

	grid-template-areas: "custom-tab" "invoice-content";


	& > div:nth-child(1) {
		grid-area: custom-tab;
	}

	& > div:nth-child(2) {
		grid-area: invoice-content;
	}

`;

const changePage = (url, currentTab) => (dispatch) => {
		dispatch(onCustomTabTap(currentTab));
		dispatch(push(url));
	}

const menus = [
	{
		text: 'Buyer',
		url: '/content/shopping-list/buyer',
		content: SHOPPING_LIST_PAGE_CUSTOM_TAB_BUYER
	},
	{
		text: 'Seller',
		url: '/content/shopping-list/seller',
		content: SHOPPING_LIST_PAGE_CUSTOM_TAB_SELLER	
	}
]

class ShoppingListPage extends Component {

	constructor(props) {
		super(props);

	}

	render() {
		console.log(this.props);
		const { match, dispatch, shoppingListPage } = this.props;
		const menuProps = menus.map(menu => {
			return {
					...menu,
					onTap: () => {
						dispatch(changePage(menu.url, menu.content));
					},
					isActive: menu.content == shoppingListPage.currentTab
				}
		})
		return (
				<ShoppingListPageWrapper>
					<CustomTab menus={menuProps} />
					<div>
						<Route path={`${match.url}/seller`} component={InvoiceSellerPage} />
						<Route path={`${match.url}/buyer`} component={InvoiceBuyerPage} />
					</div>
				</ShoppingListPageWrapper>
			)
	}
}


const mapStateToProps = (state) => ({
	shoppingListPage: state.get('shoppingListPage').toJS()
})

const mapDispatchToProps = (dispatch) => ({
	dispatch: dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingListPage);