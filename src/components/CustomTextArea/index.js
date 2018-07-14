import React from 'react';
import styled from 'styled-components';

const CustomTextArea = styled.textarea`
	border-radius: 7px;
	border: 1px solid ${props => props.isError ? 'red' : '#ddd'};
	padding: 0.7rem;
	color: #3b3d42;
	background-color: #fff;
	display: block;
	min-height: 6rem;
	font: 400 13.3333px Arial;
`;

export default CustomTextArea;