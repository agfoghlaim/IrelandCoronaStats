// opendata.gov info: https://opendata-geohive.hub.arcgis.com/datasets/58f883d6f4054574a1a885acd847bd51_0/data


// Doesn't look  like they're updating this data, see component ProfileStats instead and probably delete.
import React, { useState, useEffect, useCallback } from 'react';
import Layout from '../layout';
import axios from 'axios';
import DailyText from './dailyText';
import LineChartGeneric from './lineChartGeneric';
// import DailyChart2 from './dailyChart2_del';

// TODO - error handling is dodge.
const dailyStatsSoFarUrl = `https://services1.arcgis.com/eNO7HHeQ3rUcBllm/arcgis/rest/services/CovidDailyStatisticsHPSCIreland/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json`;


const Daily = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [daily, setDaily] = useState([]);
  const [dailyPercentageChange, setDailyPercentageChange] = useState([]);


  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const data = await getDailyStats();
        setDaily(data);
        const change = calculatePercentageChange(data);
        setDailyPercentageChange(change);

        setIsLoading(false);
      } catch (e) {
        // console.log(e);
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

  const renderError = () =>(
    <h4 style={{color: 'var(--purple)'}}>Couldn't load data.</h4>
  )

  const calculatePercentageChange = useCallback((data) => {
    const ans = data.reduce((acc, d, i, data) => {
      const todaysCases = d.attributes.ConfirmedCovidCases;
      const date = new Date(d.attributes.Date);
      if (data[i - 1]) {
        // skip the first
        const yesterdaysCases = data[i - 1].attributes.ConfirmedCovidCases;
        const change = todaysCases - yesterdaysCases;
        const percentageChange = Math.round((change * 100) / yesterdaysCases);
 
        // console.log(`(${todaysCases} - ${yesterdaysCases} * 100) / ${yesterdaysCases} = ${percentageChange}`)
        acc.push({
          percentageChange,
          todaysCases,
          yesterdaysCases,
          date,
          totalSoFar: d.attributes.TotalConfirmedCovidCases,
        });
      } else {
        acc.push({
          percentageChange: 0,
          todaysCases,
          yesterdaysCases: 0,
          date,
          totalSoFar: d.attributes.TotalConfirmedCovidCases,
        });
      }
      return acc;
    }, []);
    return ans;

  });

  return (
    <Layout>
      {isError ? renderError() : null}
      {isLoading ? 'Loading' : null}
      {daily && daily.length && dailyPercentageChange.length && !isLoading ? (
        <>
          {/* <DailyChart2 dailyData={daily} /> */}
          <DailyText daily={daily}/>
          <LineChartGeneric dataToShow={dailyPercentageChange} />

        </>
      ) : (
        'loading...'
      )}
      
    </Layout>
  );
};

export default Daily;
