import React from 'react';
import classes from './sectionSide.module.css';

const SectionSide = ({title, subtitle, children}) => {
  return(
    <div className={classes.sectionSideWrap}>
      <div className={classes.sectionHeader}>
        <h3>
          Title - {title} <br />
          <small>- counties subtitle {subtitle} </small>
        </h3>
      </div>
      {children}
    </div>
  )
}

export default SectionSide;