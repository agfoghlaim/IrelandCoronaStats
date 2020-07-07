import React from 'react';
import SectionHeader from '../../../UI/Sections/SectionHeader/sectionHeader';
import ClickArrows from '../ClickArrows/clickArrows';

const CountiesSideSectionHeader = ({
  storeSections,
  isPlaying,
  setIsPlaying,
  handleSelectDate,
}) => {
  return (
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
          justDates={storeSections.allCounties[0].stats.map((s) => {
            return s.TimeStamp;
          })}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
        />
      ) : null}
    </SectionHeader>
  );
};

export default CountiesSideSectionHeader;
