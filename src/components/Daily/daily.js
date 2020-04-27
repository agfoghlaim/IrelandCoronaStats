import React, { useState, useEffect, useCallback } from 'react';
import Layout from '../layout';
import axios from 'axios';
import LineChartGeneric from './lineChartGeneric';
import Summary from '../Summary/summary';
import ErrorComp from '../../UI/error';
import ExtraInfo from './ExtraInfo/extraInfo';
// import DailyAlt from '../DailyAlt/dailyAlt';
import Daily2 from '../Daily2/daily2';
// import configureDailyStore from '../DailyAlt/dailyAlt-store';

// configureDailyStore();
// TODO - check state, not all needed and badly named... dailyPercentageChange sent as data to graph
// %change / %change5days will be reusable
// uri with data that's being updated
const dailyStatsSoFarUrl = `https://services1.arcgis.com/eNO7HHeQ3rUcBllm/arcgis/rest/services/CovidStatisticsProfileHPSCIrelandOpenData/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json`;

const Daily = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [daily, setDaily] = useState([]);
  const [dailyPercentageChange, setDailyPercentageChange] = useState([]);
  const [fiveDayAverageChange, setFiveDayAverageChange] = useState([]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const data = await getDailyStats();
        setDaily(data);

        const dailyChange = calculatePercentageChangeOf(
          data,
          'ConfirmedCovidCases',
          'Date'
        );
        setDailyPercentageChange(dailyChange);

        const fiveDayAverage = calculateAverageOverTime(
          dailyChange,
          'percentageChange',
          5,
          'fiveDayAverage'
        );

        setFiveDayAverageChange(fiveDayAverage);

        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
        setIsError(true);
      }
    })();
  }, []);

  const getDailyStats = useCallback(async () => {
    try {
      const response = await axios.get(dailyStatsSoFarUrl);
      return response.data.features;
    } catch (e) {
      setIsLoading(false);
      setIsError(true);
    }
  }, []);

  const calculateAverageOverTime = (data, ofWhat, numDays, newKeyName) => {
    const appendNewArrayContainingDataToBeAveraged = (theData) => {
      theData.map((d, i) => {
        if (i >= numDays - 1) {
          d[newKeyName] = theData.slice(i - (numDays - 1), i + 1);
        } else {
          d[newKeyName] = null;
        }
        return d;
      });
      return theData;
    };

    const reduceNewArrayToSingleAverageNum = (theData) => {
      const ans = theData.map((d) => {
        // const oldArr = d[newKeyName];
        if (d[newKeyName] && d[newKeyName].length === numDays) {
          const added = d[newKeyName].reduce((acc, e) => {
            acc += e[ofWhat];
            return acc;
          }, 0);
          if (added && !isNaN(added)) {
            d[newKeyName] = added / numDays;
            // d.oldArr = oldArr;
          }
        }
        return d;
      });
    
      return ans;
    };

    const ans = [appendNewArrayContainingDataToBeAveraged, reduceNewArrayToSingleAverageNum].reduce(
      (data, fn) => fn(data),
      data
    );
  
    return ans;
  };

  const calculatePercentageChangeOf = (data, ofWhat, dateAttr) => {
    const ans = data.reduce((acc, d, i, data) => {
      const v2 = d.attributes[ofWhat];
      const date = new Date(d.attributes[dateAttr]);
      if (data[i - 1]) {
        // skip the first
        const v1 = data[i - 1].attributes[ofWhat];
        const change = v2 - v1;
        const percentageChange = Math.round((change * 100) / v1);

        // console.log(`(${todaysCases} - ${yesterdaysCases} * 100) / ${yesterdaysCases} = ${percentageChange}`)
        acc.push({
          percentageChange,
          todaysCases: v2,
          yesterdaysCases: v1,
          date,
          totalSoFar: d.attributes.TotalConfirmedCovidCases,
        });
      } else {
        acc.push({
          percentageChange: 0,
          todaysCases: v2,
          yesterdaysCases: 0,
          date,
          totalSoFar: d.attributes.TotalConfirmedCovidCases,
        });
      }
      return acc;
    }, []);
    return ans;
  };
  // const calculatePercentageChange = useCallback((data) => {
  //   const ans = data.reduce((acc, d, i, data) => {
  //     const todaysCases = d.attributes.ConfirmedCovidCases;
  //     const date = new Date(d.attributes.Date);
  //     if (data[i - 1]) {
  //       // skip the first
  //       const yesterdaysCases = data[i - 1].attributes.ConfirmedCovidCases;
  //       const change = todaysCases - yesterdaysCases;
  //       const percentageChange = Math.round((change * 100) / yesterdaysCases);

  //       // console.log(`(${todaysCases} - ${yesterdaysCases} * 100) / ${yesterdaysCases} = ${percentageChange}`)
  //       acc.push({
  //         percentageChange,
  //         todaysCases,
  //         yesterdaysCases,
  //         date,
  //         totalSoFar: d.attributes.TotalConfirmedCovidCases,
  //       });
  //     } else {
  //       acc.push({
  //         percentageChange: 0,
  //         todaysCases,
  //         yesterdaysCases: 0,
  //         date,
  //         totalSoFar: d.attributes.TotalConfirmedCovidCases,
  //       });
  //     }
  //     return acc;
  //   }, []);
  //   return ans;
  // });

  return (
    <Layout>
      {isError ? <ErrorComp msg="Could not load data." /> : null}
      {isLoading ? 'Loading' : null}
      {daily && daily.length && dailyPercentageChange.length && !isLoading ? (
        <>
          <Daily2 />
          {/* <DailyAlt /> */}
          <Summary stats={daily} />
          
          <LineChartGeneric
            dailyData={daily}
            dataToShow={dailyPercentageChange}
          />
          <ExtraInfo />
        </>
      ) : (
        'loading...'
      )}
    </Layout>
  );
};

export default Daily;
