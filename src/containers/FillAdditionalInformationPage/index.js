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

		& > div.address-field, & > div.payment-method-field {
			margin: 1rem 0;
			width: 100%;
			display: flex;
			flex-direction: column;
			justify-content: stretch;
			padding: 0 1rem;
			
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