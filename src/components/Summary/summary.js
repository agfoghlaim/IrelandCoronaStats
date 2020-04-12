// See here https://opendata-geohive.hub.arcgis.com/datasets/d8eb52d56273413b84b0187a4e9117be_0

import React, { useEffect, useState } from 'react';
import classes from './summary.module.css';
import axios from 'axios';
import * as d3 from 'd3';
import Layout from '../layout';

// independent, think profile stats will just show stuff
const Summary = ({ stats }) => {
  const url = `https://services1.arcgis.com/eNO7HHeQ3rUcBllm/arcgis/rest/services/CovidStatisticsProfileHPSCIrelandOpenData/FeatureServer/0/query?where=1%3D1&outFields=Date,ConfirmedCovidCases,TotalConfirmedCovidCases,ConfirmedCovidDeaths,TotalCovidDeaths,ConfirmedCovidRecovered,TotalCovidRecovered,FID&outSR=4326&f=json`;
  // console.log(stats)

  const getLastestDailyStats = (data) => {
    const datesOnly = data.map((d) => d.attributes.Date);

    const newestDate = Math.max(...datesOnly);

    const ans = data.filter((d) => d.attributes.Date === newestDate);

    return ans[0];
  };

  const [latest, setLatest] = useState();
  // const [isLoading, setIsLoading] = useState(false);
  // useEffect(() => {
  //   (async function getDailyStats() {
  //     setIsLoading(true);
  //     try {
  //       const response = await axios.get(url);
  //       const latestDailyStats = getLastestDailyStats(response.data.features);
  //       console.log(latestDailyStats);
  //       setLatest(latestDailyStats.attributes);
  //       setIsLoading(false);
  //     } catch (e) {
  //       setIsLoading(false);
  //     }
  //   })();
  // }, []);
  useEffect(() => {
    if(stats.length){
      const latestDailyStats = getLastestDailyStats(stats);
      setLatest(latestDailyStats.attributes);
    }

  }, [stats]);

  return (
    <div className={classes.summarySectionWrap}>
      {latest ? (
        <div className={classes.summaryWrap}>
          <div className={classes.sectionHeading}>
            <h2>{new Date(latest.Date).toString().substring(0, 15)}</h2>
            <p>
              <small>
                The Covid-19 Daily Statistics are updated on a daily basis, with
                the latest record reporting the counts recorded at 1pm the same
                day.
              </small>
            </p>
          </div>
          <div className={classes.summaryInfoWrap}>
            <div className={classes.summaryBox}>
              <h3>Total Confirmed Cases</h3>
              <p>
                {latest.TotalConfirmedCovidCases} (+
                {latest.ConfirmedCovidCases})
              </p>
            </div>
            <div className={classes.summaryBox}>
              <h3>Total Deaths</h3>
              <p>
                {latest.TotalCovidDeaths} (+
                {latest.ConfirmedCovidDeaths})
              </p>
            </div>
          </div>
        </div>
      ) : (
      '  Loading...'
      )}
    </div>
  );
};

export default Summary;
