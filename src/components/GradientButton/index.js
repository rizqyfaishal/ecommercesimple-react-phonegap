/**
*
* GradientButton
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Tappable from 'react-tappable';

const GradientButton = styled.button`
	margin: 10px;
	padding: 10px;
	text-align: center;
	transition: 0.5s;
	color: #fff;
	background-size: 200% auto;
	text-shadow: 0px 0px 10px rgba(0,0,0,0.2);
  box-shadow: 0 0 20px #ddd;
  border-radius: 20px;
  background-image: linear-gradient(to right, 
  	${props => props.disabled ? props.disabledColor : props.color1 } 0%, 
    ${props => props.disabled ? props.disabledColor : props.color2 } 51%, 
    ${props => props.disabled ? props.disabledColor : props.color1 } 100%);

  &:active {
  	background-position: right center;
  }

  &:focus {
  	outline: none;
  }

  border: none;
`;

GradientButton.propTypes = {
	color1: PropTypes.string,
	color2: PropTypes.string,
  disabledColor: PropTypes.string,
  disabled: PropTypes.bool,
};

export default GradientButton;