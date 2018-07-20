import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

import { convertToRupiah } from '../../utils';

import CustomButton from '../CustomButton';
const invoiceStatus = [
  'Dikirim',
  'Nego Ulang',
  'Dibatalkan',
  'Diterima'
];

const InvoiceItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: stretch;
  align-items: center;
  width: 100%;
  & > div:nth-child(1) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 1rem;
    width: 50%;
    & > p {
      margin: 0.5rem 0 0 0;
      font-weight: bold;
      color: #9e9696;
    }

    & > h4 {
      margin: 0.25rem 0;
    }

    & > span {
      display: inline;
      background-color: #F48024;
      color: white;
      border-radius: 2px;
      font-size: 80%;
      padding: 2px 5px;
    }

    & > h6 {
      margin: 0.2rem 0;
      color: #9e9696;
    }
  }

  & > div:nth-child(2) {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    padding: 0 1rem;
    & > span {
      display: inline;
      background-color: #F48024;
      color: white;
      border-radius: 2px;
      font-size: 80%;
      padding: 2px 5px;
    }

    & > h3 {
      margin: 0.5rem 0;
    }

    & > button {
      margin: 0.5rem 0;
      font-size: 70%;
    }
  }

  &:not(:last-child) {
    border-bottom: 1px solid #ddd;
  }
`;

const InvoiceItem = (props) => {
  return <InvoiceItemWrapper>
    <div>
      <p>{props.invoice.user_target_data.first_name} {props.invoice.user_target_data.last_name}</p>
      <h4>{props.invoice. product_name}</h4>
      <span>{props.invoice.profile_data.profile_name}</span>
      <h6>{moment(props.invoice.updated_at).fromNow() }</h6>
    </div>
    <div>
      <h3>Rp. {convertToRupiah(props.invoice.total)},00</h3>
      <span>{invoiceStatus[props.invoice.status - 1]}</span>
      { props.invoice.status == 2 &&
        <CustomButton color="#fff" bg="#3e549a" onClick={props.invoice.onEditProductClick}>Edit product</CustomButton>
      }
      { props.invoice.status == 4 &&
        <CustomButton color="#fff" bg="#3e549a" onClick={props.invoice.onViewInvoiceClick}>Lihat invoice</CustomButton>
      } 
    </div>
  </InvoiceItemWrapper>;
}

export default InvoiceItem;