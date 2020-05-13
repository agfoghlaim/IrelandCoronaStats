import React from 'react';
import SectionWrap from '../../../UI/Sections/SectionWrap/sectionWrap';
import SectionWrapSimple from '../../../UI/Sections/SectionWrapSimple/sectionWrapSimple';
import SectionMain from '../../../UI/Sections/SectionMain/sectionMain';
import LoadingComp from '../../../UI/loading';
import CountiesSideSection from './countiesSideSection';

const CountiesSection = ({
  children,
  storeSections,
  isPlaying,
  setIsPlaying,
  handleSelectDate,
  handleSelectData,
  isLoading,
  classes
}) => {

  return isLoading ? (
    <SectionWrapSimple minHeight="50vh">
      <LoadingComp />
    </SectionWrapSimple>
  ) : (
    <SectionWrap>
      <CountiesSideSection
        showCountyBtns={false}
        storeSections={storeSections}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        handleSelectDate={handleSelectDate}
        classes={classes}
        handleSelectData={handleSelectData}
      />
      <SectionMain>
        {children}

      </SectionMain>
    </SectionWrap>
  );
  

};

export default CountiesSection;
