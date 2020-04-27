import React, { useState, useEffect, useMemo } from 'react';
import * as d3 from 'd3';


const Line = ({
  graphData,
  handleHover,
  handleHoverLeave,
  handleSelectCounty,
  xScale,
  yScale,
  fieldName,
  color,

}) => {

  
  const line = d3
    .line()
    .x((d) => xScale(d['Date']))
    .y((d) => {
      return yScale(d[fieldName]);
    });

  const path = line(graphData);

    // console.log(graphData)
  return (
    <path
      d={path}
      fill="none"
      stroke={color}
      id={fieldName}
      // opacity={graphData.selected ? '1' : '1'}
      strokeWidth={graphData.selected ? '4px' : '2px'}
      onMouseOver={(e) => handleHover(e, color)}
      onMouseLeave={(e) => handleHoverLeave(e)}
      onClick={(e) => handleSelectCounty(e, graphData.name)}
    ></path>
  );
};

export default Line;
