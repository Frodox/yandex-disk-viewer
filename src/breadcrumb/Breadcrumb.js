import React from 'react';
import './breadcrumb.css';

class Breadcrumb extends React.Component {
  _renderItems() {
    const { pathname } = this.props;
    const items = ['Home'].concat(pathname.split('/').filter(item => 0 !== item.length));
    //TODO: Change text with Links
    return items.map((item, index) => <li class={'breadcrumb-item ' + (index === items.length - 1 ? 'active' : '')}>{item}</li>);
  }

  render() {
    return (
      <nav role="navigation">
        <ol class="breadcrumb breadcrumb_no-margin">
          {this._renderItems()}
        </ol>
      </nav>
    );
  }
}

export default Breadcrumb;
