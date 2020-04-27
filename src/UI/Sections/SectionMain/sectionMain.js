import React from 'react';
import classes from './sectionMain.module.css';

const SectionMain = ({ children }) => {
  return <div className={classes.sectionMain}>{children}</div>;
};

export default SectionMain;
