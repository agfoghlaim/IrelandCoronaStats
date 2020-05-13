import React from 'react';
import classes from './sectionWrapper.module.css';
// import SectionSide from '../SectionSide/sectionSide';


const SectionWrapper = ({ children }) => (
  <section className={classes.sectionWrapper}>
    {children}
  </section>
);

export default SectionWrapper;
