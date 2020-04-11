import React from 'react';
import classes from './graphTinyTextBox.module.css';

const GraphTinyTextBox = ({ data, attributeForBoxTitle }) => {
  const RightSpan = ({ text }) => {
    return <span className={classes.rightSpan}>{text}</span>;
  };

  const date = (d) => {
    const theDate = new Date(d).toString().substring(0, 10);
    return theDate;
  };
  return (
    <div className={classes.tinyTextBoxWrap}>
      <div className={classes.genericTextItem}>
        <div className={classes.infoWrap}>
          <h4>{attributeForBoxTitle}</h4>
        </div>
        {
          <>
            <div className={classes.infoWrap}>
              <p>{date(data.attributes['StatisticsProfileDate'])}</p>
              <RightSpan text={data.attributes[attributeForBoxTitle]} />
            </div>
          </>
        }
      </div>
    </div>
  );
};

export default GraphTinyTextBox;
