import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import classes from './axis.module.css';

const Axis = ({ dimensions, xScale, yScale, yTransformOffset = 0 }) => {
  const xAxisRef = useRef(null);
  const yAxisRef = useRef(null);
  const xAxis = d3.axisBottom();
  const yAxis = d3.axisLeft();
  const yTickWidth = -Math.abs(
    dimensions.width - dimensions.margin.right - dimensions.margin.left
  );
  const xTickWidth = -Math.abs(
    dimensions.height - dimensions.margin.top - dimensions.margin.bottom
  );

  useEffect(() => {
    doAxis();
  });

  const doAxis = () => {
    const xRef = d3.select(xAxisRef.current);
    const yRef = d3.select(yAxisRef.current);
    xAxis.scale(xScale).ticks(d3.timeDay.every(3));

    // yAxis.scale(yScale).ticks(10, ',.0f');
    yAxis.scale(yScale).ticks(10, ',.1s');

    xRef.call(xAxis.tickSize(xTickWidth));
    yRef.call(yAxis.tickSize(yTickWidth));
  };

  return (
    <>
      <g
        ref={xAxisRef}
        className={classes.axisGroupX}
        transform={`translate(0,${
          dimensions.height - dimensions.margin.top + yTransformOffset
        })`}
      ></g>
      <g
        ref={yAxisRef}
        className={classes.axisGroupY}
        transform={`translate(${dimensions.margin.left}, 0)`}
      ></g>
    </>
  );
};

export default Axis;
