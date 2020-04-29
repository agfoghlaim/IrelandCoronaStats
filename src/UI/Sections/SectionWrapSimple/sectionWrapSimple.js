import React from 'react';
import classes from './sectionWrapSimple.module.css';


// offsetBottom to join with section underneath
const SectionWrapSimple = ({ children, offsetBottom }) => (
  <div style={{marginBottom: offsetBottom ? offsetBottom : '0'}} className={`${classes.sectionWrapSimple} ${offsetBottom ? classes.removeBottomOffset : ''}`}>
    {children}
  </div>
);

export default SectionWrapSimple;
