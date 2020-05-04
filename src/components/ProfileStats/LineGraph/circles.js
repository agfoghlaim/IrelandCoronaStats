import React from 'react';
import classes from './circles.module.css';

const Circles = ({
  data,
  yScale,
  xScale,
  handleTextBox,
  handleHover,
  handleHoverLeave,
}) => {
  return data.map((graphData) => {
    return graphData.data.length && graphData.selected
      ? graphData.data.map((attr, i) => {
          const y = yScale(attr[graphData.fieldName]);
          const x = xScale(attr[graphData.xAxisAttribute]);
          // console.log(data,data.useDifferentShape)
          return x && y && !graphData.useDifferentShape ? (
            <circle
              key={`${graphData.fieldName}-${i}`}
              className={classes.lineGraphCircle}
              onClick={() => handleTextBox(attr, graphData.xAxisAttribute)}
              onMouseEnter={(e) => handleHover(e, attr, graphData)}
              onMouseLeave={(e) => handleHoverLeave(e)}
              cx={x}
              cy={y}
              r="0.3rem"
              fill={graphData.color}
            ></circle>
          ) : x && y && graphData.useDifferentShape ? (
            <rect
              key={`${graphData.fieldName}-${i}`}
              className={classes.lineGraphCircle}
              onClick={() => handleTextBox(attr, graphData.xAxisAttribute)}
              onMouseEnter={(e) => handleHover(e, attr, graphData)}
              onMouseLeave={(e) => handleHoverLeave(e)}
              x={x}
              y={y}
              rx="0.1rem"
              width="0.2rem"
              height="0.6rem"
              fill={graphData.color}
            ></rect>
          ) : null;
        })
      : null;
  });
};

export default Circles;
