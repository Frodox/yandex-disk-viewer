import React from 'react';
import bytesToSize from '../common/bytesToSize';
import './embeddedItem.css';
import ic_folder from './ic_folder.svg';

class EmbeddedItem extends React.Component {
  _onClick = e => {
    e.preventDefault();
    const { onClick } = this.props;
    if (onClick) {
      onClick(this.props.item);
    }
  };

  render() {
    const { name, size, type } = this.props.item;

    let img = null;
    let onClick = null;
    let sizeNode = null;
    if ('dir' === type) {
      img = (
        <img
          src={ic_folder}
          alt="folder"
          className="viewer__embedded-item__file-type-icon"
        />
      );
      onClick = this._onClick;
    } else {
      sizeNode = <div>{bytesToSize(size)}</div>;
    }
    return (
      <div
        className="list-group-item list-group-item-action viewer__embedded-item"
        onClick={onClick}
      >
        {img}
        <div className="viewer__embedded-item__info">
          <div>{name}</div>
          {sizeNode}
        </div>
      </div>
    );
  }
}

export default EmbeddedItem;
