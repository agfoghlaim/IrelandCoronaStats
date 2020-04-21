import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';

const Line = ({
  graphData,
  i,
  handleHover,
  handleHoverLeave,
  handleSelectCounty,
  xScale,
  yScale,
  colorScale,
  selectedAttribute,

}) => {
  const [selectedAttr, setSelectedAttr] = useState(selectedAttribute);
  // const [selectedCountyName, setSelectedCountyName] = useState();
  // console.log(graphData)

  useEffect(() => {
    setSelectedAttr(selectedAttribute);
  }, [selectedAttribute, graphData]);

  const color = colorScale(graphData[i].FID);
  const line = d3
    .line()
    .x((d) => xScale(d['TimeStamp']))
    .y((d) => {
      return yScale(d[selectedAttr]);
    });

  const path = line(graphData);
  return (
    <path
      d={path}
      fill="none"
      stroke={color}
      strokeWidth="2px"
      onMouseOver={(e) => handleHover(e, graphData, color)}
      onMouseLeave={(e) => handleHoverLeave(e)}
      onClick={e=>handleSelectCounty(e, graphData[0].CountyName)}
    ></path>
  );
};

export default Line;
