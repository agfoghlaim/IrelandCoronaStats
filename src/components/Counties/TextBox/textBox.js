import React from 'react';
import classes from './textBox.module.css';

const TextBox = ({data}) => {

  // const data = props.data[0].attributes;
  const RightSpan = ({ text, loading }) => {
    return <span className={classes.rightSpan}>{text}</span>;
  };
  // console.log(data);
  return data && data.length ? (
    <div
      className={classes.textItem}
    >
      <div className={classes.infoWrap}>
        <h3>{data[0].attributes.CountyName} <br/><span className={classes.small}>{data[0].attributes.TimeStamp}</span></h3>
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

// CountyName: 'Sligo';
// PopulationCensus16: 65535;
// TimeStamp: '13/04/2020 12:00:00AM';
// IGEasting: 165130;
// IGNorthing: 323355;
// Lat: 54.1581;
// Long: -8.5345;
// UniqueGeographicIdentifier: 'http://data.geohive.ie/resource/county/2ae19629-1449-13a3-e055-000000000001';
// ConfirmedCovidCases: 62;
// PopulationProportionCovidCases;
