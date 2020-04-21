import React from 'react';
import classes from './textBox.module.css';

const TextBox = ({ data, avail }) => {
  // console.log('Counties: ', data, avail);
  const RightSpan = ({ text, fieldName }) => {
    let color = 'var(--blue)';
    if (fieldName) {
      color = getColor(fieldName);
    }
    return (
      <span style={{ background: `${color}` }} className={classes.rightSpan}>
        {text}
      </span>
    );
  };

  const getColor = (fieldName) => {
    return avail.filter((a) => a.fieldName === fieldName)[0].color;
  };

  return data && data.length ? (
    <div className={classes.textItem}>
      <div className={classes.infoWrap}>
        <h3>
          {data[0].attributes.CountyName} <br />
          <span className={classes.small}>
            Updated:{' '}
            {new Date(data[0].attributes.TimeStampDate).toLocaleString()}
          </span>
        </h3>
      </div>
      <div className={classes.infoWrap}>
        <p>Confirmed Cases: </p>
        <RightSpan
          text={data[0].attributes.ConfirmedCovidCases}
          fieldName="ConfirmedCovidCases"
        ></RightSpan>
      </div>
      <div className={classes.infoWrap}>
        <p>Population 2016: </p>
        <RightSpan
          text={data[0].attributes.PopulationCensus16}
          fieldName="PopulationCensus16"
        ></RightSpan>
      </div>
      <div className={classes.infoWrap}>
        <p>Cases per 100,000: </p>
        <RightSpan
          text={data[0].attributes.PopulationProportionCovidCases.toFixed(2)}
          fieldName="PopulationProportionCovidCases"
        ></RightSpan>
      </div>
    </div>
  ) : (
    <div className={classes.textItem}>
      <div className={classes.infoWrap}>
        <h3>
          {' '}
          <br />
          <span className={classes.small}></span>
        </h3>
      </div>
      <div className={classes.infoWrap}>
        <p>Confirmed Cases: </p>
        <RightSpan text={''}></RightSpan>
      </div>
      <div className={classes.infoWrap}>
        <p>Population 2016: </p>
        <RightSpan text={''}></RightSpan>
      </div>
      <div className={classes.infoWrap}>
        <p>Cases per 100,000: </p>
        <RightSpan text={''}></RightSpan>
      </div>
      >
    </div>
  );
};

export default TextBox;
