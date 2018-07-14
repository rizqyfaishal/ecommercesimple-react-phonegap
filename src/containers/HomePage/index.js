import React, { Component } from 'react';
import styled from 'styled-components';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import Tappable from 'react-tappable';

import { isUndefined } from 'lodash';

import CustomButton from '../../components/CustomButton';
import GradientButton from '../../components/GradientButton';



const HomePageContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-items: center;
	align-items: center;
	& > div:nth-child(1) {
		height: calc(100vh - 220px);
		position: relative;
		& > div.circle1 {
			position: absolute;
			top: -70vw;
			left: -55vw;
			z-index: 1;
			width: 120vw;
			height: 120vw;
			border-radius: 50%;
			background-color: rgba(244, 75, 66, 0.8);

			@media only screen and (min-width: 481px) {
				top: -80vw;
			}
		}

		& > div.circle2 {
			z-index: 2;
			position: absolute;
			top: -4vw;
			left: -85vw;
			width: 90vw;
			height: 90vw;
			border-radius: 50%;
			background-color: rgba(30, 135, 201, 0.8);
			@media only screen and (min-width: 481px) {
				top: -40vw;
			}
		}

		& > div.circle3 {
			z-index: 3;
			position: absolute;
			top: -70vw;
			left: -52vw;
			z-index: 1;
			width: 110vw;
			height: 110vw;
			border-radius: 50%;
			background-color: rgba(244, 75, 66, 0.8);

			@media only screen and (min-width: 481px) {
				top: -60vw;
			}
		}

		& > div.circle4 {
			z-index: 4;
			position: absolute;
			top: -4vw;
			left: -14vw;
			width: 90vw;
			height: 90vw;
			border-radius: 50%;
			background-color: rgba(244, 145, 39, 0.8);

			@media only screen and (min-width: 481px) {
				top: -30vw;
			}
		}

		& > div.circle5 {
			z-index: 5;
			position: absolute;
			top: 30vw;
			left: calc((100% - 288px) / 2);
			width: 80vw;
			height: 80vw;
			max-width: 700
			border-radius: 50%;
			background-color: rgba(41, 173, 162, 0.8);
			text-align: center;
			vertical-align: middle;
			color: #fff;
			display: table;

			@media only screen and (min-width: 481px) {
				top: 0;
			}

			@media only screen and (min-width: 830px) {
				top: -120px;
			}

			@media only screen and (min-width: 1000px) {
				top: calc((100vh-80vw)/2);
			}


			& > div.table-cell {
				display: table-cell;
				vertical-align: middle;
				height: 80vw;

				& > h2 {
					text-transform: uppercase;
					font-size: 2rem;
				}

				& > p {
					font-size: 1.2rem;
				}
			}
		}
	}

	& > div:nth-child(3) {
		z-index: 100;
		& > p {
			margin: 0;
		}
		& > span {
			display: block;
			text-decoration: underline;
			color: #8fd3f4;
			margin: auto;
			text-align: center;
		}
	}

	& > div:nth-child(2) {
		padding: 4rem 0;
		z-index: 100;
	}
`

class HomePage extends Component {

	constructor(props) {
		super(props);
		this.onGettingStartedTapped = this.onGettingStartedTapped.bind(this);
		this.onLoginHereTapped = this.onLoginHereTapped.bind(this);
	}

	componentWillMount() {
		const { dispatch, global } = this.props;
		if(global.isLoggedIn) {
			if(isUndefined(global.userData.additional_information)) {
				dispatch(push('/content/fill-additional-information'));
			} else {
				dispatch(push('/content/deal/make'));
			}
		}
	}

	onGettingStartedTapped(event) {
		const { dispatch } = this.props;
		dispatch(push('/register'));
	}

	onLoginHereTapped(event) {
		event.preventDefault();
		const { dispatch } = this.props;
		dispatch(push('/login'));
	}

	render() {
		return (<HomePageContainer>
			<div>
				<div className="circle1"></div>
				<div className="circle2"></div>
				<div className="circle3"></div>
				<div className="circle4"></div>
				<div className="circle5">
					<div className="table-cell">
						<h2>Simple Shop</h2>
						<p>The simplest way to shop</p>
					</div>
				</div>
			</div>
			<div>
				<CustomButton bg="rgb(234, 115, 11)" color="#fff" onClick={this.onGettingStartedTapped}>
					Getting Started
				</CustomButton>
			</div>
			<div>
				<p>Already have account?</p>
				<Tappable href="#" onTap={this.onLoginHereTapped}>Login here</Tappable>
			</div>
		</HomePageContainer>);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		dispatch: dispatch
	};
}

const mapStateToProps = (state) => {
	return {
		global: state.get('global').toJS(),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);