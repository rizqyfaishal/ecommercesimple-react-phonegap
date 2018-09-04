import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';

import HomePage from '../HomePage';
import LoginPage from '../LoginPage';
import ErrorPage from '../ErrorPage';
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
   
  }


  render() {
    const { global, dispatch, state } = this.props;
    return (
      <div>
        <Switch>
          <Route exact path="/" component={HomePage} />
        </Switch>
      </div>
    )
  }
} 


const mapStateToProps = state => ({
  global: state.get('global').toJS(),
  state: state.toJS()
});

const mapDispatchToProps = dispatch => ({
  dispatch: dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(BasePage);