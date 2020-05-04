import React, { useState, useEffect, useCallback } from 'react';
import Layout from '../layout';
import axios from 'axios';
import Summary from '../Summary/summary';
import ExtraInfo from './ExtraInfo/extraInfo';
import ErrorComp from '../../UI/error';
import LoadingComp from '../../UI/loading';
import DailyGraphs from '../DailyGraphs/dailyGraphs';

// uri with data that's being updated
const dailyStatsSoFarUrl = `https://services1.arcgis.com/eNO7HHeQ3rUcBllm/arcgis/rest/services/CovidStatisticsProfileHPSCIrelandOpenData/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json`;

const DailyPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [daily, setDaily] = useState([]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const data = await getDailyStats();
        setDaily(data);

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

  return (
    <Layout>
      {isError ? <ErrorComp msg="Could not load data." /> : null}
      {isLoading ? <LoadingComp msg="Loading..." /> : null}
      {daily && daily.length && <Summary stats={daily} loading={isLoading} />}

      <DailyGraphs />
      <ExtraInfo />
    </Layout>
  );
};

export default DailyPage;
