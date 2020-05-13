import React from 'react';
import classes from './boringButton.module.css';
// import classes from './boringButton.module.css';

const BoringButton = ({ config, onClick, children, overRideStyle }) => {
  const {
    background,
    borderRadius,
    color,
    border,
    fontWeight,
    fontSize,
    padding,
    outline,
    minWidth,
    position,
    right,
    left,
    top,
    bottom,
  } = config || {};

  const theStyle = () => {
    return {
      background: `${background ? background : 'var(--blue)'} `,
      borderRadius: `${borderRadius ? borderRadius : '0.4rem'}`,
      color: `${color ? color : 'var(--white)'}`,
      border: `${border ? border : 'none'}`,
      fontWeight: `${fontWeight ? fontWeight : '700'}`,
      fontSize: `${fontSize ? fontSize : '0.6rem'}`,
      padding: `${padding ? padding : '0.5rem 1rem'}`,
      outline: `${outline ? outline : 'none'}`,
      minWidth: `${minWidth ? minWidth : '5rem'}`,
      position: `${position ? position : ''}`,
      right: `${right ? right : ''}`,
      left: `${left ? left : ''}`,
      top: `${top ? top : ''}`,
      bottom: `${bottom ? bottom : ''}`,
      transition: 'all 200ms ease-out'
    };
  };

  return (
    <button className={classes.boringButton} style={{ ...theStyle(), ...overRideStyle }} onClick={onClick}>
      {children}
    </button>
  );
};

export default BoringButton;
