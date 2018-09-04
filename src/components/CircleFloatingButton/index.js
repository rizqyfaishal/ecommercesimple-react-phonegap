import React from 'react';
import styled from 'styled-components';

import Plus from '../../images/plus.svg';

const CircleFloatingButtonWrapper = styled.button`
  position: fixed;
  z-index: 1000;
  height: 55px;
  width: 55px;
  padding: 0.75rem;
  background-color: #F48024;
  color: white;
  border-radius: 50%;
  box-shadow: 4px 7px 14px #ddd;
  text-shadow: 4px 7px 14px #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 80px;
  right: 10px;

  & > img {
    width: 100%;
    height: 100%;
  }

  outline: none;
  border: none;

  &:active {
    background-color: #dc771f;
  }
`;

const CircleFloatingButton = (props) => (
  <CircleFloatingButtonWrapper onClick={props.onClick}>
    <img src={Plus} alt="plus-icon" />
  </CircleFloatingButtonWrapper>
)

export default CircleFloatingButton;