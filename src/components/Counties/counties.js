import React, { useState, useEffect, useCallback } from 'react';
import { useStore } from '../../Store/store';
import axios from 'axios';
import configureStore from './counties-store';
import { sharedUtil as util } from '../../util-functions';
import { COUNTIES } from '../../constants.js';

import Layout from '../layout';
import SelectGraphBtnGroup from '../../UI/Buttons/SelectGraphBtnGroup/selectGraphBtnGroup';
import CountiesSection from './Sections/countiesSection';
import BarChart from './BarChart/barChart';
import LineGraph from './LineGraph/lineGraph';
import TreeGraph from './TreeGraph/treeGraph';
import SectionWrapper from '../../UI/Sections/SectionWrapper/sectionWrapper';
configureStore();

const {
  ONE_DAY,
  uriLatestAllCounties,
  objectIdsUrl,
  uriUpdatedSeventhJuly,
  // allCountiesAllResultsConfirmedCasesMoreThanZero,
} = COUNTIES;

const Counties = () => {
  const dispatch = useStore()[1];
  const storeSections = useStore()[0].sections[0];
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showProvinces, setShowProvinces] = useState(false);

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
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        // const response = await axios.get(
        //   allCountiesAllResultsConfirmedCasesMoreThanZero
        // );
        const getIdsOnly = await axios.get(objectIdsUrl);
        function doStuff(copyIds) {
          const arr = [];
          while (copyIds.length > 200) {
            arr.push(copyIds.slice(0, 200));
            copyIds = copyIds.slice(200, copyIds.length);
          }
          arr.push(copyIds); // leftovers

          return arr;
        }

        const arrayOfArrayOfObjectIds = doStuff(getIdsOnly.data.objectIds);

        // July 2020 update. There's a limit to the number of features queryable at one time. First get all object ids then query them in batches of 200 and concat. This makes things really slow to load initially but it's too much effort to change.
        const batches = async () => {
          return await Promise.all(
            arrayOfArrayOfObjectIds.map(async (a) => {
              const ids = `objectIds=${a.toString()}`;
              const batch = await axios.get(uriUpdatedSeventhJuly(ids));
              return batch.data.features;
            })
          );
        };
        const allBatches = await batches();
        const ans = [].concat.apply([], allBatches);
        dispatch('INIT_COUNTY_DATA', ans);
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
        setIsError(true);
      }
    })();
    // eslint-disable-next-line
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

  const renderGraph = () => {
    switch (selectedSection) {
      case 'bar':
        return (
          <BarChart
            handleSelectOneCounty={handleSelectOneCounty}
            handleSelectDate={handleSelectDate}
            isLoading={isLoading}
            isError={isError}
          />
        );
      case 'tree':
        return (
          <TreeGraph
            handleSelectOneCounty={handleSelectOneCounty}
            handleSelectDate={handleSelectDate}
            isLoading={isLoading}
            isError={isError}
            showProvinces={showProvinces}
            setShowProvinces={setShowProvinces}
          />
        );
      case 'line':
        return (
          <LineGraph
            handleSelectCounty={handleSelectCounty}
            handleSelectDate={handleSelectDate}
            isError={isError}
            isLoading={isLoading}
          />
        );
      default:
        return (
          <TreeGraph
            handleSelectOneCounty={handleSelectOneCounty}
            handleSelectDate={handleSelectDate}
            isLoading={isLoading}
            showProvinces={showProvinces}
            setShowProvinces={setShowProvinces}
            isError={isError}
          />
        );
    }
  };

  const renderGraphSection = () => {
    return (
      <CountiesSection
        storeSections={storeSections}
        handleSelectCounty={handleSelectCounty}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        handleSelectDate={handleSelectDate}
        handleSelectData={handleSelectData}
        handleSelectOneCounty={handleSelectOneCounty}
        isLoading={isLoading}
        isError={isError}
        showCountyBtns={selectedSection === 'line' ? true : false}
      >
        {renderGraph()}
      </CountiesSection>
    );
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
      <SectionWrapper>
        {/* {isError ? <ErrorComp msg="Could not load data." /> : null} */}
        <SelectGraphBtnGroup
          data={availGraphs}
          handleSelectGraph={setSelectedSection}
        />

        {renderGraphSection()}
      </SectionWrapper>
    </Layout>
  );
};

export default Counties;
