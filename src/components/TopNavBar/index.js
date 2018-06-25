import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Tappable from 'react-tappable';

const TopNavBarWrapper = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	display: grid;
	grid-template-rows: 1fr 3fr;
	grid-template-columns: 3fr 4fr 3fr;
	justify-items: center;
	align-items: center;
	grid-template-areas:
		"profile-nav logo-screen switch-offer"
		"profile-nav toggle-screen switch-offer";

	& > div:nth-child(1) {
		grid-area: logo-screen;
	}

	& > div:nth-child(2) {
		grid-area: toggle-screen;
		font-size: 1.5rem;
		font-weight: bold;
	}

	& > div:nth-child(3) {
		grid-area: profile-nav;

		& > span {
			display: block;
			& > p {
				font-size: 0.7rem;
				margin: 0;
			}

			& > img {
				display: block;
				margin: 0 auto;
			}
		}
	}

	& > div:nth-child(4) {
		grid-area: switch-offer;

		& > span {
			display: block;
			& > p {
				font-size: 0.7rem;
				margin: 0;
			}

			& > img {
				display: block;
				margin: 0 auto;
			}
		}
	}

	padding-top: 1rem;
	background-color: #F48024;
	color: white;
	border-bottom: 2px solid #ddd;
`;

const TopNavBar = (props) => {
	return (
			<TopNavBarWrapper>
				<div>{props.title}</div>
				<div>
					<Tappable onTap={props.onToggleTapped}>
						{props.status}
					</Tappable>
				</div>
				{props.children}
			</TopNavBarWrapper>
		)
}

export default TopNavBar;

