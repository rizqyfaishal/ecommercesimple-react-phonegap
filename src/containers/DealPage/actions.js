import { isUndefined } from 'lodash';
import {
  DEAL_PAGE_ON_TOGGLE_TAPPED,
  DEAL_PAGE_ON_SHOW_PROFILE_DIALOG,
  DEAL_PAGE_ON_HIDE_PROFILE_DIALOG,
  DEAL_PAGE_FETCH_USER_PROFILES_DATA_REQUEST,
  DEAL_PAGE_RECEIVE_USER_PROFILES_DATA,
  DEAL_PAGE_ON_SAVE_NEW_PROFILE_REQUEST,
  DEAL_PAGE_RECEIVE_SAVED_NEW_PROFILE_DATA,
  DEAL_PAGE_RECEIVE_SAVED_NEW_PROFILE_ERRORS,
  DEAL_PAGE_ON_PROFILE_SELECTED,
  DEAL_PAGE_ON_PROFILE_TEMP_SELECTED,
  DEAL_PAGE_ON_SAVE_NEW_PROFILE_FROM_DIALOG_REQUEST,
  DEAL_PAGE_ON_CANCEL_PROFILE_SELECTED,
  DEAL_PAGE_ON_SWITCH_PROFILE,
  DEAL_PAGE_ON_SWITCH_OFFER,
  DEAL_PAGE_ON_SWITCH_TO_FREEZE_TOGGLE,
  DEAL_PAGE_SET_TOGGLE_STATUS
} from './constants';

import {
  getUserContacts,
  getUserProfiles,
  saveProfileAPI
} from '../../api';

import {
  fetchUserContactsData
} from '../MakeDealPage/actions';

export function onSwitchToFreezeToggle() {
  return {
    type: DEAL_PAGE_ON_SWITCH_TO_FREEZE_TOGGLE
  }
}

export function onSwitchProfile() {
  return {
    type: DEAL_PAGE_ON_SWITCH_PROFILE,
  }
}

export function onSwitchOffer() {
  return {
    type: DEAL_PAGE_ON_SWITCH_OFFER
  }
}

export function cancelProfileSelected() {
  return {
    type: DEAL_PAGE_ON_CANCEL_PROFILE_SELECTED
  }
}

export function onSaveNewProfileFromDialogRequest() {
  return {
    type: DEAL_PAGE_ON_SAVE_NEW_PROFILE_FROM_DIALOG_REQUEST
  }
}

export function onProfileTempSelected(tempProfile) {
  return {
    type: DEAL_PAGE_ON_PROFILE_TEMP_SELECTED,
    tempProfile
  }
}

export function onToggleTapped() {
  return {
    type: DEAL_PAGE_ON_TOGGLE_TAPPED
  }
}

export function onShowProfileDialog() {
  return {
    type: DEAL_PAGE_ON_SHOW_PROFILE_DIALOG
  }
}

export function onHideProfileDialog() {
  return {
    type: DEAL_PAGE_ON_HIDE_PROFILE_DIALOG,
  }
}

export function fetchUserProfilesDataRequest() {
  return {
    type: DEAL_PAGE_FETCH_USER_PROFILES_DATA_REQUEST,
  }
}

export function receiveUserProfilesData(data) {
  return {
    type: DEAL_PAGE_RECEIVE_USER_PROFILES_DATA,
    data
  }
}

export function onSaveNewProfileRequest() {
  return {
    type: DEAL_PAGE_ON_SAVE_NEW_PROFILE_REQUEST
  }
}

export function receiveSavedNewProfileData(data) {
  return {
    type: DEAL_PAGE_RECEIVE_SAVED_NEW_PROFILE_DATA,
    data
  }
}

export function receiveSavedNewProfileErrors(errors) {
  return {
    type: DEAL_PAGE_RECEIVE_SAVED_NEW_PROFILE_ERRORS,
    errors
  }
}

export function onProfileSelected() {
  return {
    type: DEAL_PAGE_ON_PROFILE_SELECTED
  }

}

export function setToggleStatus(toggleStatus) {
  return {
    type: DEAL_PAGE_SET_TOGGLE_STATUS,
    toggleStatus
  }
}

export function fetchUserProfilesData() {
  return dispatch => {
    dispatch(fetchUserProfilesDataRequest());
    return getUserProfiles()
      .then(response => {
        if(response.status == 200) {
          dispatch(receiveUserProfilesData(response.data));
          dispatch(fetchUserContactsData());        }
      })
      .catch(err => {
        throw err;
      })
  }
}

export function onSaveNewProfile(data, dialog, ref) {
  return dispatch => {
    if(dialog) {
      dispatch(onSaveNewProfileFromDialogRequest());
    } else {
      dispatch(onSaveNewProfileRequest());
    }
    return saveProfileAPI(data)
      .then(response => {
        if(response.status == 201) {
          dispatch(receiveSavedNewProfileData(response.data));
          if(dialog) {
            ref.current.value = '';
          }
        }
      })
      .catch(error => {
        if(error.response.status == 400) {
          if(isUndefined(error.response.data.non_field_errors)) {
            dispatch(receiveSavedNewProfileErrors(error.response.data));
          } else {
            dispatch(receiveSavedNewProfileErrors({ profile_name: error.response.data.non_field_errors }));
          }
        } 
      })
  }
}