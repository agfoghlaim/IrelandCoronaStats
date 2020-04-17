import React, {useState} from 'react';
import classes from './textBox.module.css';


/*
Data is from here: https://services1.arcgis.com/eNO7HHeQ3rUcBllm/arcgis/rest/services/Covid19CountyStatisticsHPSCIrelandOpenData/FeatureServer/0/query?where=CountyName=%27Clare%27&1%3D1&outFields=*&f=json

This had been returning res.data.features.length === 0 with the latest info for one county only. 

16/04/2020, it's now returning all info for one county only. I'm going to leave it and filter out the latest info.

I've switched uris in counties.js and it's now working BUT they have also changed the fieldNames in data.features.attributes. ConfirmedCovidCases is now CovidCases(Int) &&CovidCaseroundUp(String).

AND FURTHERMORE!!! there is no date/time/timestamp

the original endpoint - `https://services1.arcgis.com/eNO7HHeQ3rUcBllm/arcgis/rest/services/Covid19CountyStatisticsHPSCIrelandOpenData/FeatureServer/0/query?where=CountyName=%27${county}%27&1%3D1&outFields=*&f=json` 

still has the TimeStampDate field so will have to use that, filter out the latest entry.
*/


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

