import React from 'react';
import classes from './textBox.module.css';

// This is a mess, was trying to make it work like the Daily2 textbox but sure it's grand
const TextBox = ({ data, selectedDateData, AselectedDate,  tryThisSelectedAttributeNames, xAxisAttribute,  availableData }) => {

  // because some are 'Date', some are 'StatisticsProfileDate'... only 'Daily' section uses 'Date'. TODO remove Daily section (it doesn't need to be repeated on stats page) and always use 'StatisticsProfileDate'
  const getAttributeForDate = () => {
    return data.StatisticsProfileDate
      ? 'StatisticsProfileDate'
      : 'Date';
  };

  const attributeForDate = getAttributeForDate();

  const getKeysValues = (data) => {
    return data.map((d) => {
      return {
        name: d.name,
        fieldName: d.fieldName,
        value: d.selectedData.map((w) => {
          return w[d.fieldName];
        })[0],
        color: d.color,
        xAxisAttribute: d.xAxisAttribute
       
      };
    });
  };

  const moreManagableVersionOfSelectedData = getKeysValues(selectedDateData);

  const RightSpan = ({ text, color }) => {
    return (
      <span style={{ background: `${color}` }} className={classes.rightSpan}>
        {text}
      </span>
    );
  };

  return (
    <div className={classes.genericTextItem}>
      <div className={classes.infoWrap}>
        <h3>
          {new Date(data[attributeForDate])
            .toString()
            .substring(0, 24)}
        </h3>
      </div>
      {moreManagableVersionOfSelectedData
        ? moreManagableVersionOfSelectedData.map((d, i) => {
            return (
              <div className={classes.infoWrap} key={i}>
                <p> {d.name}</p>
                <RightSpan color={d.color} text={d.value} />
              </div>
            );
          })
        : null}
    </div>
  );
};

export default TextBox;
