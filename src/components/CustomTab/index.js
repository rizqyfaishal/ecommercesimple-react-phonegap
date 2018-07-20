import React from 'react';
import styled from 'styled-components';

const CustomTabWrapper = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  max-width: 600px;
  display: flex;
  justify-content: strecth;
  align-items: center;
  border-bottom: 1px solid #ccc;
  z-index: 209;
  & > div {
    transition: 0.5s ease-in-out border-bottom-color;
    margin-bottom: -1px;
    cursor: pointer;
    border-bottom: 1px solid #ccc;
    &.active {
      cursor: default;
      border-bottom-color: #000;
      & > h4 {
        color: #000;
      }
    }

    & > h4 {
      color: #ccc;
      text-transform: uppercase;
      text-align: center;
      margin: 1rem 0;
    }

    width: ${props => 100.0 / props.menus }%;

  }
  background-color: #fff;
  z-index: 100;
`;

const CustomTab = (props) => {
  return (
      <CustomTabWrapper menus={props.menus.length}>
        {props.menus.map(menu => {
          return (
              <div className={menu.isActive ? 'active' : ''} onClick={menu.onTap} key={menu.content}>
                <h4>{menu.text}</h4>
              </div>
            )
        })}
      </CustomTabWrapper>
    )
}

export default CustomTab;