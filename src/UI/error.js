import React from 'react';

const ErrorComp = ({ msg }) => (
  <p
    style={{
      color: 'var(--covidPink)',
      background: 'var(--midBlack)',
      padding: '1rem',
      borderRadius: '0.4rem',
      margin: '3rem 0'
    }}
  >
    {msg}
  </p>
);

export default ErrorComp;
