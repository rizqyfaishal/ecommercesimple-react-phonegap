import React from 'react';
import styled from 'styled-components';

const TitleBarWrapper = styled.div`
	display: flex;
	height: 50px;
	border-bottom: 1px solid #ccc;
	color: #000;
	justify-content: center;
	align-items: center;
	text-transform: uppercase;
	position: fixed;
	width: 100%;
	max-width: 600px;
	top: 0;
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