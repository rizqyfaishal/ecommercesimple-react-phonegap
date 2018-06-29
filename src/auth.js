import { genericRequest, authenticatedRequest } from './request';

const API_PREFIX_URL = 'http://localhost:8000/api';

const storage = window.localStorage;
const auth = {
	login: (username, password) => {
		return genericRequest(`${API_PREFIX_URL}/auth/`, 'POST', { username, password })
			.then(response => {
				if(response.status == 200) {
					console.log(response.json());
					return true;
				}
			})
			.catch(response => {
				console.log(response);
				return false;
			})
	}
}

export default auth;