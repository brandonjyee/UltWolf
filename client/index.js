import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import { Router } from 'react-router-dom';
import history from './history';
import store from './store';
import App from './app';

// Establishes socket connection
import './socket';

// Establishes Tok connection. Needs apiKey and sessionId from socket conn
// import './opentok'

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('app')
);
