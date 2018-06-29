import React from 'react';

export default function Alert({ message, level = 'primary' }) {
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
