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

document.addEventListener('deviceready', () => {
	navigator.contactsPhoneNumbers.list(function(contacts) {
      console.log(contacts.length + ' contacts found');
      const conta = JSON.stringify(contacts);
      document.body.innerHTML = conta;
      for(var i = 0; i < contacts.length; i++) {
         console.log(contacts[i].id + " - " + contacts[i].displayName);
         for(var j = 0; j < contacts[i].phoneNumbers.length; j++) {
            var phone = contacts[i].phoneNumbers[j];
            console.log("===> " + phone.type + "  " + phone.number + " (" + phone.normalizedNumber+ ")");
         }
      }
   }, function(error) {
      console.error(error);
   });
}, false)



const initialState = {};
const history = createHistory();
const store = configureStore(initialState, history);


ReactDOM.render((<Provider store={store}>
      <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
    </Provider>), document.getElementById('app'));
