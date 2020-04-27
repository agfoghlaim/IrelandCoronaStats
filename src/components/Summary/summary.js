import React, { useEffect, useState } from 'react';
import classes from './summary.module.css';

const Summary = ({ stats }) => {
  const getLastestDailyStats = (data) => {
    const datesOnly = data.map((d) => d.attributes.Date);

    const newestDate = Math.max(...datesOnly);

    const ans = data.filter((d) => d.attributes.Date === newestDate);

    return ans[0];
  };

  const [latest, setLatest] = useState();

  useEffect(() => {
    if (stats.length) {
      const latestDailyStats = getLastestDailyStats(stats);
      setLatest(latestDailyStats.attributes);
   
    }
  }, [stats]);

  return (
    <section class="globalSectionWrap lightBlackBackground">
      {latest ? (
        <div className={classes.summaryWrap}>
          <div className={classes.sectionHeading}>
            <h2>
              Last Updated {new Date(latest.Date).toString().substring(0, 15)}
            </h2>
            <p>
              <small>
                The graphs below are based on data from data.gov.ie, available{' '}
                <a
                  href="https://opendata-geohive.hub.arcgis.com/datasets/d8eb52d56273413b84b0187a4e9117be_0/data?geometry=-7.694%2C53.288%2C-7.691%2C53.289"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  here
                </a>
                . It is updated every evening, with the latest record reporting
                the counts recorded at 1pm the same day.
              </small>
            </p>
          </div>
          <div className={classes.summaryInfoWrap}>
            <div className={classes.summaryBox}>
              <h3>
                {latest.TotalConfirmedCovidCases} (+
                {latest.ConfirmedCovidCases})
              </h3>
              <h4>Total Confirmed Cases</h4>
              <p><p>
                (
                {new Date(latest.Date)
                  .toString()
                  .substring(0, 15)}
                )
              </p></p>
            </div>
            <div className={classes.summaryBox}>
              <h3>
                {' '}
                {latest.TotalCovidDeaths} (+
                {latest.ConfirmedCovidDeaths})
              </h3>
              <h4>Total Deaths</h4>
              <p><p>
                (
                {new Date(latest.Date)
                  .toString()
                  .substring(0, 15)}
                )
              </p></p>
            </div>
            <div className={classes.summaryBox}>
              <h3> {latest.HospitalisedCovidCases} </h3>
              <h4>Total Hosipialised</h4>
              <p>
                (
                {new Date(latest.StatisticsProfileDate)
                  .toString()
                  .substring(0, 15)}
                )
              </p>
            </div>
    
            <div className={classes.summaryBox}>
              <h3> {latest.RequiringICUCovidCases} </h3>
              <h4>Total Requiring ICU</h4>
              <p>
                (
                {new Date(latest.StatisticsProfileDate)
                  .toString()
                  .substring(0, 15)}
                )
              </p>
            </div>
          </div>
        </div>
      ) : (
        '  Loading...'
      )}
    </section>
  );
};

export default Summary;
