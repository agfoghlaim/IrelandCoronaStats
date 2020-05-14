import React, { useState } from 'react';
import HoverRect from './hoverRect';

const HoverRectangles = ({
  graphData,
  dimensions,
  xScale,
  handleHoverDate,
  xAxisAttribute,
  handleHoverLeaveDate,
  handleTextBox,
}) => {

  const [selectedRectDate, setSelectedRectDate] = useState('');
  const { width, height, margin } = dimensions;

  return graphData.length
    ? graphData.map((attr, i) => {
        const graphWidth = width - margin.left - margin.right;
        const rectWidth = graphWidth / graphData.length;
        const x = xScale(attr[xAxisAttribute]);
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
            selectedRectDate === attr[xAxisAttribute]
              ? true
              : false,
          date: attr[xAxisAttribute],
        };
        return x ? (
          <HoverRect
            rect={rect}
            attr={attr}
            key={attr[xAxisAttribute]}
            handleHoverLeaveDate={handleHoverLeaveDate}
            handleHoverDate={handleHoverDate}
            handleTextBox={handleTextBox}
            xAxisAttribute={xAxisAttribute}
            selectRect={setSelectedRectDate}
            selected={rect.selected}
            date={rect.date}
          />
        ) : null;
      })
    : null;
};

export default HoverRectangles;
