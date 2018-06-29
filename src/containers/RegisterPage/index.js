import React, { Component } from 'react';
import styled from 'styled-components';
import { push, goBack } from 'react-router-redux';
import { connect } from 'react-redux';
import Tappable from 'react-tappable';
import NavigatorBar from '../../components/NavigatorBar';
import CustomButton from '../../components/CustomButton';
import GradientButton from '../../components/GradientButton';
import CustomInputText from '../../components/CustomInputText';
import CustomLabel from '../../components/CustomLabel';


const RegisterPageContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 0 1rem;
	& > div:nth-child(1) {
		height: 60px;
	}

	& > div:nth-child(3) {
		display: flex;
		width: 100%;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		& > span {
			width: 100%;
			display: block;
			color: #8fd3f4;
			text-align: center;
		}
	}
	& > div:nth-child(2) {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: stretch;
		width: 100%;
		& > div:not(:nth-child(7)) {
			margin: 0.5rem 0;
			display: flex;
			flex-direction: column;
			width: 100%;

			& > label {
				grid-area: label;
			}

			& > input {
				grid-area: input;
				justify-self: stretch;
			}
		}


		& > div:nth-child(7) {
			justify-self: stretch;
			& > button {
				width: 100%;
				display: block;
				margin: 1rem 0;
			}
		}

	}
`

class RegisterPage extends Component {

	constructor(props) {
		super(props);
		this.onBackTapped = this.onBackTapped.bind(this);
		this.onLoginTapped = this.onLoginTapped.bind(this);
		this.onRegisterTapped = this.onRegisterTapped.bind(this);
	}

	onRegisterTapped(event) {
		const { dispatch } = this.props;
		dispatch(push('/fill-additional-information'));
	}

	onBackTapped(event) {
		const { dispatch } = this.props;
		dispatch(goBack());
	}

	onLoginTapped(event) {
		const { dispatch } = this.props;
		dispatch(push('/login'));
	}

	render() {
		return (<RegisterPageContainer>
			<div>
				<NavigatorBar title="Register" onBackTapped={this.onBackTapped}/>
			</div>
			<div>
				<div>
					<CustomLabel>Username</CustomLabel>
					<CustomInputText placeholder="Username" />
				</div>
				<div>
					<CustomLabel>Email</CustomLabel>
					<CustomInputText placeholder="Email" />
				</div>
				<div>
					<CustomLabel>First Name</CustomLabel>
					<CustomInputText placeholder="First Name" />
				</div>
				<div>
					<CustomLabel>Last Name</CustomLabel>
					<CustomInputText placeholder="Last Name" />
				</div>
				<div>
					<CustomLabel>Password</CustomLabel>
					<CustomInputText placeholder="Password" type="password"/>
				</div>
				<div>
					<CustomLabel>Konfirmasi Password</CustomLabel>
					<CustomInputText placeholder="Konfirmasi Password" type="password" />
				</div>
				<div>
					<GradientButton color1="#84fab0" color2="#8fd3f4" onClick={this.onRegisterTapped}>
						Register
					</GradientButton>
				</div>

			</div>
			<div>
				<Tappable onTap={this.onLoginTapped}>
					Have an account? Login here
				</Tappable>
			</div>
		</RegisterPageContainer>);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		dispatch: dispatch
	};
}

const mapStateToProps = (state) => {
	return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);