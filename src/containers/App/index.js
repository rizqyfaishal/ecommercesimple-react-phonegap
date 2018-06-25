import React from 'react';
import { Switch, Route } from 'react-router-dom';


import HomePage from '../HomePage';
import NotFoundPage from '../NotFoundPage';
import LoginPage from '../LoginPage';
import RegisterPage from '../RegisterPage';
import FillAdditionalInformationPage from '../FillAdditionalInformationPage';
import ContentPage from '../ContentPage';


export default function App() {	
  return (
    <div>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/fill-additional-information" component={FillAdditionalInformationPage} />
        <Route path="/content" component={ContentPage}/>
      </Switch>
    </div>
  );
}
