import React from 'react';
import classes from './dailyText.module.css';
import TextBox from './textBox';
const DailyText = ({ daily }) => {
  return (
    <div className={classes.dailyTextWrap}>
      <div className={classes.dailyTextItem}>
        <h2>Daily Cases</h2>
      </div>

      {daily.map((todaysData) => {
        return (
          <TextBox
            key={todaysData.attributes.Date}
            todaysData={todaysData.attributes}
          />
        );
      })}
    </div>
  );
};

export default DailyText;
