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

import {
	onLoginTap
} from './actions';

const LoginPageContainer = styled.div`
	display: flex;
	flex-direction: column;
	padding: 1rem;
	& > div:nth-child(1) {
		height: 50px;
	}

	& > div.login-form {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: stretch;

		& > div {
			margin: 0.5rem 0;
		}

		& > div:nth-child(3) {
			& > button {
				width: 100%;
				display: block;
				margin: 0;
			}
		}

		& > div:nth-child(4) {
			display: flex;
			flex-direction: row;
			justify-content: stretch;
			align-items: center;
			width: 100%;

			& > div:nth-child(1) {
				width: 50%;
				& > span {
					display: block;
					color: #8fd3f4;
				}
			}

			& > div:nth-child(2) {
				width: 50%;
				justify-self: end;
				& > span {
					text-align: right;	
					display: block;
					color: red;
				}
			}

		}

		& > div.username-field, & > div.password-field {
			display: flex;
			flex-direction: column;
			width: 100%;
			justify-items: center;
			align-items: stretch;
		
		}

	}
`

class LoginPage extends Component {

	constructor(props) {
		super(props);
		this.onBackTapped = this.onBackTapped.bind(this);
		this.onRegisterHereTapped = this.onRegisterHereTapped.bind(this);
		this.onForgotPasswordTapped = this.onForgotPasswordTapped.bind(this);
		this.onLoginTapped = this.onLoginTapped.bind(this);
	}

	onLoginTapped() {
		const { dispatch } = this.props;
		const username = this.usernameField.value;
		const password = this.passwordField.value;

		dispatch(onLoginTap(username, password));
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
							<CustomInputText placeholder="Username" 
								innerRef={username => { this.usernameField = username; }}/>
						</div>
						<div className="password-field">
							<CustomLabel>Password</CustomLabel>
							<CustomInputText placeholder="Password" type="password" 
								innerRef={password => { this.passwordField = password; }}/>
						</div>
						<div>
							<GradientButton color1="#84fab0" color2="#8fd3f4" onClick={this.onLoginTapped}>
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