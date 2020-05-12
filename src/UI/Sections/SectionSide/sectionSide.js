import React from 'react';
import classes from './sectionSide.module.css';

const SectionSide = ({title, subtitle, description, children}) => {
  return(
    <div className={classes.sectionSideWrap}>

      {children}
    </div>
  )
}

export default SectionSide;