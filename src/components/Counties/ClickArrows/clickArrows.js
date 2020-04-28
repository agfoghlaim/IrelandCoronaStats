import React from 'react';
import classes from './clickArrows.module.css';

const ClickArrows = ({ handleSelectDate, selectedDate, tempJustDates }) => {
  const localHandleSelectDate = (isNext) => {
    const indexer = (i) => (isNext ? i + 1 : i - 1);
    const selectedIndex = tempJustDates.indexOf(selectedDate);
    const ans = tempJustDates[indexer(selectedIndex)];
    const nextPrevDate = ans ? ans : selectedDate;

    if (nextPrevDate === selectedDate) return;

    handleSelectDate(nextPrevDate);
  };

  return (
    <div className={classes.clickArrowsWrap}>
      <h6>{new Date(selectedDate).toString().substring(0, 16)}</h6>
      <div className={classes.clickArrows}>
        <button onClick={() => localHandleSelectDate(false)}>
          {' '}
          &#11207; prev
        </button>
        <button onClick={() => localHandleSelectDate(true)}>
          next &#11208;
        </button>
      </div>
    </div>
  );
};

export default ClickArrows;
