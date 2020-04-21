import React, { useState, useEffect } from 'react';
import classes from './textBox.module.css';

import { useStore } from '../../../Store/store';

const TextBox = () => {
  // const testDispatch = useStore()[1];
  const everything = useStore()[0].sections[0];

  // default
  const [latestToUse, setLatestToUse] = useState(everything.allCounties[0]);

  useEffect(() => {
    if (everything.newSelectedCounty.stats) {
      const getLatest = () => {
        const dates = everything.newSelectedCounty.stats.map((s) => s.TimeStamp);
        const newestDate = Math.max(...dates.map(d=>d));

        const newestData = everything.newSelectedCounty.stats.filter(s=>s.TimeStamp===newestDate)

        return newestData;
      };
      const newestDataForSelectedCounty = getLatest();
     setLatestToUse(newestDataForSelectedCounty[0]);
    } 
  });

  const RightSpan = ({ text, fieldName }) => {
    let color = 'var(--blue)';
      return (
        <span style={{ background: `${color}` }} className={classes.rightSpan}>
          {text || ''}
        </span>
      );
  };

  return latestToUse ? (
    <div className={classes.textItem}>
      <div className={classes.infoWrap}>
        <h3>
          {latestToUse.CountyName} <br />
          <span className={classes.small}>
            Updated: {new Date(latestToUse.TimeStamp).toLocaleString()}
          </span>
        </h3>
      </div>
      <div className={classes.infoWrap}>
        <p>Confirmed Cases: </p>
        <RightSpan
          text={latestToUse.ConfirmedCovidCases}
          fieldName="ConfirmedCovidCases"
        ></RightSpan>
      </div>
      <div className={classes.infoWrap}>
        <p>Population 2016: </p>
        <RightSpan
          text={latestToUse.PopulationCensus16}
          fieldName="PopulationCensus16"
        ></RightSpan>
      </div>
      <div className={classes.infoWrap}>
        <p>Cases per 100,000: </p>
        <RightSpan
          text={latestToUse.PopulationProportionCovidCases ? latestToUse.PopulationProportionCovidCases.toFixed(2) : ''}
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
