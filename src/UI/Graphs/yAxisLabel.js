import React from 'react';

const YAxisLabel = ({ text, yClass, height }) => {
  return (
    <text
      fill="var(--black)"
      x={-Math.abs(height / 2 + 110)}
      y="10"
      style={{ transform: 'rotate(-90deg)', fontSize: '0.8rem' }}
      className={yClass}
    >
      {text}
    </text>
  );
};

export default YAxisLabel;
