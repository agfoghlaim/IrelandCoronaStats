import React, { useState, useEffect } from 'react';
import Layout from '../layout';
import axios from 'axios';
import ErrorComp from '../../UI/error';

import configureStore from './counties-store';
import { useStore } from '../../Store/store';

import BarChartSection from './BarChartSection/barChartSection';
import LineGraphSection from './LineChartSection/lineChartSection';
import TreeSection from './TreeSection/treeSection';
configureStore();

const uriLatestAllCounties = `https://services1.arcgis.com/eNO7HHeQ3rUcBllm/arcgis/rest/services/Covid19CountyStatisticsHPSCIrelandOpenData/FeatureServer/0/query?where=1%3D1&outFields=CountyName,PopulationCensus16,ConfirmedCovidCases,PopulationProportionCovidCases,FID,TimeStampDate&outSR=4326&resultRecordCount=26&orderByFields=TimeStampDate%20DESC&returnGeometry=false&f=json`;

const allCountiesAllResultsConfirmedCasesMoreThanZero = `https://services1.arcgis.com/eNO7HHeQ3rUcBllm/arcgis/rest/services/Covid19CountyStatisticsHPSCIrelandOpenData/FeatureServer/0/query?where=ConfirmedCovidCases>0&1%3D1&outFields=CountyName,PopulationCensus16,ConfirmedCovidCases,PopulationProportionCovidCases,FID,TimeStampDate&returnGeometry=false&outSR=4326&f=json`;

const Counties = () => {
  const dispatch = useStore()[1];
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // Latest - all counties
  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const response = await axios.get(uriLatestAllCounties);
        dispatch('INIT_ALL_COUNTIES_LATEST_DATA', response.data.features);
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
        setIsError(true);
      }
    })();
  },[]);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const response = await axios.get(
          allCountiesAllResultsConfirmedCasesMoreThanZero
        );
        dispatch('INIT_COUNTY_DATA', response.data.features);
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
        setIsError(true);
      }
    })();
  },[]);

  const handleSelectOneCounty = (county) => {
    dispatch('SELECT_COUNTY', county);
  };

  const handleSelectData = (e) => {
    const fieldName = e.target.name;
    dispatch('SELECT_ATTRIBUTE', fieldName);
  };

  // click on county line/tinyBtn to show details in textbox
  const handleSelectCounty = (e, county) => {
    const name = county || e.target.id;
    dispatch('SELECT_COUNTY', name);
  };

  // click on ClickRectangle
  const handleSelectDate = (date) => {
    dispatch('SELECT_DATE', date);

    // also update allCountiesLatestData (for Bar Chart)
    dispatch('UPDATE_ALL_COUNTIES_LATEST_DATA', date);
  };

  return (
    <Layout>
      <>
        {isError ? <ErrorComp msg="Could not load data." /> : null}

        <TreeSection 
         handleSelectOneCounty={handleSelectOneCounty}
         handleSelectData={handleSelectData}
         handleSelectDate={handleSelectDate}
         isLoading={isLoading}
        />
        
        <BarChartSection
          handleSelectOneCounty={handleSelectOneCounty}
          handleSelectData={handleSelectData}
          handleSelectDate={handleSelectDate}
          isLoading={isLoading}
        />
        <LineGraphSection
          handleSelectDate={handleSelectDate}
          handleSelectCounty={handleSelectCounty}
          handleSelectData={handleSelectData}
          isLoading={isLoading}
        />
        
      </>
    </Layout>
  );
};

export default Counties;
