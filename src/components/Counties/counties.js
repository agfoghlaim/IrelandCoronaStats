import React, { useState, useEffect, useCallback } from 'react';
import classes from './counties.module.css';
import Layout from '../layout';
import axios from 'axios';
// import Section from './Sections/section';
import ErrorComp from '../../UI/error';
// import CountyTime from '../CountyTime/countyTime';
// import configureStore from '../CountyTime/Store/countiesTime-store';
import configureStore from './counties-store';
import { useStore } from '../../Store/store';

import BarChartSection from './BarChartSection/barChartSection';
import LineGraphSection from './LineChartSection/lineChartSection';
configureStore();

const uriLatestAllCounties = `https://services1.arcgis.com/eNO7HHeQ3rUcBllm/arcgis/rest/services/Covid19CountyStatisticsHPSCIrelandOpenData/FeatureServer/0/query?where=1%3D1&outFields=CountyName,PopulationCensus16,ConfirmedCovidCases,PopulationProportionCovidCases,FID,TimeStampDate&outSR=4326&resultRecordCount=26&orderByFields=TimeStampDate%20DESC&returnGeometry=false&f=json`;

const allCountiesAllResultsConfirmedCasesMoreThanZero = `https://services1.arcgis.com/eNO7HHeQ3rUcBllm/arcgis/rest/services/Covid19CountyStatisticsHPSCIrelandOpenData/FeatureServer/0/query?where=ConfirmedCovidCases>0&1%3D1&outFields=CountyName,PopulationCensus16,ConfirmedCovidCases,PopulationProportionCovidCases,FID,TimeStampDate&returnGeometry=false&outSR=4326&f=json`;

const Counties = () => {

  const testDispatch = useStore()[1];
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // Latest - all counties
  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const response = await axios.get(uriLatestAllCounties);
        testDispatch('SET_ALL_COUNTIES_LATEST_DATA', response.data.features);
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
        setIsError(true);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const response = await axios.get(
          allCountiesAllResultsConfirmedCasesMoreThanZero
        );
        testDispatch('SET_ALL_DATA', response.data.features);
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
        setIsError(true);
      }
    })();
  }, []);

  const handleSelectOneCounty = (county) => {
    testDispatch('SELECT_COUNTY', county);
  };

  return (
    <Layout>
      <div className={classes.countiesWrap}>
        {isError ? <ErrorComp msg="Could not load data." /> : null}
        
        <BarChartSection handleSelectOneCounty={handleSelectOneCounty}  />

        <LineGraphSection />
  
      </div>
    </Layout>
  );
};

export default Counties;
