import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import Viewer from './viewer/Viewer';

class App extends Component {
  render() {
    const { pathname } = this.props.location;
    return <Route path="/:path?" component={Viewer} key={pathname} />;
  }
}

export default withRouter(App);
