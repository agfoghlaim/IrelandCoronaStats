import React, {useState, useEffect} from 'react';
import classes from './textBox.module.css';

const TextBox = ({ data, avail, selectedCountyName }) => {

  const [whatever, setWhatever] = useState(data);
  const [latestToUse, setLatestToUse] = useState(null);

  //=========================================


  //change whatever, have to use newest data so will need to filter for newest data.selectedCounty

  //=====================================
  useEffect(()=>{
    setWhatever(data);
  },[data, selectedCountyName])

  useEffect(()=>{
  
    const getLatest = ()=> {
    
      const dates = whatever.selectedCounty.map(s=>s.TimeStamp);
 
      const newestDate = Math.max(...dates.map(d=>d));

      const newestData = whatever.selectedCounty.filter(s=>s.TimeStamp===newestDate)

      return newestData;
    }
    const newestDataForSelectedCounty = getLatest();

    setLatestToUse(newestDataForSelectedCounty[0]);
 
  }, [whatever, selectedCountyName])
  const RightSpan = ({ text, fieldName }) => {
    let color = 'var(--blue)';
    // if (fieldName) {
    //   color = getColor(fieldName);
    // }
    return (
      <span style={{ background: `${color}` }} className={classes.rightSpan}>
        {text}
      </span>
    );
  };

  const getColor = (fieldName) => {
    return avail.filter((a) => a.fieldName === fieldName)[0].color;
  };

  return latestToUse ? (
    <div className={classes.textItem}>
      <div className={classes.infoWrap}>
        <h3>
          {latestToUse.CountyName} <br />
          <span className={classes.small}>
            Updated:{' '}
            {new Date(latestToUse.TimeStamp).toLocaleString()}
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
  
          text={latestToUse.PopulationProportionCovidCases.toFixed(2)}
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
