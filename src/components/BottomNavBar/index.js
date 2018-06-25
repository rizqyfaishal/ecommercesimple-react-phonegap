import React from 'react';
import styled from 'styled-components';
import Tappable from 'react-tappable';
import PropTypes from 'prop-types';

const BottomNavBarWrapper = styled.div`
	display: grid;
	grid-template-rows: 60px;
	grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
	padding: 0.5rem 0;
	border-top: 1px solid #ddd;
	justify-items: center;
	align-items: center;
	width: 100%;
	background-color: white;
	& > div {
		& > span {
			display: grid;
			justify-items: center;
			font-size: 0.7rem;
			grid-template-columns: 1fr;
			grid-template-rows: 35px 2fr;

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
					if(menu.isActive) {
						return (
								<div key={menu.type}>
									<Tappable onTap={menu.onTap}>
										<img src={menu.activeIcon} alt="bottom-navbar-icon" width="30"/>
										<p>{menu.menuText}</p>
									</Tappable>
								</div>
							) 
					}
					return (
							<div key={menu.type}>
								<Tappable onTap={menu.onTap}>
									<img src={menu.icon} alt="bottom-navbar-icon" width="30"/>
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