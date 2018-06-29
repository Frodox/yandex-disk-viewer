import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { connect } from 'react-redux';
import { loadFolder } from './actions';
import Alert from '../app/common/Alert';
import DiskBreadcrumb from './DiskBreadcrumb';
import EmbeddedItem from '../embedded-item/EmbeddedItem';
import Spinner from '../app/common/Spinner';

class Viewer extends React.Component {
  componentDidMount() {
    const { isLoading, location, onLoadFolder } = this.props;
    if (isLoading) {
      throw new Error('isLoading cannot be true here.');
    }

    onLoadFolder(location.pathname);
  }

  _hasMore = () => {
    const { isLoading, items, total } = this.props;
    return total > (items || []).length && !isLoading;
  };

  _onLoadFolder = () => {
    const { location, onLoadFolder } = this.props;
    if (this._hasMore()) {
      onLoadFolder(location.pathname);
    }
  };

  _handleEmbeddedItemClick = (item) => {
    const { history } = this.props;
    history.push(item.path.replace('disk:', ''));
  };

  _renderEmbeddedItems() {
    const { items } = this.props;
    if (!items) {
      return null;
    }

    return (
      <div className="list-group">
        {items.map(item => (
          <EmbeddedItem item={item} key={item.path} onClick={this._handleEmbeddedItemClick} />
        ))}
      </div>
    );
  }

  render() {
    const { error, location, isLoading } = this.props;
    return (
      <div>
        <DiskBreadcrumb pathname={location.pathname} />
        {!!error && <Alert message={error.message} level="warning" />}
        <InfiniteScroll
          hasMore={this._hasMore()}
          loader={null}
          loadMore={this._onLoadFolder}
          pageStart={0}
        >
          {this._renderEmbeddedItems()}
          {isLoading && <Spinner />}
        </InfiniteScroll>
      </div>
    );
  }
}

const mapStateToProps = state => state.folder;
const mapDispatchToProps = dispatch => ({
  onLoadFolder: (path) => {
    dispatch(loadFolder(path));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Viewer);
