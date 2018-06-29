import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Breadcrumb.css';

function mapItem(item, index, items) {
  const isLast = index === items.length - 1;
  return (
    <li className={`breadcrumb-item ${!isLast && 'active'}`} key={item.path}>
      {isLast ? item.name : <Link to={item.path}>{item.name}</Link>}
    </li>
  );
}

export default function Breadcrumb({ items }) {
  return (
    <nav>
      <ol className="breadcrumb">{items.map(mapItem)}</ol>
    </nav>
  );
}

Breadcrumb.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    }),
  ),
};

Breadcrumb.defaultProps = {
  items: [],
};
