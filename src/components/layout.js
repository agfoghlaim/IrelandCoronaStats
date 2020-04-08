import React from 'react';
import classes from './layout.module.css';

const layout = ({ children }) => {
  return <div className={classes.pageWrap}>{children}</div>;
};

export default layout;
