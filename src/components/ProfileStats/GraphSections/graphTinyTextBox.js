import React from 'react';
import classes from './graphTinyTextBox.module.css';

const GraphTinyTextBox = ({ data, attributeForBoxTitle  }) => {


  // This is DODGE, get attribute ('Date' or 'StatisticsProfileDate') to use
  const getAttributeForDate = () => {
   return data.attributes.StatisticsProfileDate ? 'StatisticsProfileDate' : 'Date';
  }
  const attributeForDate = getAttributeForDate();

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
          <h4>{attributeForBoxTitle}</h4>
        </div>
        {
          <>
            <div className={classes.infoWrap}>
              <p>{date(data.attributes[attributeForDate])}</p>
              <RightSpan text={data.attributes[attributeForBoxTitle]} />
            </div>
          </>
        }
      </div>

  );
};

export default GraphTinyTextBox;
