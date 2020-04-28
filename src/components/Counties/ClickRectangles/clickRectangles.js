import React from 'react';
import ClickRect from './clickRect';

const ClickRectangles = ({graphData, dimensions, xScale, handleHoverDate, handleHoverLeaveDate, handleTextBox, handleSelectDate, selectedDate}) => {


  const {margin, width, height} = dimensions;

    return graphData.length 
      ? graphData.map((date, i) => {
      
          const graphWidth = width - margin.left - margin.right;
          const rectWidth = graphWidth / graphData.length;
          const x = xScale(date);
          const xOffset = x - rectWidth / 2;
          const rect = {
            x: x,
            y:  height - margin.bottom +1,
            y2: margin.top,
            y2Height: height - margin.bottom - margin.top,
            graphWidth,
            rectWidth,
            height: height - margin.bottom,
            xOffset,
            key: `${graphData.fieldName}-${i}`,
          };
          return x ? (
            <ClickRect
              rect={rect}
              date={date}
              selected={date === selectedDate}
              handleHoverLeaveDate={handleHoverLeaveDate}
              handleHoverDate={handleHoverDate}
              handleTextBox={handleTextBox}
              handleSelectDate={handleSelectDate}
            />
          ) : null;
        })
      : null;
}

export default ClickRectangles;