import React from 'react';
import classes from './dailyText.module.css';
const HoverTextBox = ({ todaysData, show }) => {

  const RightSpan = ({ text }) => {
    return <span className={classes.rightSpan}>{text}</span>;
  };
  const calcSinceYesterday = () => {
    const diff = todaysData.todaysCases - todaysData.yesterdaysCases;
    return (diff > 0) ? `+${diff}` : diff; 
  }

  const formatPercentageChange = () => {
    return (todaysData.percentageChange > 0) ? `+${todaysData.percentageChange}%` : `${todaysData.percentageChange}%`
  }
  return (
    <div className={classes.dailyTextItem} key={todaysData.date} >
      <div className={classes.infoWrap}>
        <h3>{new Date(todaysData.date).toString().substring(0,10)} </h3>
      </div>
      <div className={classes.infoWrap}>
        <p>New Cases: </p>
        <RightSpan text={todaysData.todaysCases}></RightSpan>
      </div>
      <div className={classes.infoWrap}>
        <p>Since Pervious Day: </p>
        <RightSpan text={calcSinceYesterday()}></RightSpan>
      </div>
      <div className={classes.infoWrap}>
        <p>Percentage Change: </p>
        <RightSpan text={formatPercentageChange()}></RightSpan>
      </div>
      <div className={classes.infoWrap}>
        <p>Total Confirmed Cases: </p>
        <RightSpan text={todaysData.totalSoFar}></RightSpan>
      </div>
  
    </div>
  );
  
};

export default HoverTextBox;
