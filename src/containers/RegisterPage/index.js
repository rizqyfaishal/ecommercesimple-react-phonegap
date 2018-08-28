import React, { Component } from 'react';
import styled from 'styled-components';
import { push, goBack } from 'react-router-redux';
import { connect } from 'react-redux';
import Tappable from 'react-tappable';
import { isNull, isEmpty, isUndefined } from 'lodash';


import NavigatorBar from '../../components/NavigatorBar';
import CustomButton from '../../components/CustomButton';
import GradientButton from '../../components/GradientButton';
import CustomInputText from '../../components/CustomInputText';
import CustomLabel from '../../components/CustomLabel';
import FieldErrorMessage from '../../components/FieldErrorMessage';
import LoaderImage from '../../components/LoaderImage';


import { onRegisterTappedAction, setPasswordMatch, clearErrors } from './actions';

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

			& > p {
				margin: 0.5rem 0.2rem;
				font-size: 80%;
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
		this.onPreCheckedPassword = this.onPreCheckedPassword.bind(this);
		this.onPreCheckedPasswordConfirm = this.onPreCheckedPasswordConfirm.bind(this);
		this.onInputChange = this.onInputChange.bind(this);
	}

	onInputChange(event) {
		const key = event.target.name;
		const { registerPage, dispatch } = this.props;
		if(registerPage.errors[key].length > 0) {
			dispatch(clearErrors(key));
		}	
	}

	componentWillMount() {
		const { dispatch, global } = this.props;
		if(global.isLoggedIn) {
			if(isUndefined(global.userData.additional_information)) {
				dispatch(push('/fill-additional-information'));
			} else {
				dispatch(push('/content/deal/make'));
			}
		}
	}

	onRegisterTapped() {
		const { dispatch } = this.props;
		const data = {
			phone_number: this.phoneNumber.value,
			password: this.password.value
		};
		dispatch(onRegisterTappedAction(data));
	}

	onBackTapped(event) {
		const { dispatch } = this.props;
		dispatch(goBack());
	}

	onLoginTapped(event) {
		const { dispatch } = this.props;
		dispatch(push('/login'));
	}

	onPreCheckedPasswordConfirm(event) {
		const value = (event.target.value == this.password.value) && !isEmpty(event.target.value);
		const { registerPage, dispatch } = this.props;
		if(registerPage.passwordMatch != value) {
			dispatch(setPasswordMatch(value));
		}
	}

	onPreCheckedPassword(event) {
		const value = (event.target.value == this.password_confirm.value) && !isEmpty(event.target.value);
		const { registerPage, dispatch } = this.props;
		if(registerPage.passwordMatch != value) {
			dispatch(setPasswordMatch(value));
		}
	}


	render() {
		const { errors } = this.props.registerPage;
		const { registerPage } = this.props;
		const { registerData } = registerPage;
		if(registerPage.isLoading) {
			return <LoaderImage />
		}
		return (<RegisterPageContainer>
			<div>
				<NavigatorBar title="Register" onBackTapped={this.onBackTapped}/>
			</div>
			<div>
				<div>
					<CustomLabel isError={!isUndefined(errors['phone_number']) && errors['phone_number'].length > 0}>
						Phone number</CustomLabel>
					<CustomInputText placeholder="Your phone number"
						name='phone_number'
						onChange={this.onInputChange}
						defaultValue={registerData.phone_number}
						isError={!isUndefined(errors['phone_number']) && errors['phone_number'].length > 0}
						innerRef={phoneNumber => { this.phoneNumber = phoneNumber;}}/>
					{ !isUndefined(errors['phone_number']) && errors['phone_number'].map(error => 
							<FieldErrorMessage key={error}>{error}</FieldErrorMessage>)}
				</div>
				<div>
					<CustomLabel isError={!isUndefined(errors['password']) && errors['password'].length > 0}>Password</CustomLabel>
					<CustomInputText placeholder="Password" type="password"
						name='password'
						isError={!isUndefined(errors['password']) && errors['password'].length > 0}
						innerRef={password => { this.password = password; }}
						onChange={this.onPreCheckedPassword}/>
					{ !isUndefined(errors['password']) && errors['password'].map(error => 
						<FieldErrorMessage key={error}>{error}</FieldErrorMessage>)}
				</div>
				<div>
					<CustomLabel>Konfirmasi Password</CustomLabel>
					<CustomInputText placeholder="Konfirmasi Password" type="password"
						name='password_confirm'
						innerRef={password_confirm => { this.password_confirm = password_confirm;}}
						onChange={this.onPreCheckedPasswordConfirm}/>
				</div>
				<div>
					<GradientButton color1="#84fab0" color2="#8fd3f4" onClick={this.onRegisterTapped} 
						disabled={!registerPage.passwordMatch} disabledColor="gray">
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
	return {
		registerPage: state.get('registerPage').toJS(),
		global: state.get('global').toJS()
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);