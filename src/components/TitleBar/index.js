import React from 'react';
import styled from 'styled-components';

const TitleBarWrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: 50px;
	border-bottom: 1px solid #ccc;
	color: #000;
	justify-items: center;
	align-items: center;
	text-transform: uppercase;
	position: fixed;
	width: 100%;
	top: 0;
	left: 0;
	z-index: 100;
	background-color: #fff;
`;


const TitleBar = (props) => {
	return (
			<TitleBarWrapper>
				<h4>{props.title}</h4>
			</TitleBarWrapper>
		)
}

export default TitleBar;