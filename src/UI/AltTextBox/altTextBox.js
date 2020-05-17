import React from 'react';
import classes from './altTextBox.module.css';

const AltTextBox = ({
  arrayToShowInTextBox,
  selectedDate,
  numAvailableAttrs,
}) => {

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
    <div
      className={classes.profileStatsTextBox}
      // Initial height of box needs to be ok to fit all possible '.infoWraps' so there's no jumping around the page when things are selected. grid-gap on parent is 0.4rem, h4 = 2rem
      style={{
        minHeight: `${
          (numAvailableAttrs + 2) * 2 + (numAvailableAttrs + 2) * 0.4
        }rem`,
      }}
    >
      <div className={classes.infoWrap}>
        <h4>{new Date(selectedDate).toString().substring(0, 16)}</h4>
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
