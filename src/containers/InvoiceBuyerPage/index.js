import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import LoaderImage from '../../components/LoaderImage';
import InvoiceBuyerList from '../../components/InvoiceBuyerList';
import TitleBar from '../../components/TitleBar';

import {
  fetchUserAcceptedProductsAction
} from './actions';

const InvoiceBuyerPageWrapper = styled.div`
  margin-bottom: 70px;
`;

class InvoiceBuyerPage extends Component {

  constructor(props) {
    super(props);

  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchUserAcceptedProductsAction());
  }

  render() {
    const { invoiceBuyerPage, global, dispatch } = this.props;
    if(invoiceBuyerPage.isLoading) {
      return <LoaderImage />;
    }
    return <InvoiceBuyerPageWrapper>
      <InvoiceBuyerList invoices={invoiceBuyerPage.userAcceptedProducts.map(
        invoice => ({ ...invoice, onViewInvoiceClick: () => { dispatch(push(`/content/invoices/buyer/${invoice.product}`))}}))}/>
    </InvoiceBuyerPageWrapper>
  }
}


const mapStateToProps = (state) => ({
  global: state.get('global').toJS(),
  invoiceBuyerPage: state.get('invoiceBuyerPage').toJS()
})

const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceBuyerPage);