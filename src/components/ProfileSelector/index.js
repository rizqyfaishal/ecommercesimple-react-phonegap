import React from 'react';
import styled from 'styled-components';

import ProfileContent from '../ProfileContent';
import CustomInputText from '../CustomInputText';
import GradientButton from '../GradientButton';
import CustomButton from '../CustomButton';
import FieldErrorMessage from '../FieldErrorMessage';

const ProfileSelectorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  align-items: stretch;
  & > div:first-child {
    max-height: 300px;
    overflow-y: scroll;
  }

  & > div:last-child {

    padding: 0.5rem 0;
    display: flex;
    flex-direction: row;
    justify-content: stretch;
    align-items: center;

    & > div:first-child {
      width: 70%;
      display: flex;
      flex-direction: column;
      justify-content: stretch;
      & > p {
        font-size: 80%;
        margin: 0.2rem 0 0 0.4rem;
        text-align: left;
      }
    }
    & > div:last-child {
      padding-left: 0.5rem; 
      width: 30%;
      display: flex;
      flex-direction: column;
      justify-content: stretch;
    }
  }
`;

const ProfileSelector = (props) => {
  return (
    <ProfileSelectorWrapper>
      <div>
          {props.profiles.map(profile => <ProfileContent 
            key={profile.value}
            onProfileTapped={props.onProfileTapped}
            isActive={profile.isActive}
            value={profile.value}
            label={profile.label}
            name={props.name} />)}
      </div>
    <div>
      <div>
        <CustomInputText 
          isError={props.newProfileErrors.profile_name.length > 0}
          placeholder="Create new profile" innerRef={props.createNewProfileRef} />
          {props.newProfileErrors.profile_name.map(error => 
              <FieldErrorMessage className="error-message" key={error}>{error}</FieldErrorMessage>)}
      </div>
      <div>
        <CustomButton color="white" bg="#F48024" 
          disabled={props.isSaving}
          onClick={props.onSaveNewProfileClick}>
          { props.isSaving ? 'Saving' : 'Save'}
        </CustomButton>
      </div>
    </div>
  </ProfileSelectorWrapper>)
}

export default ProfileSelector;