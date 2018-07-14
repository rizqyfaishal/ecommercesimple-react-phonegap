import { genericRequest, authenticatedRequest } from './request';

const API_PREFIX_URL = 'http://localhost:8000/api';

const storage = window.localStorage;
const auth = {
	login: (username, password) => genericRequest(`/auth/`, 'POST', { username, password }),
	verify: (token) => genericRequest('/auth-verify/', 'POST', { token })
}

export default auth;