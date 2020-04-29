import React, { useState } from 'react';
import * as d3 from 'd3';
import HoverRect from './hoverRect';

const HoverRectangles = ({
  graphData,
  width,
  height,
  margin,
  xScale,
  handleHoverDate,
  handleHoverLeaveDate,
  handleTextBox,
}) => {
  const [selectedRectDate, setSelectedRectDate] = useState('');

  // const someFn = (date) => {
  //   setSelectedRectDate(date);
  // };

  return graphData.data.length && graphData.selected
    ? graphData.data.map((attr, i) => {
        const graphWidth = width - margin.left - margin.right;
        const rectWidth = graphWidth / graphData.data.length;
        const x = xScale(attr.attributes[graphData.xAxisAttribute]);
        const xOffset = x - rectWidth / 2;
        const rect = {
          x: x,
          y: margin.top,
          graphWidth,
          rectWidth,
          height: height - margin.bottom,
          xOffset,
          key: `${graphData.fieldName}-${i}`,

          selected:
            selectedRectDate === attr.attributes[graphData.xAxisAttribute]
              ? true
              : false,
          date: attr.attributes[graphData.xAxisAttribute],
        };
        return x ? (
          <HoverRect
            rect={rect}
            attr={attr}
            graphData={graphData}
            handleHoverLeaveDate={handleHoverLeaveDate}
            handleHoverDate={handleHoverDate}
            handleTextBox={handleTextBox}
            selectRect={setSelectedRectDate}
            selected={rect.selected}
            date={rect.date}
          />
        ) : null;
      })
    : null;
};

export default HoverRectangles;
