import React from 'react';
import styled from 'styled-components';

const CustomInputText = styled.input`
	border-radius: 7px;
	border: 1px solid #ddd;
	padding: 0.7rem;
	color: #3b3d42;
	background-color: #fff;
	&:focus {
		outline: none;
		border-color: #8fd3f4;
	}
`;

export default CustomInputText;