import React from 'react';

const TinyToolTip = ({ isHovered, hoverPosition, hoverColor, children }) => {

  return (
    <div
      style={{
        opacity: `${isHovered ? '1' : '0'}`,
        position: 'fixed',
        left: `${hoverPosition[0]}px`,
        top: `${hoverPosition[1]}px`,
        background: `${hoverColor}`,
        color: 'var(--white)',
        padding: '0.5rem 1rem',
        borderRadius: '0.4rem',
        fontSize: '0.6rem',
      }}
    >
      {children}
    </div>
  );
};

export default TinyToolTip;
