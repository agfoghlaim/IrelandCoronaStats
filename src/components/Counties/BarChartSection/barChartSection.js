import React from 'react';
import BarChart from '../BarChart/barChart';
import { useStore } from '../../../Store/store';
import TextBox from '../TextBox/textBox';
import AttributeBtns from '../SectionsUI/AttributeBtns/attributeBtns';

import SectionWrap from '../../../UI/Sections/SectionWrap/sectionWrap';
import SectionSide from '../../../UI/Sections/SectionSide/sectionSide';
import SectionMain from '../../../UI/Sections/SectionMain/sectionMain';
import SectionHeader from '../../../UI/Sections/SectionHeader/sectionHeader';
import ClickArrows from '../ClickArrows/clickArrows';


const BarChartSection = ({
  handleSelectOneCounty,
  handleSelectData,
  handleSelectDate,
}) => {
  const storeSections = useStore()[0].sections[0];

  return (
    <SectionWrap>
      <SectionSide>
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
            />
          ) : null}
        </SectionHeader>
        <TextBox clickArrows={ClickArrows} />
        <AttributeBtns
          availableAttributes={storeSections.avail}
          handleSelectData={handleSelectData}
        />
      </SectionSide>

      <SectionMain background="var(--lightBlack)">
        <BarChart
          handleSelectOneCounty={handleSelectOneCounty}
          handleSelectDate={handleSelectDate}
        />
      </SectionMain>
    </SectionWrap>
  );
};

export default BarChartSection;
