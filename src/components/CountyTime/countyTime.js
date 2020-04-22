import React, { useState, useEffect } from 'react';
import classes from './countyTime.module.css';
import Layout from '../layout';
import axios from 'axios';
import ErrorComp from '../../UI/error';
import Section from './Sections/section';
import configureStore from './Store/countiesTime-store';
import { useStore } from '../../Store/store';
configureStore();


const uriAllCounties = `https://services1.arcgis.com/eNO7HHeQ3rUcBllm/arcgis/rest/services/Covid19CountyStatisticsHPSCIrelandOpenData/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&resultRecordCount=26&orderByFields=TimeStampDate%20DESC&f=json`;

const oneCountyAllResults = `https://services1.arcgis.com/eNO7HHeQ3rUcBllm/arcgis/rest/services/Covid19CountyStatisticsHPSCIrelandOpenData/FeatureServer/0/query?where=CountyName='Galway'&1%3D1&outFields=*&f=json`;

// resp.data.features.length = 1274
const allCountiesAllResults = `https://services1.arcgis.com/eNO7HHeQ3rUcBllm/arcgis/rest/services/Covid19CountyStatisticsHPSCIrelandOpenData/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json`;

// resp.data.features.length = 728
const allCountiesAllResultsConfirmedCasesMoreThanZero = `https://services1.arcgis.com/eNO7HHeQ3rUcBllm/arcgis/rest/services/Covid19CountyStatisticsHPSCIrelandOpenData/FeatureServer/0/query?where=ConfirmedCovidCases>0&1%3D1&outFields=CountyName,PopulationCensus16,ConfirmedCovidCases,PopulationProportionCovidCases,FID,TimeStampDate&returnGeometry=false&outSR=4326&f=json`;


const CountiesTime = () => {

  const testDispatch = useStore(false)[1];
  // const sections = useStore()[0].sections;

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // All time data for all counties
  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const response = await axios.get(
          allCountiesAllResultsConfirmedCasesMoreThanZero
        );
        testDispatch('SET_ALL_DATA',response.data.features)
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
        setIsError(true);
      }
    })();
  }, []);

  return (
    <Layout>
      <>
        {isError ? <ErrorComp msg="Could not load data." /> : null}
        {/* {!isLoading && sections && sections.length  ? (
          <Section section={sections} newSections={sections} />
        ) : null} */}
         {!isLoading  ? (
          <Section />
        ) : null}
      </>
    </Layout>
  );
};

export default CountiesTime;
