import 'whatwg-fetch';

const localStorage = window.localStorage;
const headers =  { 
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
	'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
	'Content-Type': 'application/json'
}

export const genericRequest = (url, method, data) => 
	fetch(url, 
		{ 	credentials: 'same-origin',
			method: method, 
			headers: headers,
			body: JSON.stringify(data)
		});

export const authenticatedRequest = (url, method, data) =>
	fetch(url, 
		{ 	credentials: 'same-origin',
			method: method, 
			headers: { ...headers, 'Authorization': `JWT ${localStorage.get('auth-token')}` },
			body: JSON.stringify(data)
		}
	);
