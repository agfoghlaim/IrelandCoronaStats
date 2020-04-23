import React from 'react';
import classes from './textBox.module.css';
import { useStore } from '../../../Store/store';

const TextBox = () => {

  const storeSections = useStore()[0].sections[0]
  const selectedCountyLatestData = storeSections.selectedCountyLatestData;


  const RightSpan = ({ text, fieldName }) => {
    let color = 'var(--blue)';
 
      return (
        <span style={{ background: `${color}` }} className={classes.rightSpan}>
          {text || ''}
        </span>
      );
  };

  return selectedCountyLatestData ? (
    <div className={classes.textItem}>
      <div className={classes.infoWrap}>
        <h3>
          {selectedCountyLatestData.CountyName} <br />
          <span className={classes.small}>
            Updated: {new Date(selectedCountyLatestData.TimeStamp).toLocaleString()}
          </span>
        </h3>
      </div>
      <div className={classes.infoWrap}>
        <p>Confirmed Cases: </p>
        <RightSpan
          text={selectedCountyLatestData.ConfirmedCovidCases}
          fieldName="ConfirmedCovidCases"
        ></RightSpan>
      </div>
      <div className={classes.infoWrap}>
        <p>Population 2016: </p>
        <RightSpan
          text={selectedCountyLatestData.PopulationCensus16}
          fieldName="PopulationCensus16"
        ></RightSpan>
      </div>
      <div className={classes.infoWrap}>
        <p>Cases per 100,000: </p>
        <RightSpan
          text={selectedCountyLatestData.PopulationProportionCovidCases ? selectedCountyLatestData.PopulationProportionCovidCases.toFixed(2) : ''}
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
