import React from 'react';
import classes from './textBox.module.css';


const TextBox = ({data}) => {

  const RightSpan = ({ text }) => {
    return <span className={classes.rightSpan}>{text}</span>;
  };

  return data && data.length ? (
    <div
      className={classes.textItem}
    >
      <div className={classes.infoWrap}>
        <h3>{data[0].attributes.CountyName} <br/><span className={classes.small}>Updated: {new Date(data[0].attributes.TimeStampDate).toLocaleString()}</span></h3>
      </div>
  
      <div className={classes.infoWrap}>
        <p>Confirmed Cases: </p>
        <RightSpan text={data[0].attributes.ConfirmedCovidCases}></RightSpan>
      </div>
      <div className={classes.infoWrap}>
        <p>Population 2016: </p>
        <RightSpan text={data[0].attributes.PopulationCensus16}></RightSpan>
      </div>
      <div className={classes.infoWrap}>
        <p>Cases per 100,000: </p>
        <RightSpan text={(data[0].attributes.PopulationProportionCovidCases).toFixed(2)}></RightSpan>
      </div>

    </div>
  ) : (
    <div
    className={classes.textItem}>
      <div className={classes.infoWrap}>
        <h3> <br/><span className={classes.small}></span></h3>
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
        <RightSpan text={('')}></RightSpan>
      </div>
    ></div>
  );
};

export default TextBox;

