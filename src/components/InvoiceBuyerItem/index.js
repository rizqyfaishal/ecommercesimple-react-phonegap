import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

import { convertToRupiah } from '../../utils';

import CustomButton from '../CustomButton';
export const invoiceStatus = [
  'Belum Dibayar',
  'Sudah mengirim bukti transfer',
  'Sudah Dibayar',
  'Barang telah dikirm',
];

const InvoiceBuyerItemWrapper = styled.div`
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
      font-size: 70%;
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
      font-size: 70%;
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

const InvoiceBuyerItem = (props) => {
  console.log(props);
  return <InvoiceBuyerItemWrapper>
    <div>
      <p>{props.invoice.product_data.user_sender_data.first_name} {props.invoice.product_data.user_sender_data.last_name}</p>
      <h4>{props.invoice.product_data.product_name}</h4>
      <span>{props.invoice.product_data.profile_data.profile_name}</span>
      <h6>{moment(props.invoice.order_date).fromNow() }</h6>
    </div>
    <div>
      <h3>Rp. {convertToRupiah(props.invoice.product_data.total)},00</h3>
      <span>{invoiceStatus[props.invoice.status - 1]}</span>
      <CustomButton color="#fff" bg="#3e549a" onClick={props.invoice.onViewInvoiceClick}>Lihat invoice</CustomButton>
    </div>
  </InvoiceBuyerItemWrapper>;
}

export default InvoiceBuyerItem;