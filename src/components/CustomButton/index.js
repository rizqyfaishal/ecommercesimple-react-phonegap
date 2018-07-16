import React from 'react';
import styled from 'styled-components';
import Tappable from 'react-tappable';

const CustomButton = styled.button`
	border-radius: 36px;
	background-color: ${props => props.disabled ? '#ddd' : props.bg};
	color: ${props => props.color};
	padding: 0.5rem 1rem;
	outline: none;
	-webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  border: none;

  &:active {
  	background-color: #bc7921;
  }
`;

export default CustomButton;