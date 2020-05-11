import React, { useState, useEffect, useCallback } from 'react';
import Layout from '../layout';
import BarChartSection from './BarChartSection/barChartSection';
import LineGraphSection from './LineChartSection/lineChartSection';
import TreeSection from './TreeSection/treeSection';
import SectionWrapSimple from '../../UI/Sections/SectionWrapSimple/sectionWrapSimple';
import SelectGraphBtnGroup from '../../UI/Buttons/SelectGraphBtnGroup/selectGraphBtnGroup';
import ErrorComp from '../../UI/error';

import axios from 'axios';
import configureStore from './counties-store';
import { useStore } from '../../Store/store';
import { sharedUtil as util } from '../../util-functions';

configureStore();

// TODO move constants
const ONE_DAY = 86400000;
const uriLatestAllCounties = `https://services1.arcgis.com/eNO7HHeQ3rUcBllm/arcgis/rest/services/Covid19CountyStatisticsHPSCIrelandOpenData/FeatureServer/0/query?where=1%3D1&outFields=CountyName,PopulationCensus16,ConfirmedCovidCases,PopulationProportionCovidCases,FID,TimeStampDate&outSR=4326&resultRecordCount=26&orderByFields=TimeStampDate%20DESC&returnGeometry=false&f=json`;

const allCountiesAllResultsConfirmedCasesMoreThanZero = `https://services1.arcgis.com/eNO7HHeQ3rUcBllm/arcgis/rest/services/Covid19CountyStatisticsHPSCIrelandOpenData/FeatureServer/0/query?where=ConfirmedCovidCases>0&1%3D1&outFields=CountyName,PopulationCensus16,ConfirmedCovidCases,PopulationProportionCovidCases,FID,TimeStampDate&returnGeometry=false&outSR=4326&f=json`;

const Counties = () => {
  const dispatch = useStore()[1];
  const storeSections = useStore()[0].sections[0];
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const [selectedSection, setSelectedSection] = useState('bar');

  const getSelected = (name) => (name === selectedSection ? true : false);

  // SelectGraphBtnGroup wants data in this format
  const availGraphs = [
    { name: 'bar', sectionName: 'Bar Graph', selected: getSelected('bar') },
    { name: 'tree', sectionName: 'Tree Graph', selected: getSelected('tree') },
    { name: 'line', sectionName: 'Line Graph', selected: getSelected('line') },
  ];
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
  }, []);

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
  }, []);

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
    dispatch('UPDATE_ALL_COUNTIES_LATEST_DATA', date);
  };

  const renderGraphSection = () => {
    switch (selectedSection) {
      case 'bar':
        return (
          <BarChartSection
            handleSelectOneCounty={handleSelectOneCounty}
            handleSelectData={handleSelectData}
            handleSelectDate={handleSelectDate}
            isLoading={isLoading}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
          />
        );
      case 'tree':
        return (
          <TreeSection
            handleSelectOneCounty={handleSelectOneCounty}
            handleSelectData={handleSelectData}
            handleSelectDate={handleSelectDate}
            isLoading={isLoading}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
          />
        );
      case 'line':
        return (
          <LineGraphSection
            handleSelectDate={handleSelectDate}
            handleSelectCounty={handleSelectCounty}
            handleSelectData={handleSelectData}
            isLoading={isLoading}
          />
        );

      default:
        return (
          <BarChartSection
            handleSelectOneCounty={handleSelectOneCounty}
            handleSelectData={handleSelectData}
            handleSelectDate={handleSelectDate}
            isLoading={isLoading}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
          />
        );
    }
  };

  const incrementSelectedDate = useCallback(() => {
    let useDate = storeSections.selectedDate + ONE_DAY;
    const latestPossibleDate = util.getLatestDate(storeSections.allCounties[0]);
    if (storeSections.selectedDate < latestPossibleDate) {
      dispatch('SELECT_DATE', useDate);
      dispatch('UPDATE_ALL_COUNTIES_LATEST_DATA', useDate);
      return true;
    } else {
      setIsPlaying();
      return false;
    }
  }, [
    dispatch,
    setIsPlaying,
    storeSections.selectedDate,
    storeSections.allCounties,
  ]);

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        return incrementSelectedDate();
      }, 400);
      if (!interval) clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying, incrementSelectedDate]);

  return (
    <Layout>
      <>
        {isError ? <ErrorComp msg="Could not load data." /> : null}
        <SectionWrapSimple offsetBottom="-3rem">
          <SelectGraphBtnGroup
            data={availGraphs}
            handleSelectGraph={setSelectedSection}
          />
        </SectionWrapSimple>

        {renderGraphSection()}
      </>
    </Layout>
  );
};

export default Counties;
