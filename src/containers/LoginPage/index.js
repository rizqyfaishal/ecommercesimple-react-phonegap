import React, { Component } from 'react';
import styled from 'styled-components';
import { goBack, push } from 'react-router-redux';
import { connect } from 'react-redux';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import Tappable from 'react-tappable';
import NavigatorBar from '../../components/NavigatorBar';
import CustomButton from '../../components/CustomButton';
import GradientButton from '../../components/GradientButton';
import CustomInputText from '../../components/CustomInputText';
import CustomLabel from '../../components/CustomLabel';
import CustomNumberInput from '../../components/CustomNumberInput';



const LoginPageContainer = styled.div`
	display: grid;
	grid-template-rows: 60px 1fr;
	grid-template-columns: 1fr;
	grid-template-areas: "navigator-bar"
		"login-form";

	& > div:nth-child(1) {
		grid-area: navigator-bar;

	}


	& > div.login-form {
		justify-items: center;
		align-items: center;
		grid-area: login-form;
		display: grid;
		grid-template-areas: "username-field"
			"password-field"
			"login-button"
			"additional";
		grid-template-columns: 1fr;
		grid-template-rows: 2fr 2fr 2fr 1fr;
		padding: 1rem;
		
		& > div:nth-child(3) {
			justify-self: stretch;
			display: grid;
			justify-items: stretch;
			& > span {
				display: block;
			}
		}

		& > div:nth-child(4) {
			display: grid;
			grid-area: additional;
			grid-template-columns: 1fr 1fr;
			grid-template-rows: 1fr;
			justify-items: stretch;
			width: 100%;

			& > div:nth-child(1) {
				justify-self: start;
				display: grid;
				justify-items: start;
				& > span {
					display: block;
					color: #8fd3f4;
				}
			}

			& > div:nth-child(2) {
				justify-self: end;
				display: grid;
				justify-items: end;
				& > span {
					display: block;
					color: red;
				}
			}

		}
		& > div.username-field, & > div.password-field {
			width: 100%;
			padding: 0 1rem;
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

	}
`

class LoginPage extends Component {

	constructor(props) {
		super(props);
		this.onBackTapped = this.onBackTapped.bind(this);
		this.onRegisterHereTapped = this.onRegisterHereTapped.bind(this);
		this.onForgotPasswordTapped = this.onForgotPasswordTapped.bind(this);
	}

	onBackTapped(event) {
		console.log(this.props);
		const { dispatch } = this.props;
		dispatch(goBack());
	}

	onRegisterHereTapped(event) {
		const { dispatch } = this.props;
		dispatch(push('/register'));
	}

	onForgotPasswordTapped(event) {
		const { dispatch } = this.props;
		dispatch(push('/'));
	}

	render() {
		return (
			<CSSTransitionGroup transitionName="push"
            transitionEnterTimeout={ 300 } transitionLeaveTimeout={ 300 }>
        <LoginPageContainer>
					<div>
						<NavigatorBar title="Login" onBackTapped={this.onBackTapped} />
					</div>
					<div className="login-form">
						<div className="username-field">
							<CustomLabel>Username or email</CustomLabel>
							<CustomInputText placeholder="Username"/>
						</div>
						<div className="password-field">
							<CustomLabel>Password</CustomLabel>
							<CustomInputText placeholder="Password" type="password"/>
						</div>
						<div>
							<GradientButton color1="#84fab0" color2="#8fd3f4">
								Login
							</GradientButton>
						</div>
						<div>
							<div>
								<Tappable onTap={this.onRegisterHereTapped}>Register Here</Tappable>
							</div>
							<div>
								<Tappable onTap={this.onForgotPasswordTapped}>Forgot Password?</Tappable>
							</div>
						</div>
					</div>
					
				</LoginPageContainer>
      </CSSTransitionGroup>);
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);