import {
	DEAL_PAGE_ON_TOGGLE_TAPPED,
	DEAL_PAGE_ON_SHOW_PROFILE_DIALOG,
	DEAL_PAGE_ON_HIDE_PROFILE_DIALOG
} from './constants';

export function onToggleTapped() {
	return {
		type: DEAL_PAGE_ON_TOGGLE_TAPPED
	}
}

export function onShowProfileDialog() {
	return {
		type: DEAL_PAGE_ON_SHOW_PROFILE_DIALOG
	}
}

export function onHideProfileDialog() {
	return {
		type: DEAL_PAGE_ON_HIDE_PROFILE_DIALOG,
	}
}