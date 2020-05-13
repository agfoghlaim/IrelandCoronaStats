import React from 'react';
import CountiesSideSectionHeader from './countiesSideSectionHeader';
import SectionSide from '../../../UI/Sections/SectionSide/sectionSide';
import TextBox from '../TextBox/textBox';
import AttributeBtns from '../../../UI/Buttons/AttributeBtns/attributeBtns';
import CountyBts from '../SectionsUI/CountyBtns/countyBtns';
import classes from './countiesSideSection.module.css';

const CountiesSideSection = ({
  showCountyBtns,
  storeSections,
  isPlaying,
  setIsPlaying,
  handleSelectDate,
  handleSelectData,
  handleSelectCounty,
}) => {
  return (
    <SectionSide title={storeSections.name} subtitle="subtitle">
      <CountiesSideSectionHeader
        storeSections={storeSections}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        handleSelectDate={handleSelectDate}
      />

      <div className={classes.forBreakPointBetween900And300}>
        <TextBox />
        <AttributeBtns
          availableAttributes={storeSections.avail}
          handleSelectData={handleSelectData}
        />
      </div>
      {showCountyBtns ? (
        <CountyBts
          counties={storeSections.allCounties}
          handleSelectCounty={handleSelectCounty}
        />
      ) : null}
    </SectionSide>
  );
};

export default CountiesSideSection;
