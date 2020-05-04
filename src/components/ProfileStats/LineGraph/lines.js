import React from 'react'
import * as d3 from 'd3';

const Lines = ({data, xScale, yScale}) => {

    const ans = data.map((graphData) => {
      if (graphData.data.length && graphData.selected) {
        const line = d3
          .line()
          // .x((d) => xScale(d.attributes.StatisticsProfileDate))
          .x((d) => xScale(d[graphData.xAxisAttribute]))
          .y((d) => yScale(d[graphData.fieldName]));
  
        const path = line(graphData.data);
        return  (
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
    return ans;
  
  
}

export default Lines;