import React from 'react';
import { connect } from 'react-redux';
import { loadFolder } from './actions';

class Viewer extends React.Component {
  _renderEmbeddedItems() {
    const { items } = this.props;
    if (!items) {
      return null;
    }

    return (
      <div>
        {items.map(item => <div>{`${item.name} – ${item.size}`}</div>)}
      </div>
    );
  }

  render() {
    const { isLoading, name } = this.props;
    let embeddedItems = this._renderEmbeddedItems();
    let spinner = !isLoading ? null : <div>Spinner</div>;
    return (
      <div>
        <div>
          <p>{name}</p>
        </div>
        {embeddedItems}
        {spinner}
      </div>
    );
  }

  componentDidMount() {
    const { isLoading, onLoadFolder } = this.props;
    if (!!isLoading) {
      throw 'isLoading cannot be true here.';
    }

    onLoadFolder('/');
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
