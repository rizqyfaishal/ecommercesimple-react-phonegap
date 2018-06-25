import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import swal from 'sweetalert';

const InvoiceSellerPageWrapper = styled.div`

`;

class InvoiceSellerPage extends Component {

	constructor(props) {
		super(props);

	}


	render() {
		return <h1>InvoiceSellerPage</h1>;
	}
}


const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({
	dispatch: dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceSellerPage);