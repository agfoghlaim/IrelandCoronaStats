import React, { useState, useEffect, useCallback } from 'react';
import classes from './dailyGraphs.module.css';
import axios from 'axios';

import configureDailyGraphsStore from '../DailyAndProfileData/dailyGraphs-store';
import { useStore } from '../../Store/store';
import { DAILY_GRAPHS } from '../../constants';
import { sharedUtil } from '../../util-functions';

import SectionWrap from '../../UI/Sections/SectionWrap/sectionWrap';
import SectionWrapper from '../../UI/Sections/SectionWrapper/sectionWrapper';
import SectionMain from '../../UI/Sections/SectionMain/sectionMain';
import SectionSide from '../../UI/Sections/SectionSide/sectionSide';
import SectionHeader from '../../UI/Sections/SectionHeader/sectionHeader';
import LineGraphDaily from './LineGraphDaily/lineGraphDaily';
import AttributeBtns from '../../UI/Buttons/AttributeBtns/attributeBtns';
import ErrorComp from '../../UI/error';
import AltTextBox from '../../UI/AltTextBox/altTextBox';

configureDailyGraphsStore();

const { dailyStatsSoFarUrl } = DAILY_GRAPHS;
const { prepArrayToShowInTextBox } = sharedUtil;

const DailyGraphs = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const dispatch = useStore()[1];
  const graphs = useStore()[0].dailyGraphsStore.graphs;

  const getDailyStats = useCallback(async () => {
    try {
      const response = await axios.get(dailyStatsSoFarUrl);
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
        const data = await getDailyStats();
        
        dispatch('SET_ALL_DAILY_GRAPHS', data);
        dispatch('SET_DAILY_STORE_DATE_AND_DATA', {
          latestDate: false,
          storeName: 'dailyGraphsStore',
        });
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
        setIsError(true);
      }
    })();
    // eslint-disable-next-line
  }, []);

  const handleSelectData = (e, graphId) => {
    const fieldName = e.target.name;
    dispatch('SELECT_DAILY_GRAPHS_ATTRS', {
      fieldName,
      graphId,
      storeName: 'dailyGraphsStore',
    });
  };

  const handleTextBox = (data, dateFieldName) => {
    if (!data || !dateFieldName) return;
    const dateToSelect = data[dateFieldName];
    dispatch('SET_DAILY_STORE_DATE_AND_DATA', {
      latestDate: dateToSelect,
      storeName: 'dailyGraphsStore',
    });
  };

  return graphs && graphs.length
    ? graphs.map((graph, index) => (
        <SectionWrapper key={index}>
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
                    {!isLoading ? (
                      <AltTextBox
                        arrayToShowInTextBox={prepArrayToShowInTextBox(graph)}
                        selectedDate={graph.selectedDate}
                        numAvailableAttrs={graph.avail.length}
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
              {!isLoading && graph ? (
                <LineGraphDaily
                  graphId={graph.id}
                  storeName="dailyGraphsStore"
                  handleTextBox={handleTextBox}
                />
              ) : (
                'Loading...'
              )}
            </SectionMain>
          </SectionWrap>
        </SectionWrapper>
      ))
    : null;
};

export default DailyGraphs;
