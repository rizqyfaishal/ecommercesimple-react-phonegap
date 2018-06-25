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
import Slider from 'react-slick';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SliderPageContainer = styled.div`
	
`

class SliderPage extends Component {

	constructor(props) {
		super(props);
		this.onBackTapped = this.onBackTapped.bind(this);
		this.onSkipTapped = this.onSkipTapped.bind(this);
	}

	onBackTapped(event) {
		console.log(this.props);
		const { dispatch } = this.props;
		dispatch(goBack());
	}

	onSkipTapped(event) {
		const { dispatch } = this.props;
		dispatch(push('/register'));
	}

	
	render() {

		var settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
		return (
			<CSSTransitionGroup transitionName="push"
            transitionEnterTimeout={ 300 } transitionLeaveTimeout={ 300 }>
        <SliderPageContainer>
					<Slider {...settings}>
		        <div>
		          <h3>1</h3>
		        </div>
		        <div>
		          <h3>2</h3>
		        </div>
		        <div>
		          <h3>3</h3>
		        </div>
		        <div>
		          <h3>4</h3>
		        </div>
		        <div>
		          <h3>5</h3>
		        </div>
		        <div>
		          <h3>6</h3>
		        </div>
		      </Slider>
				</SliderPageContainer>
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

export default connect(mapStateToProps, mapDispatchToProps)(SliderPage);