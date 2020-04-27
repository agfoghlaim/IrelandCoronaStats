import React from 'react';
import classes from './lineChartSection.module.css';
import LineGraph2 from '../LineGraph2/lineGraph2';
import TextBox from '../TextBox/textBox';
import AttributeBtns from '../SectionsUI/AttributeBtns/attributeBtns';
import CountyBts from '../SectionsUI/CountyBtns/countyBtns';

import SectionWrap from '../../../UI/Sections/SectionWrap/sectionWrap';
import SectionSide from '../../../UI/Sections/SectionSide/sectionSide';
import SectionMain from '../../../UI/Sections/SectionMain/sectionMain';
import { useStore } from '../../../Store/store';

const LineGraphSection = () => {
  const testDispatch = useStore()[1];
  const storeSections = useStore()[0].sections[0];

  const handleSelectData = (e) => {
    const fieldName = e.target.name;
    testDispatch('SELECT_ATTRIBUTE', fieldName);
  };

  // click on county line/tinyBtn to show details in textbox
  const handleSelectCounty = (e, county) => {
    const name = county || e.target.id;
    testDispatch('SELECT_COUNTY', name);
  };

  // click on ClickRectangle
  const handleSelectDate =(date) => {
    testDispatch('SELECT_DATE', date);
  }

  return (

    <SectionWrap>
      <SectionSide title={storeSections.name} subtitle="subtitle">
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

      <SectionMain>
        {storeSections && storeSections.allCounties.length ? (
          <LineGraph2 handleSelectCounty={handleSelectCounty} handleSelectDate={handleSelectDate}  />
        ) : null}
      </SectionMain>
    </SectionWrap>
  );
};

export default LineGraphSection;
