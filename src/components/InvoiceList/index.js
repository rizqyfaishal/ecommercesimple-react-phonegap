import React from 'react';
import styled from 'styled-components';

import InvoiceItem from '../InvoiceItem';

const InvoiceListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  align-items: center;
  width: 100%;
`;

const InvoiceList = (props) => (
  <InvoiceListWrapper>
    {props.invoices.length > 0 && 
      props.invoices.map(invoice => 
        <InvoiceItem key={invoice.id} invoice={invoice} />
      )
    }
    { props.invoices.length == 0 &&
      <div>
        <h4>No available transaction.</h4>
      </div>
    }
  </InvoiceListWrapper>
)

export default InvoiceList;