import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Tappable from 'react-tappable';

import Next from '../../images/next.svg';
import Users from '../../images/users.svg';


const TopNavBarWrapper = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  max-width: 600px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 0 0.5rem 0;;

  & > div:nth-child(2) {
    display: flex;
    flex-direction: column;
    width: 30%;
    align-items: space-around;
    & > div:nth-child(1) {
      display: flex;
      justify-content: center;
    }

    & > div:nth-child(2) {
      display: flex;
      justify-content: center;  
      font-size: 1.5rem;
      font-weight: bold;
      padding: 0.5rem 0;
    }
  }

  & > div:nth-child(1) {
    width: 35%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    & > span {
      display: block;
      & > p {
        font-size: 0.7rem;
        margin: 0;
        text-align: center;
      }

      & > img {
        display: block;
        margin: 0 auto;
      }
    }
  }

  & > div:nth-child(3) {
    width: 35%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    & > span {
      display: block;
      & > p {
        font-size: 0.7rem;
        margin: 0 0 1rem 0;
      }

      & > img {
        display: block;
        margin: 0 auto;
      }
    }
  }

  background-color: #F48024;
  color: white;
  border-bottom: 2px solid #ddd;
`;

const TopNavBar = (props) => {
  return (
      <TopNavBarWrapper>
        <div>
          <Tappable onTap={props.onLeftTapped}>
            <img src={Users} alt="next-button" width="30" />
            <p>Current profile</p>
            <p>({props.currentProfileText})</p>
          </Tappable>
        </div>
        <div>
          <div>{props.title}</div>
          <div>
            <Tappable onTap={props.onToggleTapped}>
              {props.status}
            </Tappable>
          </div>
        </div>  
        <div>
          <Tappable onTap={props.onRightTapped}>
            <img src={Next} alt="next-button" width="30" />
            <p>{ props.statusActionText }</p>
          </Tappable>
        </div>
      </TopNavBarWrapper>
    )
}

export default TopNavBar;

