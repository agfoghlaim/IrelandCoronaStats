import React from 'react';
import classes from './sectionHeader.module.css';

const SectionHeader = ({ title, subtitle, description, children }) => (
  <div className={classes.sectionHeader}>
    <h3>
      {title} <br />
      <small>{subtitle} </small>
    </h3>
    <p>{description}</p>
    {children}
  </div>
);

export default SectionHeader;