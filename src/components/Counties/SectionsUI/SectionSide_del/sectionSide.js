import React from 'react';
import classes from './sectionSide.module.css';

const SectionSide = ({title, subtitle, children}) => {
  return(
    <div className={classes.sectionSideWrap}>
      <div className={classes.sectionHeader}>
        <h3>
          {title} <br />
          <small>{subtitle} </small>
        </h3>
      </div>
      {children}
    </div>
  )
}

export default SectionSide;