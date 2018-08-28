import { genericRequest, authenticatedRequest } from './request';

const storage = window.localStorage;
const auth = {
	login: (phone_number, password) => genericRequest(`/auth/`, 'POST', { phone_number, password }),
	verify: (token) => genericRequest('/auth-verify/', 'POST', { token })
}

export default auth;