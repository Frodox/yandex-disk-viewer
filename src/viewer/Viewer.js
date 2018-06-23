import React from 'react';
import { connect } from 'react-redux';
import { loadFolder } from './actions';
import Breadcrumb from '../breadcrumb/Breadcrumb';
import EmbeddedItem from '../embedded-item/EmbeddedItem';
import Spinner from '../spinner/Spinner';

class Viewer extends React.Component {
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
    const { location, isLoading } = this.props;
    let embeddedItems = this._renderEmbeddedItems();
    let spinner = !isLoading ? null : <Spinner />;
    return (
      <div>
        <Breadcrumb pathname={location.pathname} />
        {embeddedItems}
        {spinner}
      </div>
    );
  }

  componentDidMount() {
    const { isLoading, onLoadFolder } = this.props;
    if (!!isLoading) {
      throw new Error('isLoading cannot be true here.');
    }

    const { pathname } = this.props.location;
    onLoadFolder(pathname);
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
