import React from 'react';
import classes from './clickArrows.module.css';
import CtrlSvg from '../../../img/ctrlSvg';

const ClickArrows = ({
  handleSelectDate,
  selectedDate,
  tempJustDates,
  setIsPlaying,
  isPlaying,
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

  // const controls = [
  //   {name: 'back', color: 'var(--yellow)', height: '1rem', aria: 'Back one' },
  //   {name: 'forward', color: 'var(--yellow)', height: '1rem', aria: 'Forward one' },
  //   {name: 'beginning', color: 'var(--yellow)', height: '1rem', aria: 'Back to beginning' },
  //   {name: 'end', color: 'var(--yellow)', height: '1rem', aria: 'Skip to end' },
  //   {name: 'play', color: 'var(--yellow)', height: '2rem', aria: 'Play' },
  //   {name: 'stop', color: 'var(--yellow)', height: '2rem', aria: 'Stop' },
  // ]


  return (
    <div className={classes.clickArrowsWrap}>
      <span className={classes.dateSpan}>
        {new Date(selectedDate).toString().substring(0, 16)}
      </span>
      <div className={classes.clickArrows}>
        <button onClick={() => localHandleBackToStart()}>
          <span role="img" aria-label="back to start">
            <CtrlSvg ctrlType="beginning" color="var(--yellow)" height="1rem" />
          </span>
        </button>
        <button onClick={() => localHandleSelectDate(false)}>
          <span role="img" aria-label="back one">
            <CtrlSvg ctrlType="back" color="var(--yellow)" height="1rem" />
          </span>
        </button>
        <button
          // style={{ fontSize: '2rem' }}
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? (
            <span>
              <CtrlSvg ctrlType="stop" color="var(--yellow)" height="2rem" />
            </span>
          ) : (
            <span role="img" aria-label="play">
              <CtrlSvg ctrlType="play" color="var(--yellow)" height="2rem" />
            </span>
          )}
        </button>
        <button onClick={() => localHandleSelectDate(true)}>
          <span role="img" aria-label="forward one">
            <CtrlSvg ctrlType="forward" color="var(--yellow)" height="1rem" />
          </span>
        </button>
        <button onClick={() => localHandleToLastDate()}>
          <span role="img" aria-label="to end">
            <CtrlSvg ctrlType="end" color="var(--yellow)" height="1rem" />
          </span>
        </button>
      </div>
    </div>
  );
};

export default ClickArrows;
