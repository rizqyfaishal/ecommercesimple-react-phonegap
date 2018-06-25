import React, { Component } from 'react';
import styled from 'styled-components';
import { goBack, push } from 'react-router-redux';
import { connect } from 'react-redux';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import Tappable from 'react-tappable';
import NavigatorBar from '../../components/NavigatorBar';
import CustomButton from '../../components/CustomButton';
import GradientButton from '../../components/GradientButton';
import CustomTextArea from '../../components/CustomTextArea';
import CustomLabel from '../../components/CustomLabel';


const FillAdditionalPageContainer = styled.div`
	display: grid;
	grid-template-rows: 60px 1fr;
	grid-template-columns: 1fr;
	grid-template-areas: "navigator-bar"
		"additional-form";

	& > div:nth-child(1) {
		grid-area: navigator-bar;

	}

	& > div.additional-form {
		justify-items: center;
		align-items: center;
		grid-area: additional-form;
		display: grid;
		grid-template-areas: 
			"address-field"
			"payment-method-field"
			"save-button";
		grid-template-columns: 1fr;
		grid-template-rows: 1fr 1fr 0.5fr;
		padding: 0 1rem;
		
		& > div:nth-child(3) {
			justify-self: stretch;
			display: grid;
			justify-items: stretch;
			& > span {
				display: block;
			}
		}

		& > div.address-field, & > div.payment-method-field {
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

			& > textarea {
				grid-area: input;
				justify-self: stretch;
			}
		}

	}
`

class FillAdditionalInformationPage extends Component {

	constructor(props) {
		super(props);
		this.onBackTapped = this.onBackTapped.bind(this);
		this.onSaveTapped = this.onSaveTapped.bind(this);
	}

	onBackTapped(event) {
		console.log(this.props);
		const { dispatch } = this.props;
		dispatch(goBack());
	}

	onSaveTapped(event) {
		const { dispatch } = this.props;
		dispatch(push('/content/deal'));
	}

	render() {
		return (
			<CSSTransitionGroup transitionName="push"
            transitionEnterTimeout={ 300 } transitionLeaveTimeout={ 300 }>
        <FillAdditionalPageContainer>
					<div>
						<NavigatorBar title="Fill Additional Information" onBackTapped={this.onBackTapped} />
					</div>
					<div className="additional-form">
						<div className="address-field">
							<CustomLabel>Address</CustomLabel>
							<CustomTextArea placeholder="Misal: Jl. Serdang Baru no. 80, Jakarta" />
						</div>
						<div className="payment-method-field">
							<CustomLabel>Payment Method</CustomLabel>
							<CustomTextArea placeholder="Misal: BNI 12345678 an Ayu Puspitadewi" />
						</div>
						<div>
							<GradientButton color1="#84fab0" color2="#8fd3f4" onClick={this.onSaveTapped}>
								Save
							</GradientButton>
						</div>
					</div>
					
				</FillAdditionalPageContainer>
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

export default connect(mapStateToProps, mapDispatchToProps)(FillAdditionalInformationPage);