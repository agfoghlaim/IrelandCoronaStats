import React from 'react';

const YAxisLabel = ({ text, yClass, height, margin }) => {
  return (
    <text
      fill="var(--white)" // for dark graph theme
      x={-Math.abs(height -margin.bottom)}
      y="12"
      style={{ transform: 'rotate(-90deg)', fontSize: '1rem', fontWeight:700 }}
      className={yClass}
    >
      {text}
    </text>
  );
};

export default YAxisLabel;
