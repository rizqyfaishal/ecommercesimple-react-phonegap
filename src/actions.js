import {
	GLOBAL_SET_FLASH_MESSAGE,
	GLOBAL_UNSET_FLASH_MESSAGE,
	GLOBAL_CLEAR_FLASH_MESSAGE,
} from './constants';

export function setFlashMessage(key, message) {
	return {
		type: GLOBAL_SET_FLASH_MESSAGE,
		message,
		key
	}
}

export function unsetFlashMessage(key) {
	return {
		type: GLOBAL_UNSET_FLASH_MESSAGE,
		key
	}
}

export function clearFlashMessage() {
	return {
		type: GLOBAL_CLEAR_FLASH_MESSAGE,
	}
}
