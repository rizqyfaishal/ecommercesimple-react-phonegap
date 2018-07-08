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
		if(registerPage[key].length > 0) {
			dispatch(clearErrors(key));
		}	
	}

	onRegisterTapped() {
		const { dispatch } = this.props;
		const data = {
			username: this.username.value,
			email: this.email.value,
			first_name: this.first_name.value,
			last_name: this.last_name.value,
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
		console.log(errors);
		if(registerPage.isLoading) {
			return <LoaderImage />
		}
		return (<RegisterPageContainer>
			<div>
				<NavigatorBar title="Register" onBackTapped={this.onBackTapped}/>
			</div>
			<div>
				<div>
					<CustomLabel isError={!isUndefined(errors['username']) && errors['username'].length > 0}>Username</CustomLabel>
					<CustomInputText placeholder="Username"
						name='username'
						onChange={this.onInputChange}
						defaultValue={registerData.username}
						isError={!isUndefined(errors['username']) && errors['username'].length > 0}
						innerRef={username => { this.username = username;}}/>
					{ !isUndefined(errors['username']) && errors['username'].map(error => 
							<FieldErrorMessage key={error}>{error}</FieldErrorMessage>)}
				</div>
				<div>
					<CustomLabel isError={!isUndefined(errors['email']) && errors['email'].length > 0}>Email</CustomLabel>
					<CustomInputText placeholder="Email"
						name='email'
						onChange={this.onInputChange}
						defaultValue={registerData.email}
						isError={!isUndefined(errors['email']) && errors['email'].length > 0}
						innerRef={email => { this.email = email;}}/>
					{ !isUndefined(errors['email']) && errors['email'].map(error => 
							<FieldErrorMessage key={error}>{error}</FieldErrorMessage>)}
				</div>
				<div>
					<CustomLabel isError={!isUndefined(errors['first_name']) && errors['first_name'].length > 0}>First Name</CustomLabel>
					<CustomInputText placeholder="First Name"
						name='first_name'
						onChange={this.onInputChange}
						defaultValue={registerData.first_name}
						isError={!isUndefined(errors['first_name']) && errors['first_name'].length > 0}
						innerRef={first_name => { this.first_name = first_name;}}/>
					{ !isUndefined(errors['first_name']) && errors['first_name'].map(error => 
							<FieldErrorMessage key={error}>{error}</FieldErrorMessage>)}
				</div>
				<div>
					<CustomLabel isError={!isUndefined(errors['last_name']) && errors['last_name'].length > 0}>Last Name</CustomLabel>
					<CustomInputText placeholder="Last Name"
						name='last_name'
						onChange={this.onInputChange}
						defaultValue={registerData.last_name}
						isError={!isUndefined(errors['last_name']) && errors['last_name'].length > 0}
						innerRef={last_name => { this.last_name = last_name; }}/>
					{ !isUndefined(errors['last_name']) && errors['last_name'].map(error => 
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
		registerPage: state.get('registerPage').toJS()
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);