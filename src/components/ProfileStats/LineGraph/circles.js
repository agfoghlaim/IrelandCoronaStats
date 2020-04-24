import React from 'react';
import * as d3 from 'd3';
import classes from './circles.module.css';

const Circles = ({data, yScale, xScale, handleTextBox, handleHover, handleHoverLeave}) => {
  return data.map(graphData=>{
    return graphData.data.length && graphData.selected
    ? graphData.data.map((attr, i) => {
        const y = yScale(attr.attributes[graphData.fieldName]);
        const x = xScale(attr.attributes[graphData.xAxisAttribute]);

        return x && y ? (
          <circle
            key={`${graphData.fieldName}-${i}`}
            className={classes.lineGraphCircle}
            onClick={() =>
              handleTextBox(attr, graphData.fieldName, graphData)
            }
            onMouseEnter={(e) => handleHover(e, attr, graphData)}
            onMouseLeave={(e) => handleHoverLeave(e)}
            cx={x}
            cy={y}
            r="0.3rem"
            fill={graphData.color}
          ></circle>
        ) : null;
      })
    : null;
  })
}

export default Circles;