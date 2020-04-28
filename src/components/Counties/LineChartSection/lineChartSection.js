import React from 'react';
import LineGraph2 from '../LineGraph2/lineGraph2';
import TextBox from '../TextBox/textBox';
import AttributeBtns from '../SectionsUI/AttributeBtns/attributeBtns';
import CountyBts from '../SectionsUI/CountyBtns/countyBtns';

import SectionWrap from '../../../UI/Sections/SectionWrap/sectionWrap';
import SectionSide from '../../../UI/Sections/SectionSide/sectionSide';
import SectionMain from '../../../UI/Sections/SectionMain/sectionMain';
import SectionHeader from '../../../UI/Sections/SectionHeader/sectionHeader';
import { useStore } from '../../../Store/store';

const LineGraphSection = ( {handleSelectData, handleSelectCounty, handleSelectDate }) => {

  const storeSections = useStore()[0].sections[0];

  return (

    <SectionWrap>
      <SectionSide title={storeSections.name} subtitle="subtitle">
      <SectionHeader title={`${storeSections.avail.filter(a=>a.selected)[0].name} by County`} subtitle="" >

        </SectionHeader>
        <TextBox />

        <AttributeBtns
          availableAttributes={storeSections.avail}
          handleSelectData={handleSelectData}
        />

        <CountyBts
          counties={storeSections.allCounties}
          handleSelectCounty={handleSelectCounty}
        />
      </SectionSide>

      <SectionMain background='var(--lightBlack)'>
        {storeSections && storeSections.allCounties.length ? (
          <LineGraph2 handleSelectCounty={handleSelectCounty} handleSelectDate={handleSelectDate}  />
        ) : null}
      </SectionMain>
    </SectionWrap>
  );
};

export default LineGraphSection;
