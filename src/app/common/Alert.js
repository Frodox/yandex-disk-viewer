import React from 'react';
import PropTypes from 'prop-types';

export default function Alert({ message, level }) {
  const blockClassName = `alert alert-${level} alert-dismissible fade show`;
  return (
    <div className={blockClassName} role="alert">
      {message}
      <button type="button" className="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
}

Alert.propTypes = {
  message: PropTypes.string.isRequired,
  level: PropTypes.oneOf([
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'info',
    'light',
    'dark',
  ]),
};

Alert.defaultProps = {
  level: 'primary',
};
