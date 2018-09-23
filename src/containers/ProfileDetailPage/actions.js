import {
	getUserProfileDetail
} from '../../api';


import {
	PROFILE_DETAIL_PAGE_FETCH_PROFILE_DATA_REQUEST,
	PROFILE_DETAIL_PAGE_RECEIVE_PROFILE_DATA
} from './constants';


export function fetchProfileDataRequest() {
	return {
		type: PROFILE_DETAIL_PAGE_FETCH_PROFILE_DATA_REQUEST
	}
}

export function receiveProfileData(data) {
	return {
		type: PROFILE_DETAIL_PAGE_RECEIVE_PROFILE_DATA,
		data
	}
}

export function fetchProfileData(id) {
	return dispatch => {
		return getUserProfileDetail(id)
			.then(response => {
				if(response.status == 200) {
					dispatch(receiveProfileData(response.data));
				}
			})
			.catch(error => {
				throw error;
			}) 
	}
}