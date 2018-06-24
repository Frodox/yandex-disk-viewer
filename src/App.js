import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import Viewer from './viewer/Viewer';

function App({ location }) {
  return <Route path="/:path?" component={Viewer} key={location.pathname} />;
}

export default withRouter(App);
