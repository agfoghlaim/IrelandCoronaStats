import React, { useState, useEffect, useCallback } from 'react';
import classes from './altStats.module.css';

import axios from 'axios';

import { ALTSTATS } from '../../constants';
import configureDailyGraphsStore from '../DailyAndProfileData/dailyGraphs-store'; //?
import { useStore } from '../../Store/store';

import Layout from '../layout';
import SectionWrapper from '../../UI/Sections/SectionWrapper/sectionWrapper';
import SelectGraphBtnGroup from '../../UI/Buttons/SelectGraphBtnGroup/selectGraphBtnGroup';
import AltStatsGraphs from './altStatsGraphs';

configureDailyGraphsStore();
const { profileStatsUrl } = ALTSTATS;

const AltStats = () => {
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
        dispatch('SET_DAILY_STORE_DATE_AND_DATA', {
          latestDate: false,
          storeName: 'profileStatsStore',
        });
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
        setIsError(true);
      }
    })();
    // eslint-disable-next-line
  }, []);

  const handleTextBox = (data, dateFieldName) => {
    if (!data || !dateFieldName) return;
    const dateToSelect = data[dateFieldName];
    dispatch('SET_DAILY_STORE_DATE_AND_DATA', {
      latestDate: dateToSelect,
      storeName: 'profileStatsStore',
    });
  };

  const handleSelectData = (e, graphId) => {
    const fieldName = e.target.name;

    dispatch('SELECT_DAILY_GRAPHS_ATTRS', {
      fieldName,
      graphId,
      storeName: 'profileStatsStore',
    });
  };

  // TODO, see repeat dailyGraphs.js...
  // do After textbox styling
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
      return ans;
    });
  };

  return (
    <Layout>
      <SectionWrapper>
        <SelectGraphBtnGroup
          data={allAvailableGraphs}
          handleSelectGraph={handleSelectGraph}
        />
        <AltStatsGraphs
          graphs={graphs}
          classes={classes}
          isError={isError}
          isLoading={isLoading}
          selectedGraphName={selectedGraphName}
          prepArrayToShowInTextBox={prepArrayToShowInTextBox}
          handleSelectData={handleSelectData}
          handleTextBox={handleTextBox}
        />
      </SectionWrapper>
      <SectionWrapper>
        <p>{description}</p>
      </SectionWrapper>
    </Layout>
  );
};

export default AltStats;
