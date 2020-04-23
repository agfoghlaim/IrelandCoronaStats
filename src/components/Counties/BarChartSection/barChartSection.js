import React from 'react';
import BarChart from '../BarChart/barChart';
import { useStore } from '../../../Store/store';
import TextBox from '../TextBox/textBox';
import AttributeBtns from '../SectionsUI/AttributeBtns/attributeBtns';
import SectionWrap from '../SectionsUI/SectionWrap/sectionWrap';
import SectionSide from '../SectionsUI/SectionSide/sectionSide';
import SectionMain from '../SectionsUI/SectionMain/sectionMain';

const BarChartSection = ({ handleSelectOneCounty }) => {
  const testDispatch = useStore()[1];
  const storeSections = useStore()[0].sections[0];

  const handleSelectData = (e) => {
    const fieldName = e.target.name;
    testDispatch('SELECT_ATTRIBUTE', fieldName);
  };


  return (
    <SectionWrap>
      <SectionSide title="The Title" subtitle="theSubtitle">
        <TextBox />
        <AttributeBtns
          availableAttributes={storeSections.avail}
          handleSelectData={handleSelectData}
        />
      </SectionSide>

      <SectionMain>
        <BarChart handleSelectOneCounty={handleSelectOneCounty} />
      </SectionMain>
    </SectionWrap>
  );
};

export default BarChartSection;
