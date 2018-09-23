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
import ProductListPage from '../ProductListPage';
import ContactPage from '../ContactPage';
import FillAdditionalInformationPage from '../FillAdditionalInformationPage';
import InvoiceBuyerDetailPage from '../InvoiceBuyerDetailPage';
import InvoiceSellerDetailPage from '../InvoiceSellerDetailPage';
import EditDealPage from '../EditDealPage';
import ProfileDetailPage from '../ProfileDetailPage';


import {
  BOTTOM_NAVBAR_MY_OFFER,
  BOTTOM_NAVBAR_SHOPPING_LIST,
  BOTTOM_NAVBAR_ACCOUNT,
  BOTTOM_NAVBAR_CONTACTS,
  BOTTOM_NAVBAR_COMING_SOON,
} from './constants';

import {
  onBotomNavBarTap,
  changePage
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
    max-width: 600px;
    justify-self: stretch;
  }
`;


class ContentPage extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    const { dispatch, global } = this.props;
    if(isNull(global.userData) && !global.isLoggedIn) {
      dispatch(push('/login'));
    }
  } 

  render() {
    const { dispatch, contentPage } = this.props;
    const { match } = this.props;
    const menus = contentPage.menus.map(menu => ({ ...menu, onTap: () => 
      { dispatch(changePage(menu.url, menu.type))}}))
    return (
      <ContentPageWrapper>
        <div>
          <Route path={`${match.url}/deal`} component={DealPage}/>
          <Route path={`${match.url}/profile/:profileId`} component={ProfileDetailPage} />
          <Route path={`${match.url}/shopping-list`} component={ShoppingListPage}/>
          <Route path={`${match.url}/accounts`} component={AccountPage}/>
          <Route path={`${match.url}/product-list`} component={ProductListPage}/>
          <Route path={`${match.url}/contacts`} component={ContactPage}/>
          <Route path={`${match.url}/fill-additional-information`} component={FillAdditionalInformationPage} />
          <Route path={`${match.url}/invoices/buyer/:productId`} component={InvoiceBuyerDetailPage} />
          <Route path={`${match.url}/invoices/seller/:productId`} component={InvoiceSellerDetailPage} />
        </div>
        <div>
          <BottomNavBar menus={menus}/>
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