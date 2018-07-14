import React from 'react';
import styled from 'styled-components';

import ProfileContent from '../ProfileContent';
import CustomInputText from '../CustomInputText';
import GradientButton from '../GradientButton';
import CustomButton from '../CustomButton';
import FieldErrorMessage from '../FieldErrorMessage';

const ProfileSelectorWrapper = styled.div`
	display: grid;
	grid-flow: auto;
	max-height: 300px;
	overflow-y: scroll;
	& > div:last-child {
		padding: 0.5rem 0;
		display: grid;
		grid-template-rows: 1fr;
		grid-template-columns: 6fr 2fr;
		justify-items: stretch;
		align-items: center;

		& > div:first-child {
			& > p {
				font-size: 80%;
				margin: 0.2rem 0 0 0.4rem;
				text-align: left;
			}
		}
	}
`;

const ProfileSelector = (props) => {
	console.log(props);	
	return (<ProfileSelectorWrapper>
		{props.profiles.map(profile => <ProfileContent 
			key={profile.value}
			onProfileTapped={props.onProfileTapped}
			value={profile.value}
			label={profile.label}
			name={props.name} />)}
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
					{ props.isSaving ? 'Saving profile' : 'Save'}
				</CustomButton>
			</div>
		</div>
	</ProfileSelectorWrapper>)
}

export default ProfileSelector;