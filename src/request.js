import axios from 'axios';

const localStorage = window.localStorage;

const genericRequestInstance = axios.create({
	baseURL: 'http://35.240.171.112/api',
	crossdomain: true
});


export const genericRequest = (url, method, data) => 
	genericRequestInstance({ url, method, data })

export const authenticatedRequest = (url, method, data) => {
	const authenticatedRequestInstance = axios.create({
		baseURL: 'http://35.240.171.112/api',
		crossdomain: true,
		headers: {
			'Authorization': `JWT ${localStorage.getItem('auth-token')}`,
		}
	});
	return authenticatedRequestInstance({ url, method, data })
}
