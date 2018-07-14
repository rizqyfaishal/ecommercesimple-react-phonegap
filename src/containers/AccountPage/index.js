import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { isUndefined, isNull } from 'lodash';


import TitleBar from '../../components/TitleBar';

import GradientButton from '../../components/GradientButton';

import { onLogoutTapped } from '../../actions';

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
		this.onLogout = this.onLogout.bind(this);
	}

	componentWillMount() {
		const { dispatch, global } = this.props;
		console.log(global);
		if(global.isLoggedIn) {
			if(!isNull(global.userData) && isUndefined(global.userData.additional_information)) {
				dispatch(push('/content/fill-additional-information'));
			}
		} else {
			dispatch(push('/login'));
		}
		
	}

	onLogout() {
		const { dispatch } = this.props;
		dispatch(onLogoutTapped());
	}

	render() {
		const account = this.props.global.userData;
		if(isNull(account) || isUndefined(account.additional_information)) {
			return null;
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
									<h4>{account.data.first_name} {account.data.last_name}</h4>
									<h5>username: {account.data.username}</h5>
									<h5>email : {account.data.email}</h5>
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
									<h5>{account.additional_information.address}</h5>
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
									<h5>{account.additional_information.payment_method}</h5>
								</div>
								<div>
									<a href="#">EDIT</a>
								</div>
							</div>
						</div>
						<div>
							<GradientButton color1="#f6d365" color2="red" onClick={this.onLogout}>
								Logout
							</GradientButton>
						</div>
					</div>
				</AccountPageWrapper>	
			)
	}
}


const mapStateToProps = (state) => ({
	global: state.get('global').toJS()
})

const mapDispatchToProps = (dispatch) => ({
	dispatch: dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(AccountPage);