import React from 'react'
import * as d3 from 'd3';

const Lines = ({data, xScale, yScale}) => {
  return data.map((graphData) => {
    if (graphData.data.length && graphData.selected) {
      const line = d3
        .line()
        // .x((d) => xScale(d.attributes.StatisticsProfileDate))
        .x((d) => xScale(d.attributes[graphData.xAxisAttribute]))
        .y((d) => yScale(d.attributes[graphData.fieldName]));

      const path = line(graphData.data);
      return (
        <path
          key={graphData.fieldName}
          d={path}
          fill="none"
          stroke={graphData.color}
          strokeWidth="2px"
        ></path>
      );
    }
  });
}

export default Lines;