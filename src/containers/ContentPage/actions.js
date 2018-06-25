import {
	CONTENT_PAGE_ON_BOTTOM_NAVBAR_TAP
} from './constants';


export function onBotomNavBarTap(nextNav) {
	return {
		type: CONTENT_PAGE_ON_BOTTOM_NAVBAR_TAP,
		nextNav
	}
}

