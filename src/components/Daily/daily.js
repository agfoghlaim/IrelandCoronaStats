import React, { useState, useEffect, useCallback } from 'react';
import Layout from '../layout';
import axios from 'axios';
import LineChartGeneric from './lineChartGeneric';
import Summary from '../Summary/summary';
import ErrorComp from '../../UI/error';
import ExtraInfo from './ExtraInfo/extraInfo';


// uri with data that's being updated
const dailyStatsSoFarUrl = `https://services1.arcgis.com/eNO7HHeQ3rUcBllm/arcgis/rest/services/CovidStatisticsProfileHPSCIrelandOpenData/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json`;

const Daily = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [daily, setDaily] = useState([]);
  const [dailyPercentageChange, setDailyPercentageChange] = useState([]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const data = await getDailyStats();
        setDaily(data);
        const change = calculatePercentageChange(data);
        setDailyPercentageChange(change);
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
      {isError ? <ErrorComp msg="Could not load data." /> : null}
      {isLoading ? 'Loading' : null}
      {daily && daily.length && dailyPercentageChange.length && !isLoading ? (
        <>
          <Summary stats={daily} />
          <LineChartGeneric dailyData={daily} dataToShow={dailyPercentageChange} />
          <ExtraInfo />
        </>
      ) : (
        'loading...'
      )}
    </Layout>
  );
};

export default Daily;
