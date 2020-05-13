import React  from 'react';
import * as d3 from 'd3';


const Line = ({
  graphData,
  handleHover,
  handleHoverLeave,
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

  return (
    <path
      d={path}
      fill="none"
      stroke={color}
      id={fieldName}
      strokeWidth={graphData.selected ? '4px' : '2px'}
      onMouseOver={(e) => handleHover(e, color)}
      onMouseLeave={(e) => handleHoverLeave(e)}
 
    ></path>
  );
};

export default Line;
