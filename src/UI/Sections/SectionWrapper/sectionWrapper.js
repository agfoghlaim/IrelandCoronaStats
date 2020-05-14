import React from 'react';
import classes from './sectionWrapper.module.css';

const SectionWrapper = ({ children }) => (
  <section className={classes.sectionWrapper}>
    {children}
  </section>
);

export default SectionWrapper;
