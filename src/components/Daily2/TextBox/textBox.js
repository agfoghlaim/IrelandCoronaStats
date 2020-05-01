import React, { useState } from 'react';
import classes from './textBox.module.css';

const TextBox = ({ dailyData }) => {
  const [daily] = useState(dailyData);

  const dailyWithTitle = () => {
    return daily.selectedAttributeNames.map((name) => {
      const title = daily.avail.filter((a) => a.fieldName === name)[0].name;
      const color = daily.avail.filter((a) => a.fieldName === name)[0].color;

      const ans = {};

      ans[name] = daily.selectedDateData[name];
      ans.color = color;
      ans.title = title;
      ans.fieldName = name;
      ans.info = daily.selectedDateData[name];

      return ans;
    });
  };

  const RightSpan = ({ text, fieldName, color }) => {
    let defaultColor = 'var(--blue)';

    if (color) defaultColor = color;
    return (
      <span
        style={{ background: `${defaultColor}` }}
        className={classes.rightSpan}
      >
        {text || ''}
      </span>
    );
  };

  const renderRightSpans = () => {
    const withTitle = dailyWithTitle();

    return withTitle.map((d) => {
      return (
        <div className={classes.infoWrap} key={d.fieldName}>
          <p>{d.title}: </p>
          <RightSpan
            text={d.info}
            color={d.color}
            fieldName={d.fieldName}
          ></RightSpan>
        </div>
      );
    });
  };

  return daily && daily.selectedDateData ? (
    <div className={classes.textItem}>
      <div className={classes.infoWrap}>
        <h3>
          {new Date(daily.selectedDateData.Date).toString().substring(0, 16)}
        </h3>
      </div>
      {renderRightSpans()}
    </div>
  ) : (
    <div className={classes.textItem}>
      <div className={classes.infoWrap}>
        <h3>
          <br />
          <span className={classes.small}></span>
        </h3>
      </div>
    </div>
  );
};

export default TextBox;
