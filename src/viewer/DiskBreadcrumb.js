import React from 'react';
import Breadcrumb from '../app/common/Breadcrumb';

class DiskBreadcrumb extends React.Component {
  _buildItems() {
    let { pathname } = this.props;
    const items = [];

    while (pathname.length !== 0) {
      const index = pathname.lastIndexOf('/');
      const lastPath = pathname.substring(index + 1);

      if (lastPath.length !== 0) {
        items.unshift({ name: lastPath, path: pathname });
      }

      pathname = pathname.substring(0, index);
    }

    items.unshift({ name: 'Home', path: '/' });

    return items;
  }

  render() {
    const items = this._buildItems();
    return <Breadcrumb items={items} />;
  }
}

export default DiskBreadcrumb;
