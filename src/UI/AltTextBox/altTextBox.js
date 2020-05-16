import React from 'react';
import classes from './altTextBox.module.css';

/* Want prop like this: 
[
  {
    title: 'Confirmed Cases',
    fieldName: 'ConfirmedCovidCases',
    value: 100,
    xAxixAttribute
    color: 'var(--green)'
  }, ...
]

*/
const AltTextBox = ({ arrayToShowInTextBox, selectedDate }) => {
// console.log(arrayToShowInTextBox)
  const RightSpan = ({ text, color }) => {
    return (
      <span
        style={{
          background: `${color}`,
          color: `${color === 'var(--white)' ? 'var(--black)' : ''}`,
        }}
        className={classes.rightSpan}
      >
        {text}
      </span>
    );
  };

  return (
    <div className={classes.profileStatsTextBox}>
      <div className={classes.infoWrap}>
        <p>{new Date(selectedDate).toString().substring(0, 16)}</p>
      </div>
      {arrayToShowInTextBox.map((d, i) => {
        return (
          <div className={classes.infoWrap} key={i}>
            <p> {d.title} </p>
            <RightSpan color={d.color} text={d.value} />
          </div>
        );
      })}
    </div>
  );
};

export default AltTextBox;
