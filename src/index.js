import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createHashHistory';

import configureStore from './configStore';

import App from './containers/App';

import './global-styles';


const initialState = {};
const history = createHistory();
const store = configureStore(initialState, history);

console.log(ConnectedRouter)
ReactDOM.render((<Provider store={store}>
      <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
    </Provider>), document.getElementById('app'));
