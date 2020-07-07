import React from 'react';
import classes from './textBox.module.css';
import { useStore } from '../../../Store/store';

const TextBox = () => {
  const storeSections = useStore()[0].sections[0];

  const selectedCountyDataForSelectedDate =
    storeSections.selectedCountyDataForSelectedDate;

  const RightSpan = (props) => {
    const { text, fieldName } = props;
    const getColor = (name) => {
      const attr = storeSections.avail.filter((s) => {
        return s.fieldName === name;
      })[0];
      if (attr && attr.color) {
        return attr.color;
      } else {
        return false;
      }
    };

    let color = 'var(--blue)';
    let attrColor = getColor(fieldName);
    if (attrColor) color = attrColor;

    return (
      <span style={{ background: `${color}` }} className={classes.rightSpan}>
        {text || ''}
      </span>
    );
  };

  return selectedCountyDataForSelectedDate ? (
    <div className={classes.textItem}>
      <div className={classes.infoWrap}>
        <h3>
          {selectedCountyDataForSelectedDate.CountyName} <br />
          <span className={classes.small}>
            {new Date(
              selectedCountyDataForSelectedDate[storeSections.xAxisAttribute]
            )
              .toString()
              .substring(0, 16)}
          </span>
        </h3>
      </div>
      <div className={classes.infoWrap}>
        <p>Confirmed Cases: </p>
        <RightSpan
          text={selectedCountyDataForSelectedDate.ConfirmedCovidCases}
          fieldName="ConfirmedCovidCases"
        ></RightSpan>
      </div>
      <div className={classes.infoWrap}>
        <p>Population 2016: </p>
        <RightSpan
          text={selectedCountyDataForSelectedDate.PopulationCensus16}
          fieldName="PopulationCensus16"
        ></RightSpan>
      </div>
      <div className={classes.infoWrap}>
        <p>Cases per 100,000: </p>
        <RightSpan
          text={
            selectedCountyDataForSelectedDate.PopulationProportionCovidCases
              ? selectedCountyDataForSelectedDate.PopulationProportionCovidCases.toFixed(
                  2
                )
              : ''
          }
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
