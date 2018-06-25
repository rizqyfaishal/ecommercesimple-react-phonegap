import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import swal from 'sweetalert';
import TopNavBar from '../../components/TopNavBar';
import ProfileSelector from '../../components/ProfileSelector';

import { Switch, Route } from 'react-router-dom';
import Tappable from 'react-tappable';
import {
	TOGGLE_STATUS_BUY,
	TOGGLE_STATUS_SELL
} from './constants';

import {
	onToggleTapped
} from './actions';


import MyDealPage from '../MyDealPage';
import MakeDealPage from '../MakeDealPage';

import Next from '../../images/next.svg';
import Users from '../../images/users.svg';

const changePageByToggle = (url) => (dispatch) => {
	dispatch(push(url));
	dispatch(onToggleTapped());
}

const DealPageWrapper = styled.div`
	display: grid;
	justify-items: center;
	align-items: center;
	grid-template-rows: 90px 1fr;
	grid-template-columns: 1fr;
	justify-items: stretch;
	grid-template-areas: "top-nav-bar"
		"deal-content";

	& > div:nth-child(1) {
		grid-area: top-nav-bar;
		border-bottom: 1px solid #ddd;
	}

	& > div:nth-child(2) {
		grid-area: deal-content;
		background-color: white;
		padding: 0 1rem 1rem 1rem;

	}

`;

class DealPage extends Component {

	constructor(props) {
		super(props);
		this.onToggleTapped = this.onToggleTapped.bind(this);
		this.onLeftTapped = this.onLeftTapped.bind(this);
	}

	onToggleTapped(event) {
		const { dispatch, dealPage } = this.props;
		const url = dealPage.currentToggleStatus == TOGGLE_STATUS_SELL ? '/content/deal/my' : '/content/deal/make';
		dispatch(changePageByToggle(url));
	}

	onLeftTapped(event) {
		const { dispatch, dealPage } = this.props;
		const profileProps = dealPage.profiles.map(profile => {
			if(profile.value == dealPage.currentProfile) {
				return {
					...profile,
					isActive: true
				}
			}
			return {
				...profile,
				isActive: false
			}
		});

		let wrapper = document.createElement('div');
		ReactDOM.render(<ProfileSelector name="profile" profiles={profileProps} />, wrapper);
		let content = wrapper.firstChild;
		swal({
			title: 'Select Profile',
			content: content,
			closeOnClickOutside: true,
		  buttons: {
		    Select: true,
		  },
		})
		.then((value) => {
		  switch (value) {
		    default:
		      swal("Got away safely!");
		  }
		});
	}

	render() {
		const { dealPage, match } = this.props;
		
		return <DealPageWrapper>
			<div>
				<TopNavBar title="Logo" status={dealPage.currentToggleStatus} 
					onToggleTapped={this.onToggleTapped}>
					<div>
						<Tappable onTap={this.onLeftTapped}>
							<img src={Users} alt="next-button" width="30" />
							<p>Current profile</p>
						</Tappable>
					</div>
					<div>
						<Tappable>
							<img src={Next} alt="next-button" width="30" />
							<p>{ dealPage.currentToggleStatus == TOGGLE_STATUS_SELL ? 'Switch Profile' : 'Switch Offer' }</p>
						</Tappable>
					</div>
				</TopNavBar>
			</div>
			<div>
				<Route path={`${match.url}/make`} component={MakeDealPage} />
				<Route path={`${match.url}/my`} component={MyDealPage} />
			</div>
		</DealPageWrapper>;
	}
}


const mapStateToProps = (state) => ({
	dealPage: state.get('dealPage').toJS(),
})

const mapDispatchToProps = (dispatch) => ({
	dispatch: dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(DealPage);