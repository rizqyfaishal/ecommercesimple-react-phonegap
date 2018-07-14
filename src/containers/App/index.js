import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import LoaderImage from '../../components/LoaderImage';

import BasePage from '../BasePage';
import HomePage from '../HomePage';
import NotFoundPage from '../NotFoundPage';
import LoginPage from '../LoginPage';
import RegisterPage from '../RegisterPage';
import FillAdditionalInformationPage from '../FillAdditionalInformationPage';
import ContentPage from '../ContentPage';



class App extends Component {	

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Switch>
          <Route path="/" component={BasePage} />
        </Switch>
      </div>
    );
  }
}

export default App