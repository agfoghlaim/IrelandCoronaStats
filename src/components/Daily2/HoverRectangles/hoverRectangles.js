import React from 'react';
import * as d3 from 'd3';
import HoverRect from './hoverRect';

const HoverRectangles = ({graphData, width, height, margin, xScale, handleHoverDate, xAxisAttr, handleHoverLeaveDate, handleTextBox}) => {
  // const graphData = data[0]; // do once
  // console.log(graphData)
    return graphData.length 
      ? graphData.map((attr, i) => {
          const graphWidth = width - margin.left - margin.right;
          const rectWidth = graphWidth / graphData.length;
          const x = xScale(attr[xAxisAttr]);
          // console.log(attr, graphData)
          const xOffset = x - rectWidth / 2;
          const rect = {
            x: x,
            y: margin.top,
            graphWidth,
            rectWidth,
            height: height - margin.bottom,
            xOffset,
            key: `${graphData.fieldName}-${i}`,
          };
          return x ? (
            <HoverRect
              rect={rect}
              attr={attr}
              
              graphData={graphData}
              handleHoverLeaveDate={handleHoverLeaveDate}
              handleHoverDate={handleHoverDate}
              handleTextBox={handleTextBox}
            />
          ) : null;
        })
      : null;
}

export default HoverRectangles;