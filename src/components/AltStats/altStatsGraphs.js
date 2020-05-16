import React from 'react';
import ErrorComp from '../../UI/error';
import LoadingComp from '../../UI/loading';
import SectionWrap from '../../UI/Sections/SectionWrap/sectionWrap';

import SectionMain from '../../UI/Sections/SectionMain/sectionMain';
import SectionSide from '../../UI/Sections/SectionSide/sectionSide';
import SectionHeader from '../../UI/Sections/SectionHeader/sectionHeader';
import LineGraphDaily from '../DailyGraphs/LineGraphDaily/lineGraphDaily';

import AttributeBtns from '../../UI/Buttons/AttributeBtns/attributeBtns';
import AltTextBox from '../../UI/AltTextBox/altTextBox';
const AltStatsGraphs = ({graphs, classes, isError, isLoading, selectedGraphName, prepArrayToShowInTextBox, handleSelectData, handleTextBox}) => {

  return(
    graphs.map((graph, i) => {
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
                  {!isLoading ? (
                    <AltTextBox
                      arrayToShowInTextBox={prepArrayToShowInTextBox(graph)}
                      selectedDate={graph.selectedDate}
                    />
                  ) : (
                    <LoadingComp />
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
                storeName="profileStatsStore"
                handleTextBox={handleTextBox}
              />
            ) : (
              <LoadingComp />
            )}
          </SectionMain>
        </SectionWrap>
      ) : null;
    })
  )
}

export default AltStatsGraphs;