import { push } from 'react-router-redux';
import {
  CONTENT_PAGE_ON_BOTTOM_NAVBAR_TAP
} from './constants';


export function onBotomNavBarTap(nextNav) {
  return {
    type: CONTENT_PAGE_ON_BOTTOM_NAVBAR_TAP,
    nextNav
  }
}


export function changePage(urlPage, type) {
  return dispatch => {
    dispatch(push(urlPage))
    dispatch(onBotomNavBarTap(type))
  }
}