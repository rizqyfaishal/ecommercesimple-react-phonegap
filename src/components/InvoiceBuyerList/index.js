import React from 'react';
import styled from 'styled-components';

import InvoiceBuyerItem from '../InvoiceBuyerItem';

const InvoiceBuyerListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  align-items: center;
  width: 100%;
`;

const InvoiceBuyerList = (props) => {
  return <InvoiceBuyerListWrapper>
    { 
      props.invoices.map(invoice => 
        <InvoiceBuyerItem key={invoice.product} invoice={invoice} />
      )
    }
    { props.invoices.length == 0 &&
      <div>
        <h4>No available transaction.</h4>
      </div>
    }
  </InvoiceBuyerListWrapper>
}

export default InvoiceBuyerList;