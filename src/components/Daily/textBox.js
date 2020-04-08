import React from 'react';
import classes from './dailyText.module.css';
const TextBox = ({ todaysData }) => {

  const RightSpan = ({ text }) => {
    return <span className={classes.rightSpan}>{text}</span>;
  };

  return (
    <div className={classes.dailyTextItem} key={todaysData.Date} >
      <div className={classes.infoWrap}>
        <h3>{new Date(todaysData.Date).toLocaleString()} </h3>
      </div>
      <div className={classes.infoWrap}>
        <p>Confirmed Cases: </p>
        <RightSpan text={todaysData.ConfirmedCovidCases}></RightSpan>
      </div>
      <div className={classes.infoWrap}>
        <p>Total Confirmed Cases: </p>
        <RightSpan text={todaysData.TotalConfirmedCovidCases}></RightSpan>
      </div>
      <div className={classes.infoWrap}>
        <p>Deaths: </p>
        <RightSpan text={todaysData.ConfirmedCovidDeaths}></RightSpan>
      </div>
      <div className={classes.infoWrap}>
        <p>Total Deaths: </p>
        <RightSpan text={todaysData.TotalCovidDeaths}></RightSpan>
      </div>
      <div className={classes.infoWrap}>
        <p>Total Recovered: </p>
        <RightSpan text={todaysData.TotalCovidRecovered}></RightSpan>
      </div>
    </div>
  );
};

export default TextBox;
