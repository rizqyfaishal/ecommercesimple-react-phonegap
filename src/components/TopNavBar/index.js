import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Tappable from 'react-tappable';

import {
  TOGGLE_STATUS_BUY,
  TOGGLE_STATUS_SELL
} from '../../containers/DealPage/constants';

import Next from '../../images/next.svg';
import Users from '../../images/users.svg';

import LeftArrow from '../../images/left-arrow.svg';
import RightArrow from '../../images/right-arrow.svg';

const TopNavBarWrapper = styled.div`
  position: fixed;
  top: 0;
  z-index: 900;
  width: 100%;
  max-width: 600px;
  height: 80px;
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
      & > div > p, & > p {
        font-size: 0.7rem;
        text-align: center;
        margin: 0;
        &:first-child {
          margin: 0.2rem;
        }
      }

      & > div.profile-image {
        border-radius: 50%;
        height: 60px;
        width: 60px;
        display: block;
        margin: 0.2rem auto;
        background: url(${props => props.profileImage}) center center;
        background-size: 50px 50px;
      }

      & > p {
        font-size: 0.8rem;
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
        margin: 0;
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
      <TopNavBarWrapper profileImage={props.currentProfileImage}>
        <div>
         {
           !props.leftButtonHide &&
            <Tappable onTap={props.onLeftTapped}>
              <div className="profile-image"></div>
              <p>{ props.currentProfileText }</p>
            </Tappable>
         }
        </div>
        <div>
          <div>{props.title}</div>
          <div>
            <Tappable onTap={props.freezeToggle ? () => {} : props.onToggleTapped}>
              {props.status}
            </Tappable>
          </div>
        </div>  
        <div>
          { !props.rightButtonHide && 
            <Tappable onTap={props.onRightTapped}>
              <img src={props.status == TOGGLE_STATUS_SELL ? Next : RightArrow } alt="next-button" width="50"/>
              <p>{ props.statusActionText }</p>
            </Tappable>
          }
        </div>
      </TopNavBarWrapper>
    )
}

export default TopNavBar;

