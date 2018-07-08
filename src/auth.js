import { genericRequest, authenticatedRequest } from './request';

const API_PREFIX_URL = 'http://localhost:8000/api';

const storage = window.localStorage;
const auth = {
	login: (username, password) => {
		return genericRequest(`/auth/`, 'POST', { username, password })
			.then(response => {
				if(response.status == 200) {
					return {
						status: true,
						data: response.data
					}
				}
			})
			.catch(response => {
				return false;
			})
	}
}

export default auth;