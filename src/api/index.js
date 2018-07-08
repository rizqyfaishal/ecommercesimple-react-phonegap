import { genericRequest, authenticatedRequest } from '../request';

export function userRegisterAPI(data) {
	return genericRequest('/auth-register/', 'POST', data);
}