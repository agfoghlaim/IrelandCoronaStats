import React, { useState } from 'react';
import classes from './textBox.module.css';

const TextBox = ({ data, attributeForBoxTitle, avail }) => {
  const [availableData, setAvailableData] = useState(avail);

  // because some are 'Date', some are 'StatisticsProfileDate'
  const getAttributeForDate = () => {
    return data.attributes.StatisticsProfileDate
      ? 'StatisticsProfileDate'
      : 'Date';
  };

  const attributeForDate = getAttributeForDate();

  const getTheDataOnSelectedDate = () => {
    const selected = availableData.filter((d) => d.selected);
    const onlyOnDate = selected.map((s) => {
      const newData = s.data.filter((d) => {
        return (
          d.attributes[attributeForDate] === data.attributes[attributeForDate]
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
          return w.attributes[d.fieldName];
        })[0],
      };
    });
  };

  const moreManagableVersionOfSelectedData = getKeysValues(withSelectedData);

  const RightSpan = ({ text }) => {
    return <span className={classes.rightSpan}>{text}</span>;
  };

  return (
    <div className={classes.genericTextItem}>
      <div className={classes.infoWrap}>
        <h3>
          {new Date(data.attributes[attributeForDate])
            .toString()
            .substring(0, 24)}
        </h3>
      </div>
      {moreManagableVersionOfSelectedData
        ? moreManagableVersionOfSelectedData.map((d) => {
            return (
              <>
                <div className={classes.infoWrap}>
                  <p> {d.name}</p>
                  <RightSpan text={d.value} />
                </div>
              </>
            );
          })
        : null}
    </div>
  );
};

export default TextBox;
