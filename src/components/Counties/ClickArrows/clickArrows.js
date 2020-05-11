import React from 'react';
import classes from './clickArrows.module.css';

const ClickArrows = ({
  handleSelectDate,
  selectedDate,
  tempJustDates,
  setIsPlaying,
}) => {
  const localHandleSelectDate = (isNext) => {
    const indexer = (i) => (isNext ? i + 1 : i - 1);
    const selectedIndex = tempJustDates.indexOf(selectedDate);
    const ans = tempJustDates[indexer(selectedIndex)];
    const nextPrevDate = ans ? ans : selectedDate;

    if (nextPrevDate === selectedDate) return;

    handleSelectDate(nextPrevDate);
  };

  const localHandleBackToStart = () => {
    const earliestDate = Math.min(...tempJustDates.map((d) => d));
    handleSelectDate(earliestDate);
  };

  const localHandleToLastDate = () => {
    const latestDate = Math.max(...tempJustDates.map((d) => d));
    handleSelectDate(latestDate);
  };

  return (
    <div className={classes.clickArrowsWrap}>
      <h5>{new Date(selectedDate).toString().substring(0, 16)}</h5>
      <div className={classes.clickArrows}>
        <button onClick={() => localHandleBackToStart()}>
          <span role="img" aria-label="back to start">
            &#x23EE;&#xfe0e;
          </span>
        </button>
        <button onClick={() => localHandleSelectDate(false)}>
          <span role="img" aria-label="back one">
            {' '}
            &#x23EA;&#xfe0e;
          </span>
        </button>
        <button
          style={{ fontSize: '2rem' }}
          onClick={() => setIsPlaying(selectedDate)}
        >
          <span role="img" aria-label="play">
            &#x23F5;
          </span>
        </button>
        <button onClick={() => localHandleSelectDate(true)}>
          <span role="img" aria-label="forward one">
            &#x23e9;&#xfe0e;
          </span>
        </button>
        <button onClick={() => localHandleToLastDate()}>
          <span role="img" aria-label="to end">
            &#x23ED;&#xfe0e;
          </span>
        </button>
      </div>
    </div>
  );
};

export default ClickArrows;
