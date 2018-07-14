import React, { Component } from 'react';
import styled from 'styled-components';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { fromObject } from 'immutable';
import { isUndefined, isNull } from 'lodash';

import BottomNavBar from '../../components/BottomNavBar';

import DealPage from '../DealPage';
import AccountPage from '../AccountPage';
import ShoppingListPage from '../ShoppingListPage';
import ComingSoonPage from '../ComingSoonPage';
import ContactPage from '../ContactPage';
import FillAdditionalInformationPage from '../FillAdditionalInformationPage';

import {
	BOTTOM_NAVBAR_MY_OFFER,
	BOTTOM_NAVBAR_SHOPPING_LIST,
	BOTTOM_NAVBAR_ACCOUNT,
	BOTTOM_NAVBAR_CONTACTS,
	BOTTOM_NAVBAR_COMING_SOON,
} from './constants';

import {
	onBotomNavBarTap
} from './actions';

import Coupon from '../../images/coupon.svg';
import CouponActive from '../../images/coupon_active.svg';
import Phonebook from '../../images/phonebook.svg';
import PhonebookActive from '../../images/phonebook_active.svg';
import Protect from '../../images/protect.svg';
import ProtectActive from '../../images/protect_active.svg';
import Shipping from '../../images/shipping.svg';
import ShippingActive from '../../images/shipping_active.svg';
import ShoppingCart from '../../images/shopping-cart.svg';
import ShoppingCartActive from '../../images/shopping-cart_active.svg';

const changePage = (urlPage, type) =>
	(dispatch) => {
		dispatch(push(urlPage))
		dispatch(onBotomNavBarTap(type))
	}

const ContentPageWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;

	& > div:nth-child(1) {
		justify-self: stretch;
		width: 100%;		
	}

	& > div:nth-child(2) {
		position: fixed;
		z-index: 20;
		bottom: 0;
		width: 100%;
		justify-self: stretch;
	}
`;

const menus = [
	{
		type: BOTTOM_NAVBAR_MY_OFFER,
		menuText: 'My Offer',
		icon: Shipping,
		activeIcon: ShippingActive,
		url: '/content/deal/make'
	},
	{
		type: BOTTOM_NAVBAR_SHOPPING_LIST,
		menuText: 'Shops List',
		icon: ShoppingCart,
		activeIcon: ShoppingCartActive,
		url: '/content/shopping-list/seller'
	},
	{
		type: BOTTOM_NAVBAR_CONTACTS,
		menuText: 'Contacts',
		icon: Phonebook,
		activeIcon: PhonebookActive,
		url: '/content/contacts'
	},
	{
		type: BOTTOM_NAVBAR_COMING_SOON,
		menuText:'Coming Soon',
		icon: Coupon,
		activeIcon: CouponActive,
		url: '/content/coming-soon'
	},
	{
		type: BOTTOM_NAVBAR_ACCOUNT,
		menuText: 'Account',
		icon: Protect,
		activeIcon: ProtectActive,
		url: '/content/accounts'
	}
]

class ContentPage extends Component {
	constructor(props) {
		super(props);

	}

	componentWillMount() {
		const { dispatch, global } = this.props;
		if(!isNull(global.userData) && (isUndefined(global.userData.additional_information))) {
			dispatch(push('/content/fill-additional-information'));
		}
	}	

	render() {
		const { dispatch, contentPage } = this.props;
		const menuProps = menus.map(menu => {
			if(menu.type == contentPage.currentBottomNavBar) {
				return { ...menu,  onTap: () => {dispatch(changePage(menu.url, menu.type))}, isActive: true};
			}
			return { ...menu,  onTap: () => {dispatch(changePage(menu.url, menu.type))}, isActive: false}
		})
		const { match } = this.props;
		return (
			<ContentPageWrapper>
				<div>
					<Route path={`${match.url}/deal`} component={DealPage}/>
          <Route path={`${match.url}/shopping-list`} component={ShoppingListPage}/>
          <Route path={`${match.url}/accounts`} component={AccountPage}/>
          <Route path={`${match.url}/coming-soon`} component={ComingSoonPage}/>
          <Route path={`${match.url}/contacts`} component={ContactPage}/>
          <Route path={`${match.url}/fill-additional-information`} component={FillAdditionalInformationPage} />
				</div>
				<div>
					<BottomNavBar menus={menuProps}/>
				</div>
			</ContentPageWrapper>
		)
	}
}

const mapDispatchToProps = (dispatch) => ({
	dispatch: dispatch
})

const mapStateTopProps = (state) => ({
	contentPage: state.get('contentPage').toJS(),
	global: state.get('global').toJS()
})

export default connect(mapStateTopProps, mapDispatchToProps)(ContentPage);