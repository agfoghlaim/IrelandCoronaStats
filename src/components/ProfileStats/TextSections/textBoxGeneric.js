// Not really generic because of the date fields.

import React from 'react';
import classes from './textBoxGeneric.module.css';
const TextBoxGeneric = ({ data, attributeForBoxTitle }) => {

  const RightSpan = ({ text }) => {
    // if(text.name === 'StatisticsProfileDate') {
    //   return <span className={classes.rightSpan}>{new Date(text.value).toLocaleString('en-IE').substring(0,8)}</span>;
    // }
    return <span className={classes.rightSpan}>{text.value === null ? 'n/a' : text.value}</span>;
  };

  const doDate = (date) => (
    <div className={classes.infoWrap}>
      <h3>{new Date(date.value).toString().substring(0, 10)} </h3>
    </div>
  );

  return data.map((d) => (
    <>
      {d.name === attributeForBoxTitle ? (
        doDate(d)
      ) : (
        <div className={classes.infoWrap}>
          <p>{d.display}: </p>
          <RightSpan text={d}></RightSpan>
        </div>
      )}
    </>
  ));
};

export default TextBoxGeneric;
