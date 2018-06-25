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
	display: grid;
	grid-template-rows: 70px 1fr 60px;
	grid-template-columns: 1fr;
	grid-template-areas: "navigator-bar"
		"register-form"
		"additional";

	& > div:nth-child(1) {
		grid-area: navigator-bar;
	}

	& > div:nth-child(3) {
		align-items: start;
		justify-self: center;
		& > span {
			width: 100%;
			display: block;
			color: #8fd3f4;
		}
	}
	& > div:nth-child(2) {
		grid-area: register-form;
		padding: 0 1rem;
		display: grid;
		grid-template-rows: repeat(6, 1fr) 0.5fr;
		grid-template-columns: 1fr;
		grid-template-areas: 
			"username-field"
			"email-field"
			"firstname-field"
			"lastname-field"
			"password-field"
			"password-confirm-field"
			"button-field";

		& > div:not(:nth-child(7)) {
			width: 100%;
			justify-items: start;
			align-items: center;
			display: grid;
			grid-template-rows: 1fr 3fr;
			grid-template-areas: "label" "input";

			& > label {
				grid-area: label;
			}

			& > input {
				grid-area: input;
				justify-self: stretch;
			}
		}

		& > div:nth-child(1) {
			grid-area: username-field;
		}

		& > div:nth-child(2) {
			grid-area: email-field;
		}

		& > div:nth-child(3) {
			grid-area: firstname-field;
		}

		& > div:nth-child(4) {
			grid-area: lastname-field;
		}

		& > div:nth-child(5) {
			grid-area: password-field;
		}

		& > div:nth-child(6) {
			grid-area: password-confirm-field;
		}

		& > div:nth-child(7) {
			grid-area: button-field;
			justify-self: stretch;
			display: grid;
			justify-items: stretch;
			& > button {
				display: block;
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