import React from 'react';
import { Link } from 'react-router-dom';
import './breadcrumb.css';

class Breadcrumb extends React.Component {
  _renderItem(item, index, items) {
    const isLast = index === items.length - 1;
    return (
      <li
        className={'breadcrumb-item ' + (isLast ? '' : 'active')}
        key={item.path}
      >
        {isLast ? item.name : <Link to={item.path}>{item.name}</Link>}
      </li>
    );
  }

  _renderItems() {
    let { pathname } = this.props;
    const items = [];

    while (0 !== pathname.length) {
      const index = pathname.lastIndexOf('/');
      const lastPath = pathname.substring(index + 1);

      if (0 !== lastPath.length) {
        items.unshift({ name: lastPath, path: pathname });
      }

      pathname = pathname.substring(0, index);
    }

    items.unshift({ name: 'Home', path: '/' });

    return items.map(this._renderItem);
  }

  render() {
    return (
      <nav>
        <ol className="breadcrumb viewer__breadcrumb">
          {this._renderItems()}
        </ol>
      </nav>
    );
  }
}

export default Breadcrumb;
