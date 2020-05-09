import React, { useState } from 'react';
import { useStore } from '../../../Store/store';
import TextBox from '../TextBox/textBox';
import SectionWrap from '../../../UI/Sections/SectionWrap/sectionWrap';
import SectionWrapSimple from '../../../UI/Sections/SectionWrapSimple/sectionWrapSimple';
import SectionSide from '../../../UI/Sections/SectionSide/sectionSide';
import SectionMain from '../../../UI/Sections/SectionMain/sectionMain';
import SectionHeader from '../../../UI/Sections/SectionHeader/sectionHeader';
import LoadingComp from '../../../UI/loading';
import BoringButton from '../../../UI/Buttons/boringButton';
// import Tree from './tree';
import TreeGraph from './treeGraph';
import ClickArrows from '../ClickArrows/clickArrows';
import AttributeBtns from '../SectionsUI/AttributeBtns/attributeBtns';
const TreeSection = ({
  handleSelectOneCounty,
  handleSelectData,
  handleSelectDate,
  isLoading,
}) => {
  const storeSections = useStore()[0].sections[0];
  const [showProvinces, setShowProvinces] = useState(false);
  return isLoading ? (
    <SectionWrapSimple minHeight="50vh">
      <LoadingComp />
    </SectionWrapSimple>
  ) : (
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
        {/* <Tree /> */}

        <BoringButton onClick={() => setShowProvinces(!showProvinces)}>
          {showProvinces ? 'Hide Provinces' : 'Show  Provinces'}
        </BoringButton>

        <TreeGraph
          showProvinces={showProvinces}
          handleSelectOneCounty={handleSelectOneCounty}
        />
        {/* <BarChart
              handleSelectOneCounty={handleSelectOneCounty}
              handleSelectDate={handleSelectDate}
              isLoading={isLoading}
            /> */}
      </SectionMain>
    </SectionWrap>
  );
};

export default TreeSection;
