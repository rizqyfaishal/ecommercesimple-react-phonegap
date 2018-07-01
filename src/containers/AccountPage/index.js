import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import TitleBar from '../../components/TitleBar';

import GradientButton from '../../components/GradientButton';

const AccountPageWrapper = styled.div`
	display: flex;
	flex-direction: column;

	& > div:nth-child(1) {
		height: 50px;
	}

	& > div:nth-child(2) {
		display: flex;
		flex-direction: column;
		padding: 0 1rem;
		justify-content: stretch;

		& > div:not(:last-child) {
			padding: 0.5rem 0;
			display: flex;
			flex-direction: column;
			align-items: stretch;
			justify-content: stretch;

			& > div:nth-child(1) {
				height: 50px;
			}

			& > div:not(:first-child) {
				display: flex;
				flex-direction: row;
				justify-content: start;
				align-items: center;

				& > div:first-child {
					width: 70%;
				}
				& > div:last-child {
					width: 30%;
				}
			}


			& h5, & h4 {
				margin: 0.2rem 0;
			}

			& a {
				text-decoration: none;
				display: block;
				text-align: right;
			}

			border-bottom: 1px solid #ccc;

		}	


		& > div:last-child {
			margin-top: 2rem;
			display: flex;
			justify-content: stretch;
			align-items: center;
			& > button {
				width: 100%;
				margin: 0;
				display: block;
			}

		}
	}
`;

class AccountPage extends Component {

	constructor(props) {
		super(props);

	}

	render() {
		const account = {
			firstName: 'Rizqy',
			lastName: 'Faishal',
			username: 'rizqyfaishal',
			email: 'rizqyfaishal27@gmail.com',
			address: "Jalan Raya Solo - Madiun KM. 57",
			paymentMethod: "Transfer BNI 12121131"
		}
		return (
				<AccountPageWrapper>
					<div>
						<TitleBar title="Profile" />
					</div>
					<div>
						<div>
							<div>
								<h3>ACCOUNT INFO</h3>
							</div>
							<div>
								<div>
									<h4>{account.firstName} {account.lastName}</h4>
									<h5>username: {account.username}</h5>
									<h5>email : {account.email}</h5>
								</div>
								<div>
									<a href="#">EDIT</a>
								</div>
							</div>
						</div>
						<div>
							<div>
								<h3>ADDRESS</h3>
							</div>
							<div>
								<div>
									<h5>{account.address}</h5>
								</div>
								<div>
									<a href="#">EDIT</a>
								</div>
							</div>
						</div>
						<div>
							<div>
								<h3>PAYMENT METHOD</h3>
							</div>
							<div>
								<div>
									<h5>{account.paymentMethod}</h5>
								</div>
								<div>
									<a href="#">EDIT</a>
								</div>
							</div>
						</div>
						<div>
							<GradientButton color1="#f6d365" color2="red">
								Logout
							</GradientButton>
						</div>
					</div>
				</AccountPageWrapper>
			)
	}
}


const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({
	dispatch: dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(AccountPage);