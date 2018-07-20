import React from 'react';
import styled from 'styled-components';

import CircleNumber from '../../components/CircleNumber';
import CustomInputText from '../../components/CustomInputText';
import CustomNumberInput from '../../components/CustomNumberInput';
import CustomButton from '../../components/CustomButton';
import FieldErrorMessage from '../../components/FieldErrorMessage';

import { convertToRupiah } from '../../utils';


const ProductItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  & > div:nth-child(1) {
    display: flex;
    align-items: center;

    & > div:nth-child(1) {
      width: 12%;
      display: flex;
      justify-content: flex-start;
    }

    & > div:last-child {
      width: 88%;
      display: flex;
      flex-direction: column;
      justify-content: stretch;

      & > p {
        font-size: 80%;
        margin: 0.2rem 0 0 0.2rem;
      }
    }
    margin-bottom: 1rem;
  }

  & > div:nth-child(2) {
    display: flex;
    justify-content: stretch;
    align-items: center;
    & > div:nth-child(1) {  
      width: 60%;
      display: flex;
      justify-content: stretch;
      flex-direction: column;
      & > p {
        font-size: 80%;
        margin: 0.2rem 0 0 0.2rem;
      }
    }

    & > div:nth-child(2) {
      width: 40%;
      display: flex;
      justify-content: flex-end;
    }
  }

  & > div:nth-child(3) {
    display: flex;
    align-items: center;
    & > div:nth-child(1) {
      width: 70%;
      display: flex;
      justify-content: stretch;
    }

    & > div:nth-child(2) {
      width: 30%;
      display: flex;
      justify-content: flex-end;
    }
  }
  margin-bottom: 1rem;

`;

const ProductItem = (props) => {
  console.log(props.defaultDataValues);
  return (
    <ProductItemWrapper>
      <div>
        <div>
          <CircleNumber>{props.orderNo}</CircleNumber>
        </div>
        <div>
          <CustomInputText placeholder="Nama item"
            defaultValue={props.defaultDataValues.item_name}
            onChange={(e) => { props.resetErrorsFunction(e, props.orderNo - 1, 'item_name')}}
            isError={props.errors.item_name.length > 0} 
            innerRef={props.item.itemNameRef}/>
          {props.errors.item_name.map((error, index) => 
            <FieldErrorMessage key={index}>{error}</FieldErrorMessage>)}
        </div>
      </div>
      <div>
        <div>
          <CustomInputText placeholder="Price" innerRef={props.item.priceRef}
            defaultValue={props.defaultDataValues.price != '' ? parseInt(props.defaultDataValues.price) : ''}
            isError={props.errors.price.length > 0}
            onChange={(e) => { props.onPriceChange(e, props.orderNo-1); }}/>
          {props.errors.price.map((error, index) => 
            <FieldErrorMessage key={index}>{error}</FieldErrorMessage>
          )}
        </div>
        <div>
          <CustomNumberInput number={props.item.quantity}
            onPlusTap={props.onPlusTapItem} 
            onMinusTap={props.onMinusTapItem}/>
        </div>
      </div>
      <div>
        <div>
          <h4>Subtotal : Rp. {convertToRupiah(props.item.price * props.item.quantity)}</h4>
        </div>
        <div>
          { props.isDeleteShow && 
          <CustomButton color="white" bg="red" onClick={props.onDelete}>
            Delete
          </CustomButton>}
        </div>
      </div>
    </ProductItemWrapper>
  )
}

export default ProductItem;