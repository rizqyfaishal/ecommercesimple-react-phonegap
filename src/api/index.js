import { genericRequest, authenticatedRequest } from '../request';

export function userRegisterAPI(data) {
	return genericRequest('/auth-register/', 'POST', data);
}

export function userPostAdditionalInformation(data) {
	return authenticatedRequest('/additional-informations/', 'POST', data)
}

export function getUserProfiles() {
	return authenticatedRequest('/auth/profiles/', 'GET', null);
}

export function getUserContacts() {
	return authenticatedRequest('/auth/contacts/', 'GET', null);
}

export function getAllContacts() {
	return authenticatedRequest('/auth/get-all-contacts-data/', 'GET', null);
}

export function saveContacts(data) {
	return authenticatedRequest('/auth/contacts/saves/', 'POST', data);
}

export function saveProfileAPI(data) {
	return authenticatedRequest('/profiles/', 'POST', data);
}

export default function authenticatedAPI(url, method, data) {
	return authenticatedRequest(url, method, data);
}