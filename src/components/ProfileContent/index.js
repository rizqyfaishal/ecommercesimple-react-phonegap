import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Tappable from 'react-tappable';

const ProfileContentWrapper = styled(Tappable)`
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	min-height: 25px;
	padding: 0.5rem 0;
	&:not(:last-child) {
		border-bottom: 1px solid #E9EEF1;
	}
	& > div:nth-child(1) {
		width: 30px;
		display: flex;
		flex-direction: column;
		justify-content: stretch;
	}

	& > label {
		width: calc(100% - 30px);
		display: flex;
		justify-content: flex-start;
		align-items: center;
		& > p {
			width: 70%;
			margin: 0;
			text-align: left;
		}
		& > img {
			max-height: 70px;
			justify-self: flex-end;
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
				<label htmlFor={`radio${props.value}`}>
					<p>{props.label}</p>
					<img htmlFor={`radio${props.value}`} src={props.picture} alt="profile-picture-for"/>
				</label>
				
			</ProfileContentWrapper>
		)
}

export default ProfileContent;