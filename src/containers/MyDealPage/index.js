import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import swal from 'sweetalert';


import CustomButton from '../../components/CustomButton';
import GradientButton from '../../components/GradientButton';

const MyDealPageWrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;

	& > div:nth-child(2) {
		display: flex;
		flex-direction: column;

		& > div:nth-child(1) {
			display: flex;
			border-bottom: 1px solid #ddd;
			padding: 0 1rem;
			justify-content: flex-start;
			align-items: center;

			& > div:nth-child(1) {
				width: 60%;
				& > h5 {
					margin: 1rem 0 0.5rem 0;
				}
			}

			& > div:nth-child(2) {
				width: 40%;
				justify-self: flex-end;
				& > h5 {
					text-align: right;
					margin: 1rem 0 0.5rem 0;
				}
			}
		}

		& > div:nth-child(3) {
			border-top: 1px solid #ddd;
			display: flex;
			justify-content: flex-end;
			align-items: center;
			padding: 0 1rem;

			& > div {
				padding-left: 0.5rem;
			}
		}

		& > div:nth-child(2) {
			padding: 0 1rem;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			& > div {
				width: 100%;
				display: flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;
				margin: 0.5rem 0;
				& > div > h4, & > div > h6 {
					margin: 0.2rem 0;
				} 

				& > div > h6 {
					font-weight: normal;
				}

				& > div:nth-child(1) {
					width: 60%;
				}
				& > div:nth-child(2) {
					width: 40%;
					& > h4 {
						text-align: right;
					}
				}
			}
		}
	}

	& > div:nth-child(1) {
		margin-top: 10px;
		padding: 0 1rem;
		display: flex;
		flex-direction: row;
		border-bottom: 1px solid #ddd;
		& > div:nth-child(1) {
			width: 50%;
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			& > div:nth-child(1) {
				& > h2 {
					margin-top: 0;
					margin-bottom: 10px;
				}

				& > h5 {
					margin: 0;
				}
			}

			& > div:nth-child(2) {
				& > h3 {
					font-size: 120%;
				}	
			}
		}

		& > div:nth-child(2) {
			width: 50%;
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			align-items: flex-end;

			& > div:nth-child(1) {
				& > h5 {
					margin-top: 0;
					margin-bottom: 10px;
					text-align: right;
				}
			}

			& > div:nth-child(2) {
				& > button {
					margin: 1rem 0;
				}
			}
		}

	}

	& > div:nth-child(3) {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
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
							<div>
								<h2>{product.user}</h2>
								<h5>{product.productName}</h5>
							</div>
							<div>
								<h3>Rp. 100000000</h3>
							</div>
						</div>
						<div>
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