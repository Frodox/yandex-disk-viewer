import * as React from 'react';
import { Route, RouteComponentProps, withRouter } from 'react-router-dom';
import Viewer from '../viewer/Viewer';

function App({ location }: RouteComponentProps<any>) {
  return <Route path="/:path?" component={Viewer} key={location.pathname} />;
}

export default withRouter(App);
