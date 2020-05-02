import React, { useState } from 'react';
import classes from './textBox.module.css';

const TextBox = ({ data, avail }) => {
  // console.log(data, avail)
  const [availableData, setAvailableData] = useState(avail);
  // console.log("ProfileStats: ", data, avail)
  // because some are 'Date', some are 'StatisticsProfileDate'
  const getAttributeForDate = () => {
    return data.StatisticsProfileDate
      ? 'StatisticsProfileDate'
      : 'Date';
  };

  const attributeForDate = getAttributeForDate();

  const getTheDataOnSelectedDate = () => {
    const selected = availableData.filter((d) => d.selected);
    const onlyOnDate = selected.map((s) => {
      const newData = s.data.filter((d) => {
        return (
          d[attributeForDate] === data[attributeForDate]
        );
      });
      s.selectedData = newData;
      return s;
    });

    return onlyOnDate;
  };
  const withSelectedData = getTheDataOnSelectedDate();

  const getKeysValues = (data) => {
    return data.map((d) => {
      return {
        name: d.name,
        fieldName: d.fieldName,
        value: d.selectedData.map((w) => {
          return w[d.fieldName];
        })[0],
        color: d.color,
      };
    });
  };

  const moreManagableVersionOfSelectedData = getKeysValues(withSelectedData);

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
