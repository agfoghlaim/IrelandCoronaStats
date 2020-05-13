import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import classes from './summary.module.css';
import SectionWrapper from '../../UI/Sections/SectionWrapper/sectionWrapper';
import SummaryBox from './summaryBox';
import ErrorComp from '../../UI/error';
import LoadingComp from '../../UI/loading';
import { sharedUtil } from '../../util-functions';
import { SUMMARY } from '../../constants';

const Summary = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [niceStats, setNiceStats] = useState([]);
  const [latest, setLatest] = useState();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const data = await getDailyStats();
        const niceData = sharedUtil.removeFromNestedAttributes(data);
        setNiceStats(niceData);
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
        setIsError(true);
      }
    })();
  }, []);

  const getDailyStats = useCallback(async () => {
    try {
      const response = await axios.get(SUMMARY.dailyStatsSoFarUrl);
      return response.data.features;
    } catch (e) {
      setIsLoading(false);
      setIsError(true);
    }
  }, []);
 
  useEffect(() => {
    if (niceStats.length) {
      const latestDailyStats = sharedUtil.getLatestDataOrDataOnSpecificDate(
        niceStats,
        false,
        'Date'
      );

      setLatest(latestDailyStats);
    }
  }, [niceStats]);


  return (
    <SectionWrapper>
      {isError ? (
        <ErrorComp msg="Could not load Summary." />
      ) : (
        <div className={classes.summaryWrap}>
          {latest && !isLoading ? (
            <>
              <div className={classes.summaryInfoWrap}>
                {SUMMARY.infoStats.map((info) => (
                  <SummaryBox
                    key={info.fieldName}
                    niceStats={niceStats}
                    fieldName={info.fieldName}
                    yesterdayFieldName={info.yesterdayFieldName}
                    latest={latest}
                    text={info.title}
                    shortTitle={info.shortTitle}
                    dateField={info.dateField}
                    svgLineFieldName={info.svgLineFieldName}
                  />
                ))}
              </div>
              <span
                style={{
                  color: 'var(--gray)',
                  fontSize: '0.7rem',
                  fontWeight: 'normal',
                }}
              >
                *Latest daily figures
                <br />
                Last Updated:{' '}
                {new Date(latest.Date).toString().substring(0, 15)}
              </span>
            </>
          ) : (
            <LoadingComp msg="Loading" />
          )}
        </div>
      )}
    </SectionWrapper>
  );
};

export default Summary;
