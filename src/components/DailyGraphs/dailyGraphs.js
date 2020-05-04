import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import configureDailyGraphsStore from './dailyGraphs-store';
import { useStore } from '../../Store/store';
import SectionWrap from '../../UI/Sections/SectionWrap/sectionWrap';
import SectionMain from '../../UI/Sections/SectionMain/sectionMain';
import SectionSide from '../../UI/Sections/SectionSide/sectionSide';
import SectionHeader from '../../UI/Sections/SectionHeader/sectionHeader';
import LineGraphDaily from './LineGraphDaily/lineGraphDaily';

import DailyAttributeBtns from '../Counties/SectionsUI/DailyAttributeBtns/dailyAttributeBtns';
import TextBox from './TextBox/textBox';

configureDailyGraphsStore();

// Daily data only (no Statistics Profile fields) for each day.
const dailyStatsSoFarUrl = `https://services1.arcgis.com/eNO7HHeQ3rUcBllm/arcgis/rest/services/CovidStatisticsProfileHPSCIrelandOpenData/FeatureServer/0/query?where=1%3D1&outFields=Date,ConfirmedCovidCases,TotalConfirmedCovidCases,ConfirmedCovidDeaths,TotalCovidDeaths,ConfirmedCovidRecovered,TotalCovidRecovered,FID&returnGeometry=false&outSR=4326&f=json`;

const DailyGraphs = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const dispatch = useStore()[1];
  const graphs = useStore()[0].dailyGraphsStore;


  useEffect(() => {
    (async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const data = await getDailyStats();

        dispatch('SET_ALL_DAILY_GRAPHS', data);
        dispatch('SET_DAILY_GRAPHS_SELECTED_DATE_AND_DATA');
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

  const handleSelectData = (e, graphId) => {
    const fieldName = e.target.name;
    dispatch('SELECT_DAILY_GRAPHS_ATTRS', { fieldName, graphId });
  };
  return graphs && graphs.length
    ? graphs.map((graph, index) => (
 
        <SectionWrap key={index}>
          <SectionSide>
            <SectionHeader
              title={graph.sectionName}
              subtitle=""
              description={graph.description}
            />
            {!isLoading && graph.all.length ? (
              <TextBox allData={graph} />
            ) : (
              'Loading...'
            )}
            <DailyAttributeBtns
              availableAttributes={graph.avail}
              graphIndex={graph.id}
              handleSelectData={handleSelectData}
            />
          </SectionSide>
          <SectionMain background='var(--lightBlack)'>
            {!isLoading && graph && graph.all.length ? (
              <LineGraphDaily
                // graphData={graph}
                graphId={graph.id}
              />
            ) : (
              'Loading...'
            )}
          </SectionMain>
        </SectionWrap>

      ))
    : null;
};

export default DailyGraphs;
