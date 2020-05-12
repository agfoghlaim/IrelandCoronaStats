import React from 'react';
import LineGraph2 from '../LineGraph2/lineGraph2';
import TextBox from '../TextBox/textBox';
// import AttributeBtns from '../SectionsUI/AttributeBtns/attributeBtns';
import AttributeBtns from '../../../UI/Buttons/AttributeBtns/attributeBtns';
import CountyBts from '../SectionsUI/CountyBtns/countyBtns';
import SectionWrapSimple from '../../../UI/Sections/SectionWrapSimple/sectionWrapSimple';
import SectionWrap from '../../../UI/Sections/SectionWrap/sectionWrap';
import SectionSide from '../../../UI/Sections/SectionSide/sectionSide';
import SectionMain from '../../../UI/Sections/SectionMain/sectionMain';
import SectionHeader from '../../../UI/Sections/SectionHeader/sectionHeader';
import LoadingComp from '../../../UI/loading';
import { useStore } from '../../../Store/store';
import classes from './lineChartSection.module.css';
import ClickArrows from '../ClickArrows/clickArrows';

const LineGraphSection = ({
  handleSelectData,
  handleSelectCounty,
  handleSelectDate,
  isPlaying,
  setIsPlaying,
  isLoading,
}) => {
  const storeSections = useStore()[0].sections[0];

  return isLoading ? (
    <SectionWrapSimple minHeight="50vh">
      <LoadingComp />
    </SectionWrapSimple>
  ) : (
    <SectionWrap>
      <SectionSide title={storeSections.name} subtitle="subtitle">
        <SectionHeader
          title={`${
            storeSections.avail.filter((a) => a.selected)[0].name
          } by County`}
          subtitle=""
        >

{storeSections.selectedDate && storeSections.allCounties.length ? (
            <ClickArrows
              handleSelectDate={handleSelectDate}
              selectedDate={storeSections.selectedDate}
              tempJustDates={storeSections.allCounties[0].stats.map(
                (s) => s.TimeStampDate
              )}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
            />
          ) : null}
        </SectionHeader>
        <div className={classes.forBreakPointBetween900And300}>
        <TextBox />
        <AttributeBtns
          availableAttributes={storeSections.avail}
          handleSelectData={handleSelectData}
        />
        </div>
        <CountyBts
          counties={storeSections.allCounties}
          handleSelectCounty={handleSelectCounty}
        />
      </SectionSide>

      <SectionMain>
        {storeSections && storeSections.allCounties.length ? (
          <LineGraph2
            handleSelectCounty={handleSelectCounty}
            handleSelectDate={handleSelectDate}
          />
        ) : null}
      </SectionMain>
    </SectionWrap>
  );
};

export default LineGraphSection;
