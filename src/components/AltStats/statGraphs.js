import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
// import configureStatsGraphsStore from './stats-store';
import configureDailyGraphsStore from '../DailyGraphs/dailyGraphs-store';
import { useStore } from '../../Store/store';
// temp
import classes from '../DailyGraphs/dailyGraphs.module.css';
import SectionWrap from '../../UI/Sections/SectionWrap/sectionWrap';
import SectionWrapper from '../../UI/Sections/SectionWrapper/sectionWrapper';
import SectionMain from '../../UI/Sections/SectionMain/sectionMain';
import SectionSide from '../../UI/Sections/SectionSide/sectionSide';
import SectionHeader from '../../UI/Sections/SectionHeader/sectionHeader';
import LineGraphDaily from '../DailyGraphs/LineGraphDaily/lineGraphDaily';
import SelectGraphBtnGroup from '../../UI/Buttons/SelectGraphBtnGroup/selectGraphBtnGroup';
import AttributeBtns from '../../UI/Buttons/AttributeBtns/attributeBtns';
import Layout from '../layout';
//temp
// import TextBox from '../DailyGraphs/TextBox/textBox';
// import classes from './dailyGraphs.module.css';
import ErrorComp from '../../UI/error';

import AltTextBox from '../../UI/AltTextBox/altTextBox';

// configureStatsGraphsStore();
configureDailyGraphsStore();


const profileStatsUrl = `https://services1.arcgis.com/eNO7HHeQ3rUcBllm/arcgis/rest/services/CovidStatisticsProfileHPSCIrelandOpenData/FeatureServer/0/query?where=1%3D1&outFields=StatisticsProfileDate,CovidCasesConfirmed,HospitalisedCovidCases,RequiringICUCovidCases,HealthcareWorkersCovidCases,ClustersNotified,HospitalisedAged5,HospitalisedAged5to14,HospitalisedAged15to24,HospitalisedAged25to34,HospitalisedAged35to44,HospitalisedAged45to54,HospitalisedAged55to64,HospitalisedAged65up,Male,Female,Unknown,Aged1,Aged1to4,Aged5to14,Aged15to24,Aged25to34,Aged35to44,Aged45to54,Aged55to64,Aged65up,Median_Age,CommunityTransmission,CloseContact,TravelAbroad,UnderInvestigation,FID&returnGeometry=false&outSR=4326&f=json`;


// profileStatsStore
const StatGraphs = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const dispatch = useStore()[1];
  const { graphs, description } = useStore()[0].profileStatsStore;
 

  const initAvailableGraphs = () => {
    return graphs.map((s, i) => {
      return {
        name: s.name,
        sectionName: s.sectionName,
        description: s.description,
        selected: i === 0 ? true : false,
      };
    });
  };

  const [allAvailableGraphs, setAllAvailableGraphs] = useState(
    initAvailableGraphs()
  );

  const handleSelectGraph = (name) => {
    const newAvailGraphs = allAvailableGraphs.map((graph) => {
      return {
        ...graph,
        selected: graph.name === name ? true : false,
      };
    });
    setAllAvailableGraphs(newAvailGraphs);
  };

  const selectedGraphName = () =>
    allAvailableGraphs.filter((graph) => graph.selected)[0].name;

  // console.log(graphs)
  const getProfileStats = useCallback(async () => {
    try {
      const response = await axios.get(profileStatsUrl);
      return response.data.features;
    } catch (e) {
      setIsLoading(false);
      setIsError(true);
    }
  }, []);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const data = await getProfileStats();

        dispatch('SET_ALL_PROFILE_STATS', data);
        dispatch('SET_DAILY_STORE_DATE_AND_DATA', {latestDate: false, storeName: 'profileStatsStore' })
        // dispatch('SET_PROFILE_STATS_SELECTED_DATE_AND_DATA');
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
        setIsError(true);
      }
    })();
    // eslint-disable-next-line
  }, []);

  //=====================================
  // moved up from lineGraphDaily
  //=======================================
  const handleTextBox = (data, dateFieldName) => {
    if (!data || !dateFieldName) return;
    const dateToSelect = data[dateFieldName];
    // dispatch('SET_PROFILE_STATS_SELECTED_DATE_AND_DATA', dateToSelect);
    dispatch('SET_DAILY_STORE_DATE_AND_DATA', {latestDate: dateToSelect, storeName: 'profileStatsStore' })
  };

  //========================================
  const handleSelectData = (e, graphId) => {

    const fieldName = e.target.name;
    
    dispatch('SELECT_DAILY_GRAPHS_ATTRS', { fieldName, graphId, storeName: 'profileStatsStore' });
  };

    // TODO, see repeat dailyGraphs.js... this needs to be sorted
  const prepArrayToShowInTextBox = (graph) => {

    return graph.selectedAttributeNames.map((name) => {
      const title = graph.avail.filter((a) => a.fieldName === name)[0].name;
      const color = graph.avail.filter((a) => a.fieldName === name)[0].color;

      const ans = {};

      ans[name] = graph.selectedDateData[name];
      ans.color = color;
      ans.title = title;
      ans.fieldName = name;
      ans.value = graph.selectedDateData[name];
      // ans.selectedDate = graph.selectedDate;
      // ans.xAxisAttribute = graph.xAxisAttribute;

      return ans;
    });
  };

  return (
    <Layout >
    <SectionWrapper>
      <SelectGraphBtnGroup
        data={allAvailableGraphs}
        handleSelectGraph={handleSelectGraph}
      />
      {graphs.map((graph, i) => {
        return graph.name === selectedGraphName() ? (
          <SectionWrap>
            <SectionSide>
              {isError ? (
                <ErrorComp msg="Could not load data." />
              ) : (
                <>
                  <SectionHeader
                    title={graph.sectionName}
                    subtitle=""
                    description={graph.description}
                  />

                  <div className={classes.forBreakPointBetween900And300}>
                 
                    {!isLoading   ? (
                      <AltTextBox
                        arrayToShowInTextBox={prepArrayToShowInTextBox(graph)}
                        selectedDate={graph.selectedDate}
                      />
                    ) : (
                      'Loading...'
                    )}

                    <AttributeBtns
                      availableAttributes={graph.avail}
                      graphIndex={graph.id}
                      handleSelectData={handleSelectData}
                    />
                  </div>
                </>
              )}
            </SectionSide>
            <SectionMain>
              {!isLoading && graph  ? (
                <LineGraphDaily
                  graphId={graph.id}
                  storeName="profileStatsStore"
                  handleTextBox={handleTextBox}
                />
              ) : (
                'Loading...'
              )}
            </SectionMain>
          </SectionWrap>
        ) : null;
      })}
    </SectionWrapper>
    <SectionWrapper>
        <p>{description}
        </p>
      </SectionWrapper>
    </Layout>
  );
};

export default StatGraphs;
