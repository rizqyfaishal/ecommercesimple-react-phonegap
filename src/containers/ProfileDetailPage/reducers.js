import { fromJS } from 'immutable';
import {
  PROFILE_DETAIL_PAGE_FETCH_PROFILE_DATA_REQUEST,
  PROFILE_DETAIL_PAGE_RECEIVE_PROFILE_DATA
} from './constants';

const profileDetailPageInitialState = fromJS({
  profileData: null,
  isLoading: false,
});


function profileDetailPageReducer(state=profileDetailPageInitialState, action) {
  switch(action.type) {
    case PROFILE_DETAIL_PAGE_FETCH_PROFILE_DATA_REQUEST:
      return state.set('isLoading', true);
    case PROFILE_DETAIL_PAGE_RECEIVE_PROFILE_DATA:
      return state.set('profileData', fromJS(action.data))
                  .set('isLoading', false);
    default:
      return state;
  }
}

export default profileDetailPageReducer;