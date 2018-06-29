import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import Viewer from '../viewer/Viewer';
import { routerContextTypes } from './types';

function App({ location }) {
  return <Route path="/:path?" component={Viewer} key={location.pathname} />;
}

App.propTypes = {
  ...routerContextTypes,
};

export default withRouter(App);
