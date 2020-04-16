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
    if (stats.length) {
      const latestDailyStats = getLastestDailyStats(stats);
      setLatest(latestDailyStats.attributes);
    }
  }, [stats]);

  return (
    <>
      <div className={classes.summarySectionWrap}>
        {latest ? (
          <div className={classes.summaryWrap}>
            <div className={classes.sectionHeading}>
              <h2>{new Date(latest.Date).toString().substring(0, 15)}</h2>
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
                  . It is updated every evening, with the latest record
                  reporting the counts recorded at 1pm the same day.
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
      <div className={classes.summarySectionWrap}>
        {latest ? (
          <div className={classes.summaryWrap}>
            <p>
              <small>
                Note that from April 10th 2020 not all confirmed cases are
                included in the 'Daily Cases' or 'Percentage Change' figures.
                Cases not included represent tests that were sent to Germany for
                analysis. All confirmed cases{' '}
                <strong>
                  <em>are</em>
                </strong>{' '}
                included in 'Total Confirmed Cases'.
              </small>
            </p>
            <p>
              <small>
                Though most of these extra cases seem to be old, it is not
                exactly clear when they should be backdated to in the 'Daily
                Cases' or 'Percentage Change' data. See below for more
                information taken from gov.ie
              </small>
            </p>
            <p>
              <a
                href="https://www.gov.ie/en/news/7e0924-latest-updates-on-covid-19-coronavirus/#april-10"
                rel="noopener noreferrer"
                target="_blank"
              >
                April 10th
              </a>

              <blockquote>
                <small>
                  "... Including test results which have been sent to Germany
                  for testing (which may include tests from older cases) the
                  total figure of those who have been diagnosed with COVID-19 in
                  Ireland now stands at 8,089."
                </small>
              </blockquote>
            </p>
            <p>
              <a
                href="https://www.gov.ie/en/news/7e0924-latest-updates-on-covid-19-coronavirus/#april-11"
                rel="noopener noreferrer"
                target="_blank"
              >
                April 11th
              </a>

              <blockquote>
                <small>
                  "... an additional 286 confirmed cases of COVID-19 reported by
                  a laboratory in Germany (which reflect cases from weeks ago)"
                </small>
              </blockquote>
            </p>

            <p>
              <a
                href="https://www.gov.ie/en/news/7e0924-latest-updates-on-covid-19-coronavirus/#april-12"
                rel="noopener noreferrer"
                target="_blank"
              >
                April 12th
              </a>

              <blockquote>
                <small>
                  "... an additional 297 confirmed cases of COVID-19 reported by
                  a laboratory in Germany (these represent samples taken weeks
                  ago)"
                </small>
              </blockquote>
            </p>
            <p>
              <a
                href="https://www.gov.ie/en/news/7e0924-latest-updates-on-covid-19-coronavirus/#april-13"
                rel="noopener noreferrer"
                target="_blank"
              >
                April 13th
              </a>

              <blockquote>
                <small>
                  "... 465 confirmed cases of COVID-19 reported by a laboratory
                  in Germany"
                </small>
              </blockquote>
            </p>
            <p>
              <a
                href="https://www.gov.ie/en/news/7e0924-latest-updates-on-covid-19-coronavirus/#april-14"
                rel="noopener noreferrer"
                target="_blank"
              >
                April 14th
              </a>

              <blockquote>
                <small>
                  "... an additional 284 confirmed cases of COVID-19 reported by
                  a laboratory in Germany"
                </small>
              </blockquote>
            </p>
            <p>
              <a
                href="https://www.gov.ie/en/news/7e0924-latest-updates-on-covid-19-coronavirus/#april-15"
                rel="noopener noreferrer"
                target="_blank"
              >
                April 15th
              </a>
              <blockquote>
                <small>
                  "... 677 additional cases have been confirmed in Ireland as
                  well as 411 old tested in Germany (which are older cases)"
                </small>
              </blockquote>
            </p>
          </div>
        ) : (
          '  Loading...'
        )}
      </div>
    </>
  );
};

export default Summary;
