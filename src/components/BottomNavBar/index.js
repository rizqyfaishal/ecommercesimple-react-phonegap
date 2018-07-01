import React from 'react';
import styled from 'styled-components';
import Tappable from 'react-tappable';
import PropTypes from 'prop-types';

const BottomNavBarWrapper = styled.div`
	display: flex;
	flex-direction: row;
	padding: 0.5rem 0;
	border-top: 1px solid #ddd;
	justify-content: stretch;
	align-items: center;
	width: 100%;
	background-color: white;
	& > div {
		width: 20%;
		& > span {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			font-size: 0.7rem;
			& > img {
				display: block;
				margin: 0 auto;
			}
			& > p {
				margin: 0;
			}
		}
	}
`;

const BottomNavBar = (props) => {
	return (
			<BottomNavBarWrapper>
				{props.menus.map(menu => {
					return (
							<div key={menu.type}>
								<Tappable onTap={menu.onTap}>
									<img src={menu.isActive ? menu.activeIcon : menu.icon} alt="bottom-navbar-icon" width="30"/>
									<p>{menu.menuText}</p>
								</Tappable>
							</div>
						)
				})}
			</BottomNavBarWrapper>
		)
}

BottomNavBar.propTypes = {
	menus: PropTypes.array,
}

export default BottomNavBar;