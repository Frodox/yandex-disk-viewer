import React from 'react';
import PropTypes from 'prop-types';
import bytesToSize from '../utils/bytesToSize';
import './EmbeddedItem.css';
import icFolder from './ic_folder.svg';
import { fileMetaType } from './types';

class EmbeddedItem extends React.Component {
  _onClick = (e) => {
    e.preventDefault();
    const { onClick, item } = this.props;
    if (onClick) {
      onClick(item);
    }
  };

  render() {
    const { item } = this.props;
    const { name, size, type } = item;

    const isDir = type === 'dir';
    return (
      <div
        className="list-group-item list-group-item-action viewer__embedded-item"
        onClick={isDir ? this._onClick : null}
      >
        {isDir && (
          <img src={icFolder} alt="folder" className="viewer__embedded-item__file-type-icon" />
        )}
        <div className="viewer__embedded-item__info">
          <div>{name}</div>
          {!isDir && <div>{bytesToSize(size)}</div>}
        </div>
      </div>
    );
  }
}

EmbeddedItem.propTypes = {
  item: fileMetaType.isRequired,
  onClick: PropTypes.func,
};

EmbeddedItem.defaultProps = {
  onClick: null,
};

export default EmbeddedItem;
