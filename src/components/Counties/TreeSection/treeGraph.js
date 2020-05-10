import React, { useRef, useEffect, useCallback } from 'react';
import { useStore } from '../../../Store/store';
import CountyTiles from './countyTiles';
import { sharedUtil as util } from '../../../util-functions';

const ONE_DAY = 86400000;
const dimensions = {
  margin: {
    left: 70,
    right: 60,
    top: 60,
    bottom: 60,
  },
  width: 1000,
  height: 600,
};
const { width, height } = dimensions;

const TreeGraph = ({
  showProvinces,
  handleSelectOneCounty,
  isPlaying,
  setIsPlaying,
}) => {
  const storeSections = useStore()[0].sections[0];
  const dispatch = useStore()[1];
  const attribute = storeSections.selectedAttributeName;

  const incrementSelectedDate = useCallback(() => {
    let useDate = storeSections.selectedDate + ONE_DAY;
    const latestPossibleDate = util.getLatestDate(storeSections.allCounties[0]);
    if (storeSections.selectedDate < latestPossibleDate) {
      dispatch('SELECT_DATE', useDate);
      dispatch('UPDATE_ALL_COUNTIES_LATEST_DATA', useDate);
      return true;
    } else {
      setIsPlaying(false);
      return false;
    }
  }, [
    dispatch,
    setIsPlaying,
    storeSections.selectedDate,
    storeSections.allCounties,
  ]);

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        return incrementSelectedDate();
      }, 400);
      if (!interval) clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying, incrementSelectedDate]);

  // get colour corresponding to selected attribute (need it for countyTile colour)
  const selectedAttributeColor = storeSections.avail.filter(
    (data) => data.selected
  )[0].color;

  const svgRef = useRef();

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      ref={svgRef}
      width={width}
      style={{ background: 'var(--black)', maxWidth: '100%' }}
    >
      <CountyTiles
        graphData={storeSections.allCountiesLatestData}
        attribute={attribute}
        showProvinces={showProvinces}
        handleSelectOneCounty={handleSelectOneCounty}
        selectedAttributeColor={selectedAttributeColor}
        selectedCountyName={storeSections.allStatsAboutSelectedCounty.name}
      />
      ;
    </svg>
  );
};

export default TreeGraph;
