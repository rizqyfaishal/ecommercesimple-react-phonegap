import React from 'react';
import styled from 'styled-components';

import ProfileContent from '../ProfileContent';
import CustomInputText from '../CustomInputText';
import GradientButton from '../GradientButton';
import CustomButton from '../CustomButton';
import FieldErrorMessage from '../FieldErrorMessage';
import ImageUploader from '../ImageUploader';
import CustomTextArea from '../CustomTextArea';

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

      & > div {
        margin-top: 1rem;
      }

      & > textarea {
        margin-top: 0.5rem;
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
  console.log(props);
  return (
    <ProfileSelectorWrapper>
      <div>
          {props.profiles.map((profile, index) => <ProfileContent 
            key={profile.value}
            onProfileTapped={props.onProfileTapped}
            picture={profile.pict}
            isActive={profile.isActive}
            value={profile.value}
            label={profile.label}
            index={index}
            name={props.name} />)}
      </div>
      <div>
        <div>
          <CustomInputText 
            isError={props.newProfileErrors.profile_name.length > 0}
            placeholder="Create new profile" innerRef={props.createNewProfileRef} />
            {props.newProfileErrors.profile_name.map(error => 
                <FieldErrorMessage className="error-message" key={error}>{error}</FieldErrorMessage>)}
          <CustomTextArea 
            isError={props.newProfileErrors.description.length > 0}
            placeholder="Describe about your new profile" innerRef={props.descriptionFieldRef} />
            {props.newProfileErrors.description.map(error => 
                <FieldErrorMessage className="error-message" key={error}>{error}</FieldErrorMessage>)}
          <ImageUploader 
            currentImage={props.tempImage}
            currentImageURL={props.tempImageUrl}
            onUploadClick={props.onSaveNewProfileClick}
            onRemoveImage={props.onRemoveImage}
            errors={props.imageErrors}
            hideOnShowImage={true}
            isOptional={true}
            buttonText={"Pilih Profile Pict"}
            onChange={props.handleImageChange} />
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