import React from 'react';
import classes from './textBox.module.css';
import LoadingComp from '../../../UI/loading';

const getKeysValues = (data) => {

  return data.map((d) => {
    return {
      name: d.name,
      fieldName: d.fieldName,
      value: d.selectedData.map((w) => {
        return w[d.fieldName];
      })[0],
      color: d.color,
      xAxisAttribute: d.xAxisAttribute,
    };
  });
};

const TextBox = ({
  selectedDateData,
  selectedDate,
  isLoading,
  numAvailableAttrs,
}) => {

  // console.log("selectedDate", selectedDate);
  // console.log("numAvailableAttrs", numAvailableAttrs);
 
  const moreManagableVersionOfSelectedData = getKeysValues(selectedDateData);

  const RightSpan = ({ text, color }) => {
    return (
      <span
        style={{
          background: `${color}`,
          color: `${color === 'var(--white)' ? 'var(--black)' : ''}`,
        }}
        className={classes.rightSpan}
      >
        {text}
      </span>
    );
  };

  return (
    <div
      className={classes.profileStatsTextBox}
      // Initial height of box needs to be ok to fit all possible '.infoWraps' so there's no jumping around the page when things are selected. Use numAvailableAttrs
      style={{ minHeight: `${(numAvailableAttrs + 1)*1.8}rem` }}
    >
      {isLoading ? (
        <LoadingComp msg="Loading..." />
      ) : (
        <>
          <div className={classes.infoWrap}>
            <h3>
              {selectedDate
                ? new Date(selectedDate).toString().substring(0, 16)
                : ''}
            </h3>
          </div>
          {moreManagableVersionOfSelectedData
            ? moreManagableVersionOfSelectedData.map((d, i) => {
                return (
                  <div className={classes.infoWrap} key={i}>
                    <p> {d.name} </p>
                    <RightSpan color={d.color} text={d.value} />
                  </div>
                );
              })
            : null}
        </>
      )}
    </div>
  );
};

export default TextBox;
