import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import TitleBar from '../../components/TitleBar';

import GradientButton from '../../components/GradientButton';

const AccountPageWrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: 52px 1fr;
	grid-template-areas: "title-bar" "account-content";

	& > div:nth-child(1) {
		grid-area: title-bar;
	}

	& > div:nth-child(2) {
		grid-area: account-content;
		display: grid;
		padding: 0 1rem;

		grid-template-columns: 1fr;
		grid-auto-flow: row;
		justify-items: stretch;

		& > div:not(:last-child) {
			padding: 0.5rem 0;
			display: grid;
			align-items: center;

			grid-template-columns: 3fr 1fr;
			grid-template-rows: 60px 1fr;
			grid-template-areas: "subtitle subtitle" "info button";

			& > div:nth-child(1) {
				grid-area: subtitle;
			}

			& > div:last-child {
				justify-self: end;
			}
			grid-auto-flow: row;

			& h5, & h4 {
				margin: 0.2rem 0;
			}

			& a {
				text-decoration: none;
			}

			border-bottom: 1px solid #ccc;

		}	


		& > div:last-child {
			margin-top: 2rem;
			justify-self: stretch;
			align-self: center;
			display: grid;
			justify-items: stretch;
			align-items: center;
			& > button {
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
					<TitleBar title="Profile" />
					<div>
						<div>
							<div>
								<h3>ACCOUNT INFO</h3>
							</div>
							<div>
								<h4>{account.firstName} {account.lastName}</h4>
								<h5>username: {account.username}</h5>
								<h5>email : {account.email}</h5>
							</div>
							<div>
								<a href="#">EDIT</a>
							</div>
						</div>
						<div>
							<div>
								<h3>ADDRESS</h3>
							</div>
							<div>
								<h5>{account.address}</h5>
							</div>
							<div>
								<a href="#">EDIT</a>
							</div>
						</div>
						<div>
							<div>
								<h3>PAYMENT METHOD</h3>
							</div>
							<div>
								<h5>{account.paymentMethod}</h5>
							</div>
							<div>
								<a href="#">EDIT</a>
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