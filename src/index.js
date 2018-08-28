import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createHashHistory';

import configureStore from './configStore';

import App from './containers/App';

import './global-styles';
import "babel-polyfill";
import 'es6-promise/auto';

	
const initialState = {};
const history = createHistory();
const store = configureStore(initialState, history);

window.addEventListener('deviceready', () => {
	window.handleOpenURL = (url) => {
	  console.log("received url: " + url);
	}
})


ReactDOM.render((<Provider store={store}>
      <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
    </Provider>), document.getElementById('app'));
