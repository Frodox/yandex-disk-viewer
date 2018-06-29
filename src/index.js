import React from 'react';
import ReactDOM from 'react-dom';
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'; // eslint-disable-line import/no-extraneous-dependencies
import App from './app/App';
import diskViewerApp from './app/reducers';
import './index.css';

const store = createStore(diskViewerApp, composeWithDevTools(applyMiddleware(ReduxThunk)));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'),
);
