import { fromJS } from 'immutable';
import { findIndex } from 'lodash';
import {
  DEAL_PAGE_ON_TOGGLE_TAPPED,
  DEAL_PAGE_ON_SHOW_PROFILE_DIALOG,
  DEAL_PAGE_ON_HIDE_PROFILE_DIALOG,
  TOGGLE_STATUS_BUY,
  TOGGLE_STATUS_SELL,
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
  DEAL_PAGE_ON_SWITCH_OFFER
} from './constants';


const dealPageInitialState = fromJS({
  currentToggleStatus: TOGGLE_STATUS_SELL,
  currentProfile: 1,
  profiles: null,
  showProfileDialog: false,
  isLoading: false,
  isLoadingDialog: false,
  newProfileErrors: {
    profile_name: []
  },
  tempSelectedProfile: -1,
  currentProfileIndex: 0,
});

function dealPageReducer(state = dealPageInitialState, action) {
  switch(action.type) {
    case DEAL_PAGE_ON_SAVE_NEW_PROFILE_FROM_DIALOG_REQUEST:
      return state.set('isLoadingDialog', true);
    case DEAL_PAGE_ON_TOGGLE_TAPPED: {
      const currentStatus = state.get('currentToggleStatus');
      if(currentStatus == TOGGLE_STATUS_SELL) {
        return state.set('currentToggleStatus', TOGGLE_STATUS_BUY);
      }
      return state.set('currentToggleStatus', TOGGLE_STATUS_SELL);
    }
    case DEAL_PAGE_ON_HIDE_PROFILE_DIALOG:
      return state.set('showProfileDialog', false);
    case DEAL_PAGE_ON_SHOW_PROFILE_DIALOG:
      return state.set('showProfileDialog', true);
    case DEAL_PAGE_FETCH_USER_PROFILES_DATA_REQUEST:
      return state.set('isLoading', true);
    case DEAL_PAGE_RECEIVE_USER_PROFILES_DATA:{
      let currentProfileIndex = -1;
      const profiles = action.data.map((profile, index) => {
        if(index == 0) {
          currentProfileIndex = 0;
          return ({ label: profile.profile_name, value: profile.id, isActive: true });
        } else {
          return ({ label: profile.profile_name, value: profile.id, isActive: false });
        }
      })
      const currentProfile = profiles.length > 0 ? profiles[0].value : -1;
      return state.set('profiles', profiles)
                  .set('currentProfile', currentProfile)
                  .set('currentProfileIndex', currentProfileIndex)
                  .set('isLoading', false);
    }
    case DEAL_PAGE_ON_SAVE_NEW_PROFILE_REQUEST:
      return state.set('isLoading', true);
    case DEAL_PAGE_RECEIVE_SAVED_NEW_PROFILE_DATA: {
      const currentProfile = state.get('currentProfile');
      const profiles = [...state.get('profiles'), { label: action.data.profile_name, 
        value: action.data.id, isActive: currentProfile == -1 }];
      return state.set('isLoading', false)
                  .set('isLoadingDialog', false)
                  .set('newProfileErrors', dealPageInitialState.toJS().newProfileErrors)
                  .set('profiles', profiles)
                  .set('currentProfileIndex', currentProfile == -1 ? 0 : findIndex(profiles, (profile) => profile.isActive))
                  .set('currentProfile', currentProfile == -1 ? profiles[0].value : currentProfile);
    }
    case DEAL_PAGE_RECEIVE_SAVED_NEW_PROFILE_ERRORS:
      return state.set('isLoading', false)
                  .set('isLoadingDialog', false)
                  .set('newProfileErrors', action.errors);
    case DEAL_PAGE_ON_PROFILE_SELECTED: {
      const temp = state.get('tempSelectedProfile');
      const currentProfileIndex = findIndex(state.get('profiles'), profile => profile.value == temp);
      return state.set('currentProfile', temp)
                  .set('currentProfileIndex', currentProfileIndex)
                  .set('tempSelectedProfile', -1)
                  .set('showProfileDialog', false);
    }
    case DEAL_PAGE_ON_PROFILE_TEMP_SELECTED: {
      const profiles = state.get('profiles');
      const newProfiles = profiles.map(profile => ({ ...profile, isActive: profile.value == action.tempProfile}));
      return state.set('tempSelectedProfile', action.tempProfile)
                  .set('profiles', newProfiles);
    }
    case DEAL_PAGE_ON_CANCEL_PROFILE_SELECTED: {
      const profiles = state.get('profiles');
      const currentProfile = state.get('currentProfile');
      const newProfiles = profiles.map(profile => ({ ...profile, isActive: profile.value == currentProfile}));
      return state.set('tempSelectedProfile', -1)
                  .set('showProfileDialog', false)
                  .set('profiles', newProfiles);
    }
    case DEAL_PAGE_ON_SWITCH_PROFILE:
      const currentProfileIndex = state.get('currentProfileIndex');
      const profiles = state.get('profiles');
      const nextIndex = currentProfileIndex + 1 >= profiles.length ? 0 : currentProfileIndex + 1;
      const newProfiles = profiles.map((profile, index) => ({ ...profile, isActive: index == nextIndex }));
      return state.set('currentProfileIndex', nextIndex)
                  .set('profiles', newProfiles);
    default:
      return state;
  }
}

export default dealPageReducer;