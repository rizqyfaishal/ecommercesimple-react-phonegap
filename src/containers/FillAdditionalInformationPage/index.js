import React, { Component } from 'react';
import styled from 'styled-components';
import { goBack, push } from 'react-router-redux';
import { connect } from 'react-redux';
import { isEmpty, isUndefined } from 'lodash';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import Tappable from 'react-tappable';


import {
	setEnableButton,
	setDisableButton,
	onSaveTappedAction
} from './actions';

import NavigatorBar from '../../components/NavigatorBar';
import CustomButton from '../../components/CustomButton';
import GradientButton from '../../components/GradientButton';
import CustomTextArea from '../../components/CustomTextArea';
import CustomLabel from '../../components/CustomLabel';
import LoaderImage from '../../components/LoaderImage';
import FieldErrorMessage from '../../components/FieldErrorMessage';
import CustomInputText from '../../components/CustomInputText';

const FillAdditionalPageContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: stretch;
	align-items: center;
	padding: 0 1rem;

	& > div:nth-child(1) {
		height: 50px;
	}

	& > div.additional-form {
		justify-content: stretch;
		align-items: center;	
		width: 100%;
		display: flex;
		flex-direction: column;
		
		& > div:nth-child(3) {
			width: 100%;
			& > button {
				width: 100%;
				margin: 0.5rem 0;
				display: block;
			}
		}

		& > div.address-field, & > div.payment-method-field, & > div.phone-number-field {
			margin: 1rem 0;
			width: 100%;
			display: flex;
			flex-direction: column;
			justify-content: stretch;
			padding: 0 1rem;
			
			& > p {
				font-size: 80%;
				margin: 0.5rem 0.2rem;
			}
		}

	}
`

class FillAdditionalInformationPage extends Component {

	constructor(props) {
		super(props);
		this.onBackTapped = this.onBackTapped.bind(this);
		this.onSaveTapped = this.onSaveTapped.bind(this);
		this.onInputChange = this.onInputChange.bind(this);
	}

	onBackTapped(event) {
		const { dispatch } = this.props;
		dispatch(goBack());
	}

	onSaveTapped(event) {
		const { dispatch, global } = this.props;
		dispatch(onSaveTappedAction(this.address.value, this.payment_method.value, global.userData.id));
	}

	onInputChange(event) {
		const addressValue = this.address.value;
		const paymentMethodValue = this.payment_method.value;
		const { dispatch, fillAdditionalInformationPage } = this.props;
		if(!isEmpty(addressValue) && !isEmpty(paymentMethodValue)) {
			if(!fillAdditionalInformationPage.buttonEnabled) {
				dispatch(setEnableButton());
			}
		} else {
			if(fillAdditionalInformationPage.buttonEnabled) {
				dispatch(setDisableButton());
			}
		}
	}

	render() {
		const { fillAdditionalInformationPage, dispatch } = this.props;
		if(fillAdditionalInformationPage.successSaved) {
			dispatch(push('/content/deal/make'));
		}
		const content = fillAdditionalInformationPage.isLoading ?
			<LoaderImage /> : 
				<FillAdditionalPageContainer>
					<div>
						<NavigatorBar title="Fill Additional Information" onBackTapped={this.onBackTapped} />
					</div>
					<div className="additional-form">
						<div className="address-field">
							<CustomLabel 
								isError={!isUndefined(fillAdditionalInformationPage.errors.address) && 
										fillAdditionalInformationPage.errors.address.length > 0}>Address</CustomLabel>
							<CustomTextArea placeholder="Misal: Jl. Serdang Baru no. 80, Jakarta" 
								isError={!isUndefined(fillAdditionalInformationPage.errors.address) && 
										fillAdditionalInformationPage.errors.address.length > 0}
								defaultValue={fillAdditionalInformationPage.formData.address}
								onChange={this.onInputChange}
								innerRef={address => { this.address = address; }}/>
							{ !isUndefined(fillAdditionalInformationPage.errors.address) && 
								fillAdditionalInformationPage.errors.address.map((error, index) => 
									<FieldErrorMessage key={'error' + index}>{error}</FieldErrorMessage>
								)}
						</div>
						<div className="payment-method-field">
							<CustomLabel 
								isError={!isUndefined(fillAdditionalInformationPage.payment_method) && 
										fillAdditionalInformationPage.errors.payment_method.length > 0}>Payment Method</CustomLabel>
							<CustomTextArea placeholder="Misal: BNI 12345678 an Ayu Puspitadewi" 
								isError={!isUndefined(fillAdditionalInformationPage.payment_method) && 
										fillAdditionalInformationPage.errors.payment_method.length > 0}
								defaultValue={fillAdditionalInformationPage.formData.payment_method}
								onChange={this.onInputChange}
								innerRef={payment_method => { this.payment_method = payment_method; }}/>
							{ !isUndefined(fillAdditionalInformationPage.errors.payment_method) && 
								fillAdditionalInformationPage.errors.payment_method.map((error, index) => 
									<FieldErrorMessage key={'error' + index}>{error}</FieldErrorMessage>
								)}
						</div>
						<div>
							<GradientButton disabled={!fillAdditionalInformationPage.buttonEnabled}
								color1="#84fab0" 
								color2="#8fd3f4" onClick={this.onSaveTapped} disabledColor="#ddd">
								Save
							</GradientButton>
						</div>
					</div>
					
				</FillAdditionalPageContainer>
		return (
			<CSSTransitionGroup transitionName="push"
            transitionEnterTimeout={ 300 } transitionLeaveTimeout={ 300 }>
        { content }
      </CSSTransitionGroup>);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		dispatch: dispatch
	};
}

const mapStateToProps = (state) => {
	return {
		fillAdditionalInformationPage: state.get('fillAdditionalInformationPage').toJS(),
		global: state.get('global').toJS()
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(FillAdditionalInformationPage);