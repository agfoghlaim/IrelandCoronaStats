import React from 'react';
import classes from './sectionMain.module.css';

const SectionMain = ({ children, background }) => {
  return (
    <div
      style={{ background: `${background ? background : 'var(--midBlack)'}` }}
      className={classes.sectionMain}
    >
      {children}
    </div>
  );
};

export default SectionMain;
