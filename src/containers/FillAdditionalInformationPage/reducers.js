import { fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import {
  FILL_ADDITIONAL_INFORMATION_PAGE_SET_ENABLE_BUTTON,
  FILL_ADDITIONAL_INFORMATION_PAGE_SET_DISABLE_BUTTON,
  FILL_ADDITIONAL_INFORMATION_PAGE_ON_SAVE_REQUEST,
  FILL_ADDITIONAL_INFORMATION_PAGE_ON_RECEIVE_RESPONSE_DATA,
  FILL_ADDITIONAL_INFORMATION_PAGE_ON_RECEIVE_RESPONSE_ERRORS
} from './constants';

const fillAdditionalInformationPageInitialState = fromJS({
  buttonEnabled: false,
  errors: {
    address: [],
    payment_method: []
  },
  isLoading: false,
  successSaved: false,
  formData: {
    address: null,
    payment_method: null
  }
});



function fillAdditionalInformationPageReducer(state=fillAdditionalInformationPageInitialState, action) {
  switch(action.type) {
    case LOCATION_CHANGE:
      return fillAdditionalInformationPageInitialState;
    case FILL_ADDITIONAL_INFORMATION_PAGE_SET_ENABLE_BUTTON:
      return state.set('buttonEnabled', true);
    case FILL_ADDITIONAL_INFORMATION_PAGE_SET_DISABLE_BUTTON:
      return state.set('buttonEnabled', false);
    case FILL_ADDITIONAL_INFORMATION_PAGE_ON_SAVE_REQUEST:
      return state.set('isLoading', true)
                  .set('formData', action.data);
    case FILL_ADDITIONAL_INFORMATION_PAGE_ON_RECEIVE_RESPONSE_DATA:
      return state.set('isLoading', false)
                  .set('successSaved', true);
    case FILL_ADDITIONAL_INFORMATION_PAGE_ON_RECEIVE_RESPONSE_ERRORS:
      return state.set('isLoading', false)
                  .set('errors', action.errors);
    default:
      return state;
  }
}

export default fillAdditionalInformationPageReducer;