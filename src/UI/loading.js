import React from 'react';
import classes from './loading.module.css';
const LoadingComp = ({ msg }) => (
  <div className={classes.loader}>{msg}</div>
  // <p
  //   style={{
  //     color: 'white',
  //     background: 'var(--purple)',
  //     padding: '1rem',
  //     borderRadius: '0.4rem',
  //     lineHeight:'1rem',
 
  //   }}
  // >
  //   {msg}
  // </p>
);

export default LoadingComp;
