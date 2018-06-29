import React from 'react';
import styled from 'styled-components';
import Tappable from 'react-tappable';
import Left from '../../images/left.svg';
import PropTypes from 'prop-types';

const NavigatorBarWrapper = styled.div`
	position: fixed;
	width: 100%;
	top: 0;
	left: 0;
	background-color: white;
	padding: 0 1rem;
	display: flex;
	flex-direction: row;
	justify-content: left;
	align-items: center;
	border-bottom: 1px solid #ddd;
	height: 50px;
	z-index: 100;
	& > div.left-icon {
		grid-area: left-icon;
		align-self: center;
		justify-self: center;
	}

	& > div.title-bar {
		grid-area: title-bar;
		text-transform: uppercase;
		padding-left: 1rem;
	}
`

const NavigatorBar = (props) => {
	return (
			<NavigatorBarWrapper>
				<div className="left-icon">
					<Tappable onTap={props.onBackTapped}>
						<img src={Left} alt="left-icon" width="30" height="30" />
					</Tappable>
				</div>
				<div className="title-bar">
					{props.title}
				</div>
			</NavigatorBarWrapper>
		)
}

NavigatorBar.propTypes = {
	onBackTapped: PropTypes.func
}

export default NavigatorBar;

