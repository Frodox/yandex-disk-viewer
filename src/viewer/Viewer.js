import React from 'react';
import { connect } from 'react-redux';
import { loadFolder } from './actions';
import Breadcrumb from '../breadcrumb/Breadcrumb';
import EmbeddedItem from '../embedded-item/EmbeddedItem';
import ErrorAlert from '../error-alert/ErrorAlert';
import InfiniteScroll from 'react-infinite-scroller';
import Spinner from '../spinner/Spinner';

class Viewer extends React.Component {
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

  _handleEmbeddedItemClick = item => {
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
          <EmbeddedItem
            item={item}
            key={item.path}
            onClick={this._handleEmbeddedItemClick}
          />
        ))}
      </div>
    );
  }

  render() {
    const { error, location, isLoading } = this.props;
    return (
      <div>
        <Breadcrumb pathname={location.pathname} />
        {error ? <ErrorAlert message={error.message} /> : null}
        <InfiniteScroll
          hasMore={this._hasMore()}
          loader={null}
          loadMore={this._onLoadFolder}
          pageStart={0}
        >
          {this._renderEmbeddedItems()}
          {isLoading ? <Spinner /> : null}
        </InfiniteScroll>
      </div>
    );
  }

  componentDidMount() {
    const { isLoading, location, onLoadFolder } = this.props;
    if (!!isLoading) {
      throw new Error('isLoading cannot be true here.');
    }

    onLoadFolder(location.pathname);
  }
}

const mapStateToProps = state => {
  return state.folder;
};
const mapDispatchToProps = dispatch => {
  return {
    onLoadFolder: path => {
      dispatch(loadFolder(path));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Viewer);
