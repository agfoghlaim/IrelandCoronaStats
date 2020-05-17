import React from 'react';
import classes from './toolTip.module.css';
const ToolTip = ({ hoverPosition, hoverColor, children }) => {
  const blacks = ['var(--black)', 'var(--midBlack)', 'var(--lightBlack)'];

  return (
    <div
      className={classes.toolTip}
      style={{
        position: 'fixed',
        left: `${hoverPosition[0]}px`,
        top: `${hoverPosition[1]}px`,
        background: `${hoverColor}`,
        color: `${
          blacks.includes(hoverColor) ? 'var(--white)' : 'var(--black)'
        }`,
        padding: '0.5rem 1rem',
        borderRadius: '0.4rem',
        fontSize: '0.6rem',
      }}
    >
      {children}
    </div>
  );
};

export default ToolTip;
