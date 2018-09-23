import React from 'react';
import styled from 'styled-components';
import GradientButton from '../../components/GradientButton';

import Cart from '../../images/cart_deal.svg';

import { convertToRupiah } from '../../utils';

const DealResultWrapper = styled.div`
  background-color: #f4f4f4;
  border-top: 2px solid #ddd;
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  & > div:nth-child(1) {
    width: 20%;
    margin-top: 1rem;
    justify-content: flex-start;
    position: relative;
    & > span {
      top: -11px;
      left: 3px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-color: #000;
      color: white;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      font-weight: bold;
      position: absolute;
      font-size: 12px;
    }
  }

  & > div:nth-child(2) {
    display: flex;
    width: 80%;
    flex-direction: column;
    justify-content: stretch;
    align-items: stretch;

    & > h3 {
      margin: 0.5rem 1rem;
    }

    & > div {
      display: flex;
      align-items: stretch;
      justify-content: stretch;
      & > button {
        width: 100%;
        margin: 0.5rem;
        display: block;
      }
    }
  }
`;

const DealResult = (props) => {
  console.log(props);
  let total = 0;
  props.items.forEach(item => {
    total += (item.price * item.quantity)
  })
  return (
      <DealResultWrapper cancelButton={props.cancelButton}>
        <div>
          <span>{props.items.length}</span>
          <img src={Cart} alt="cart" width="35" />
        </div>
        <div>
          <h3>Total Rp. { convertToRupiah(total) }</h3>
          <div>
            <GradientButton color1="#f6d365" color2="#fda085" onClick={props.onShareProductClick}>
            {props.buttonTitle}
            </GradientButton>
            { props.cancelButton && 
              <GradientButton color1="#f6d365" color2="#fda085" onClick={props.onCancelButtonClick}>
                {props.cancelButtonTitle}
              </GradientButton>}
          </div>
        </div>
      </DealResultWrapper>
    )
}

export default DealResult;