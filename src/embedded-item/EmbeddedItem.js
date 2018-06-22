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
    let content = name;
    if (size) {
      content += ` (${bytesToSize(size)})`;
    }

    let img = null;
    let onClick = null;
    if ('dir' === type) {
      img = (
        <img
          src={ic_folder}
          alt="folder"
          className="embedded-item__file-type-icon"
        />
      );
      onClick = this._onClick;
    }
    return (
      <div className="list-group-item list-group-item-action" onClick={onClick}>
        {img}
        {content}
      </div>
    );
  }
}

export default EmbeddedItem;
