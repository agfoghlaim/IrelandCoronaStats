import React, { useRef } from 'react';
import { useStore } from '../../../Store/store';
import CountyTiles from './countyTiles';

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

  

const TreeGraph = ({showProvinces, handleSelectOneCounty}) => {

  const storeSections = useStore()[0].sections[0];
  const attribute = storeSections.selectedAttributeName;

  // get colour corresponding to selected attribute (need it for countyTile colour)
  const selectedAttributeColor = storeSections.avail.filter((data) => data.selected)[0].color;


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
        selectedCountyName={storeSections.newSelectedCounty.name}
 
      />
      ;
    </svg>
  );
};

export default TreeGraph;
