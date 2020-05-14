import React from 'react';
import SectionWrap from '../../../UI/Sections/SectionWrap/sectionWrap';
import SectionMain from '../../../UI/Sections/SectionMain/sectionMain';
import CountiesSideSection from './countiesSideSection';

const CountiesSection = ({
  children,
  storeSections,
  isPlaying,
  setIsPlaying,
  handleSelectDate,
  handleSelectData,
  classes,
}) => {
  return (
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
      <SectionMain>{children}</SectionMain>
    </SectionWrap>
  );
};

export default CountiesSection;
