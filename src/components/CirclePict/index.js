import React from 'react';
import styled from 'styled-components';

const CirclePict = styled.div`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border-radius: 50%;
  background: url(${ props => props.backgroundPict }) center;
  background-size: ${props => props.size}px ${props => props.size}px;
`;

export default CirclePict;