import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Select from 'react-select';

import LoaderImage from '../../components/LoaderImage';
import InvoiceList from '../../components/InvoiceList';

import {
  fetchUserInvoiceProductAction,
  onSelectFilteredProfile
} from './actions';


const InvoiceSellerPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  align-items: center;
  & > div:first-child {
    margin-top: 1px;
    position: fixed;
    padding: 1rem;
    width: calc(100% - 2rem);
    max-width: calc(600px - 2rem);
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    z-index: 109;
    background-color: white;
  }

  & > div:last-child {
    margin-top: 3rem;
    display: flex;
  }

  margin-bottom: 70px;
`;

class InvoiceSellerPage extends Component {

  constructor(props) {
    super(props);
    this.handleFilterChange = this.handleFilterChange.bind(this);
  }


  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchUserInvoiceProductAction());
  }

  handleFilterChange(values) {
    const { dispatch } = this.props;
    console.log(values);
    dispatch(onSelectFilteredProfile(values));
  }


  render() {
    const { invoiceSellerPage, dealPage, dispatch } = this.props;
    if(invoiceSellerPage.isLoading) {
      return <LoaderImage />;
    }
    const filteredProfiles = invoiceSellerPage.currentSelectedFilterProfiles.map(profile => profile.value);
    const invoices = invoiceSellerPage.invoiceProductData.filter(invoice => {
      return filteredProfiles.length == 0 ? invoice : filteredProfiles.indexOf(invoice.profile_data.id) != -1;
    }).map(invoice => ({
      ...invoice,
      onViewInvoiceClick: () => { dispatch(push(`/content/invoices/seller/${invoice.id}`))},
      onEditProductClick: () => { dispatch(push(`/content/deal/edit/${invoice.id}`))}
    }))
    return (
      <InvoiceSellerPageWrapper>
        <div>
          <Select options={dealPage.profiles}
            placeholder="Filter by profile"
            onChange={this.handleFilterChange} multi={true}
            value={invoiceSellerPage.currentSelectedFilterProfiles}/>
        </div>
        <InvoiceList invoices={invoices} />
      </InvoiceSellerPageWrapper>
    )
  }
}


const mapStateToProps = (state) => ({
  invoiceSellerPage: state.get('invoiceSellerPage').toJS(),
  global: state.get('global').toJS(),
  dealPage: state.get('dealPage').toJS()
})

const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceSellerPage);