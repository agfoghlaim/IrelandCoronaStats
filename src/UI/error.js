import React from 'react';

const ErrorComp = ({ msg }) => (
  <p
    style={{
      color: 'white',
      background: 'var(--purple)',
      padding: '1rem',
      borderRadius: '0.4rem',
    }}
  >
    {msg}
  </p>
);

export default ErrorComp;
