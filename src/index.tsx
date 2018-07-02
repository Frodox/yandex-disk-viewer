import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'; // eslint-disable-line import/no-extraneous-dependencies
import ReduxThunk from 'redux-thunk';
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
