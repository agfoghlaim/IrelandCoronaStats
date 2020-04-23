import React from 'react';
import classes from './sectionWrap.module.css';
// import SectionSide from '../SectionSide/sectionSide';


const SectionWrap = ({ title, subtitle, children }) => (
  <div className={classes.sectionWrap}>
    {children}
  </div>
);

export default SectionWrap;
