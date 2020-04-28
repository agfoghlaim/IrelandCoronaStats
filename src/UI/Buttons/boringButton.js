import React from 'react';
// import classes from './boringButton.module.css';

const BoringButton = ({ config, onClick, children}) => {

  const { background, borderRadius, color, border, fontWeight, fontSize, padding, outline, minWidth} = config || {};

  return <button 
  style={{
    background: `${background ? background : 'var(--blue)'} `,
    borderRadius: `${borderRadius ? borderRadius : '0.4rem'}`,
    color: `${color ? color : 'var(--white)'}`,
    border: `${border ? border : 'none'}`,
    fontWeight: `${fontWeight ? fontWeight : '700'}`,
    fontSize: `${fontSize ? fontSize : '0.6rem'}`,
    padding: `${padding ? padding : '0.5rem 1rem'}`,
    outline: `${outline ? outline : 'none'}`, 
    minWidth: `${minWidth ? minWidth : '5rem'}`
  
  }}
  onClick={onClick}
>
  {children}
</button>
}

export default BoringButton;