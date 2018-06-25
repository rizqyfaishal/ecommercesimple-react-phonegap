import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Tappable from 'react-tappable';

const ProfileContentWrapper = styled(Tappable)`
	display: grid;
	grid-template-columns: 1fr 5fr;
	grid-template-rows: 1fr;
	grid-template-areas: "value label";
	justify-items: stretch;
	align-items: center;
	padding: 0.5rem 0;
	&:not(:last-child) {
		border-bottom: 1px solid #E9EEF1;
	}
	& > div:nth-child(1) {
		grid-area: value;
	}

	& > label {
		grid-area: label;
		justify-self: start;
		& > p {
			margin: 0;
		}
	}
`;


const ProfileContent = (props) => {
	return (
			<ProfileContentWrapper onTap={props.onProfileTapped}>
				<div>
					 <input type="radio" name={props.name} value={props.value} checked={props.isActive} id={`radio${props.value}`}/>
				</div>
				<label htmlFor={`radio${props.value}`}>{props.label}</label>
			</ProfileContentWrapper>
		)
}

ProfileContent.propTypes = {
	name: PropTypes.string,
	value: PropTypes.value,
	label: PropTypes.label
}

export default ProfileContent;