import React from 'react';
import styled from 'styled-components';

const CustomLabel = styled.label`
	font-size: 0.8rem;
	color: ${props => props.isError ? 'red' : '#888'};
`;

export default CustomLabel;