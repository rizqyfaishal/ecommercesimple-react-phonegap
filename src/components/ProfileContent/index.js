import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Tappable from 'react-tappable';

const ProfileContentWrapper = styled(Tappable)`
	display: flex;
	flex-direction: row;
	justify-content: stretch;
	align-items: stretch;
	min-height: 25px;
	padding: 0.5rem 0;
	&:not(:last-child) {
		border-bottom: 1px solid #E9EEF1;
	}
	& > div:nth-child(1) {
		width: 10%;
		display: flex;
		flex-direction: column;
		justify-content: stretch;
	}

	& > label {
		width: 90%;
		display: flex;
		justify-content: flex-start;
		& > p {
			margin: 0;
		}
	}
`;


const ProfileContent = (props) => {
	return (
			<ProfileContentWrapper>
				<div>
					 <input 
					 	type="radio" 
					 	name={props.name} 
					 	value={props.value} 
					 	checked={props.isActive} 
					 	onChange={props.onProfileTapped}
					 	id={`radio${props.value}`}/>
				</div>
				<label htmlFor={`radio${props.value}`}>{props.label}</label>
			</ProfileContentWrapper>
		)
}

export default ProfileContent;