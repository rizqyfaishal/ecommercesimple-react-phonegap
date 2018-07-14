import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';

import HomePage from '../HomePage';
import LoginPage from '../LoginPage';
import RegisterPage from '../RegisterPage';
import FillAdditionalInformationPage from '../FillAdditionalInformationPage';
import ContentPage from '../ContentPage';

import LoaderImage from '../../components/LoaderImage';
import { onVerifyTokenAction, onRender } from '../../actions';


class BasePage extends Component {
	constructor(props) {

		super(props);
	}

	componentWillMount() {
    const { dispatch } = this.props;
    const token = window.localStorage.getItem('auth-token');
    if(token) {
      dispatch(onVerifyTokenAction());
    } else {
    	dispatch(onRender());
    }
  }


	render() {
		const { global, dispatch } = this.props;
    if(global.isLoading) {
      return <LoaderImage />;
    } else if(global.render) {
    	return <div>
				<Switch>
					<Route exact path="/" component={HomePage} />
					<Route path="/login" component={LoginPage} />
	        <Route path="/register" component={RegisterPage} />
	        <Route path="/content" component={ContentPage}/>
				</Switch>
			</div>
    } else {
    	return null;
    }
	}
} 


const mapStateToProps = state => ({
	global: state.get('global').toJS()
});

const mapDispatchToProps = dispatch => ({
	dispatch: dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(BasePage);