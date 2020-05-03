import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';

const Line = ({
  graphData,
  handleHover,
  handleHoverLeave,
  handleSelectCounty,
  xScale,
  yScale,
  selectedAttribute,
}) => {
  const [selectedAttr, setSelectedAttr] = useState(selectedAttribute);

  useEffect(() => {
    setSelectedAttr(selectedAttribute);
  }, [selectedAttribute, graphData]);

  
  const line = d3
    .line()
    .x((d) => xScale(d['TimeStampDate']))
    .y((d) => {
      return yScale(d[selectedAttr]);
    });

  const path = line(graphData.stats);
  
  return  (
    <path
      d={path}
      fill="none"
      stroke={graphData.color}
      // stroke={graphData.selected ? 'var(--white)' : graphData.color}
      opacity={graphData.selected ? '1' : '0.2'}
      strokeWidth={graphData.selected ? '4px' : '2px'}
      onMouseOver={(e) => handleHover(e, graphData)}
      onMouseLeave={(e) => handleHoverLeave(e)}
      onClick={(e) => handleSelectCounty(e, graphData.name)}
    ></path>
  ) 
};

export default Line;
