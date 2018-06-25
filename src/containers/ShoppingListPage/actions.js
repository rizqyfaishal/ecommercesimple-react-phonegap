import { 
	SHOPPING_LIST_PAGE_ON_CUSTOM_TAB_TAP
} from './constants';
 
export function onCustomTabTap(currentTab) {
	return {
		currentTab,
		type: SHOPPING_LIST_PAGE_ON_CUSTOM_TAB_TAP
	}
}

