import React from 'react';
import styled from 'styled-components';

import ProfileContent from '../ProfileContent';
import CustomInputText from '../CustomInputText';
import GradientButton from '../GradientButton';
import CustomButton from '../CustomButton';

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
	}
`;

const ProfileSelector = (props) => {
	return (<ProfileSelectorWrapper>
		{props.profiles.map(profile => <ProfileContent key={props.value}
			onProfileTapped={props.onProfileTapped}
			value={profile.value}
			label={profile.label}
			name={props.name} />)}
		<div>
			<div>
				<CustomInputText placeholder="Create new profile" />
			</div>
			<div>
				<CustomButton color="white" bg="#F48024">Save</CustomButton>
			</div>
		</div>
	</ProfileSelectorWrapper>)
}

export default ProfileSelector;