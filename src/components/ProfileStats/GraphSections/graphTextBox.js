import React from 'react';
import classes from './graphTextBox.module.css';

const GraphTextBox = ({ data, attributeForBoxTitle }) => {


  const RightSpan = ({ text }) => {

    return <span className={classes.rightSpan}>{text}</span>;
  };


  const date = (d) => {
    const theDate = new Date(d).toString().substring(0, 10);
    return theDate;
  };
  return (
 
    <div className={classes.genericTextItem}>
      <div className={classes.infoWrap}>
        <h3>{attributeForBoxTitle}</h3>
      </div>
      {
         data.map((d) => (
          <>
            <div className={classes.infoWrap}>
              <p>{date(d.attributes['StatisticsProfileDate'])}</p>
              <RightSpan text={d.attributes[attributeForBoxTitle]} />
            </div>
          </>
        ))
      }
    </div>
  )
};

export default GraphTextBox;
