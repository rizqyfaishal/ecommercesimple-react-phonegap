import { fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import {
  CONTENT_PAGE_ON_BOTTOM_NAVBAR_TAP,
  BOTTOM_NAVBAR_MY_OFFER,
  BOTTOM_NAVBAR_SHOPPING_LIST,
  BOTTOM_NAVBAR_ACCOUNT,
  BOTTOM_NAVBAR_CONTACTS,
  BOTTOM_NAVBAR_COMING_SOON,
} from './constants';

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

const contentPageIntialState = fromJS({
  currentBottomNavBar: BOTTOM_NAVBAR_MY_OFFER,
  menus: [
    {
      type: BOTTOM_NAVBAR_MY_OFFER,
      menuText: 'My Offer',
      icon: Shipping,
      activeIcon: ShippingActive,
      url: '/content/deal/make',
      isActive: true
    },
    {
      type: BOTTOM_NAVBAR_SHOPPING_LIST,
      menuText: 'Shops List',
      icon: ShoppingCart,
      activeIcon: ShoppingCartActive,
      url: '/content/shopping-list/seller',
      isActive: false
    },
    {
      type: BOTTOM_NAVBAR_CONTACTS,
      menuText: 'Contacts',
      icon: Phonebook,
      activeIcon: PhonebookActive,
      url: '/content/contacts',
      isActive: false
    },
    {
      type: BOTTOM_NAVBAR_COMING_SOON,
      menuText:'Coming Soon',
      icon: Coupon,
      activeIcon: CouponActive,
      url: '/content/coming-soon',
      isActive: false
    },
    {
      type: BOTTOM_NAVBAR_ACCOUNT,
      menuText: 'Account',
      icon: Protect,
      activeIcon: ProtectActive,
      url: '/content/accounts',
      isActive: false
    }
  ]
})


const contentPageReducer = function(state = contentPageIntialState, action) {
  switch(action.type) {
    case CONTENT_PAGE_ON_BOTTOM_NAVBAR_TAP:
      return state.set('currentBottomNavBar', action.nextNav)
                  .update('menus', menus => menus.map(menu => 
                    menu.get('type') == action.nextNav ? menu.set('isActive', true) : menu.set('isActive', false)));
    default:
      return state;
  }
}

export default contentPageReducer;