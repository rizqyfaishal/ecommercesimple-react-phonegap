import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import swal from 'sweetalert';


import CustomButton from '../../components/CustomButton';
import GradientButton from '../../components/GradientButton';

const MyDealPageWrapper = styled.div`
	margin: 0 -1rem;
	display: grid;
	grid-template-rows: 132px 1fr 125px;
	grid-template-columns: 1fr;
	grid-template-areas: "deal-name" "deal-details" "additional";
	& > div:nth-child(2) {
		display: grid;
		grid-area: deal-details;
		grid-template-rows: 45px 1fr 16px;
		grid-template-columns: 1fr;
		grid-template-areas: "headers"
			"details"
			"total";

		& > div:nth-child(1) {
			grid-area: headers;
			border-bottom: 1px solid #ddd;
			display: grid;
			grid-template-columns: 3fr 2.5fr;
			grid-template-rows: 1fr;
			padding: 0 1rem;
			grid-template-areas: "item-header amount-header";
			& > div:nth-child(1) {
				justify-self: start;
				align-self: center;

			}

			& > div:nth-child(2) {
				justify-self: end;
				align-self: center;
			}
		}

		& > div:nth-child(3) {
			grid-area: total;
			border-top: 1px solid #ddd;
			display: grid;
			grid-template-columns: 3fr 2.5fr;
			align-items: center;
			justify-items: end;

			padding: 0 1rem;

			& > div {
				padding: 0 0.5rem;
			}
		}

		& > div:nth-child(2) {
			padding: 0 1rem;
			display: grid;
			align-items: center;
			& > div {
				display: grid;
				grid-template-columns: 3fr 2.5fr;
				margin: 0.5rem 0;
				& > div > h4, & > div > h6 {
					margin: 0.2rem 0;
				} 

				& > div > h6 {
					font-weight: normal;
				}
				& > div:nth-child(2) {
					justify-self: end;
					align-self: center;
				}
			}
		}
	}
	& > div:nth-child(1) {
		padding: 0 1rem;
		grid-area: deal-name;
		display: grid;
		grid-template-columns: 3fr 2.5fr;
		grid-template-rows: 1fr 1fr;
		border-bottom: 1px solid #ddd;
		grid-template-areas: "deal-name-name deal-name-nego"
			"deal-name-price deal-name-cancel";

		& > div:nth-child(1) {
			grid-area: deal-name-name;
			align-self: start;
			& > h2 {
				margin: 10px 0;
			}

			& > h5 {
				margin: 0;
			}
		}

		& > div:nth-child(2) {
			grid-area: deal-name-price;
			align-self: center;
			& > h2 {
				margin: 10px 0;
			}
		}

		& > div:nth-child(3) {
			justify-self: end;
			align-self: start;
			grid-area: deal-name-nego;
			& > h5 {
				display: block;
				margin: 10px auto;
				text-align: right;
				font-size: 70%;
			}
		}

		& > div:nth-child(4) {
			position: relative;	
			justify-self: end;
			align-self: center;
			grid-area: deal-name-cancel;

			& > button {
				font-size: 120%;
				margin-right: 0;
			}
		}
	}

	& > div:nth-child(3) {
		grid-area: additional;
		display: grid;
		justify-items: center;
		align-items: center;
		grid-template-columns: 1fr 1fr;
	}


`;

const product = {
	productName: 'Hahaha',
	user: 'Septialoka',
	items: [
		{
			itemName: 'Item 1',
			orderNo: 1,
			quantity: 1,
			price: 200
		},
		{
			itemName: 'Item 2',
			orderNo: 2,
			quantity: 2,
			price: 300
		}
	]
}

class MyDealPage extends Component {

	constructor(props) {
		super(props);

		this.onDealTapped = this.onDealTapped.bind(this);
		this.onCancelTapped = this.onCancelTapped.bind(this);
		this.onNegoTapped = this.onNegoTapped.bind(this);

	}

	onDealTapped() {
		swal("Are you sure for deal?", {
		  buttons: {
		    cancel: true,
		    confirm: true
		  },
		})
		.then((value) => {
		  switch (value) {
		    default:
		      swal("Got away safely!");
		  }
		});
	}

	onCancelTapped() {
		swal("Are you sure for cancel?", {
		  buttons: {
		    cancel: true,
		    confirm: true
		  },
		})
		.then((value) => {
		  switch (value) {
		    default:
		      swal("Got away safely!");
		  }
		});
	}

	onNegoTapped() {
		swal("Are you sure for send nego?", {
		  buttons: {
		    cancel: true,
		    confirm: true
		  },
		})
		.then((value) => {
		  switch (value) {
		    default:
		      swal("Got away safely!");
		  }
		});
	}

	render() {
		let total = 0;

		return (
				<MyDealPageWrapper>
					<div>
						<div>
							<h2>{product.user}</h2>
							<h5>{product.productName}</h5>
						</div>
						<div>
							<h2>Rp. 100000000</h2>
						</div>
						<div>
							<h5>Date: 11/19/2017</h5>
							<h5>Expiration: 11/29/2017</h5>
						</div>
						<div>
							<GradientButton color1="#f6d365" color2="#fda085" onClick={this.onDealTapped}>
								Ok! Deal
							</GradientButton>
						</div>
					</div>
					<div>
						<div>
							<div>
								<h5>Items</h5>
							</div>
							<div>
								<h5>Amounts</h5>
							</div>
						</div>
						<div>
							{product.items.map(item => {
								return (
										<div>
											<div>
												<h4>{item.itemName}</h4>
												<h6>{item.quantity} x @{item.price}</h6>
											</div>
											<div><h4>Rp. {item.price * item.quantity}</h4></div>
										</div>
									)
							})}
						</div>
						<div>
							<div>
								<h4>Total</h4>
							</div>
							<div>
								<h4>Rp. 8.800.000,00</h4>
							</div>
						</div>
					</div>
					<div>
						<div>
							<CustomButton color="white" bg="#5bc0de" onClick={this.onNegoTapped}>Nego</CustomButton>
						</div>
						<div>
							<CustomButton color="white" bg="#d9534f" onClick={this.onCancelTapped}>Batal</CustomButton>
						</div>
					</div>
				</MyDealPageWrapper>
			)
	}
}


const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({
	dispatch: dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(MyDealPage);