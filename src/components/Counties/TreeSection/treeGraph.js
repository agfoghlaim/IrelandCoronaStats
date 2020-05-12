import React, { useRef, useEffect, useCallback } from 'react';
import { useStore } from '../../../Store/store';
import CountyTiles from './countyTiles';
import classes from './treeGraph.module.css';
import BoringButton from '../../../UI/Buttons/boringButton';

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
  setShowProvinces,
}) => {
  const storeSections = useStore()[0].sections[0];
  const attribute = storeSections.selectedAttributeName;

  // get colour corresponding to selected attribute (need it for countyTile colour)
  const selectedAttributeColor = storeSections.avail.filter(
    (data) => data.selected
  )[0].color;

  const svgRef = useRef();

  return (
    // <div className={classes.svgWrap}>
    <>
      <svg
        // viewBox puts it in line with line&bar graphs
        style={{ maxWidth: '100%' }}
        viewBox={`0 0 ${width} ${height}`}
        ref={svgRef}
        width={width}
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
      {/* <button className={classes.basicBtn} onClick={() => setShowProvinces(!showProvinces)}>{showProvinces ? 'Hide Provinces' : 'Show  Provinces'}</button> */}
      <BoringButton onClick={() => setShowProvinces(!showProvinces)} config={{position: 'absolute', right: '0', top: '-1rem', padding: '0.25rem 0.5rem', background:'var(--white)', color:'var(--lightBlack)'}}>
        {showProvinces ? 'Hide Provinces' : 'Show  Provinces'}
      </BoringButton>
    </>
    // </div>
  );
};

export default TreeGraph;
