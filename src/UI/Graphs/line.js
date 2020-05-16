import React from 'react';
import * as d3 from 'd3';

const Line = ({
  altGraphData,
  xScale,
  yScale,
  fieldName,
  color,
  xAxisAttribute,
}) => {
  const line = d3
    .line()
    .x((d) => xScale(d[xAxisAttribute]))
    .y((d) => yScale(d[fieldName]));

  const path = line(altGraphData);

  return (
    <path
      d={path}
      fill="none"
      stroke={color}
      id={fieldName}
      strokeWidth={altGraphData.selected ? '4px' : '2px'}
    ></path>
  );
};

export default Line;
