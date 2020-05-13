import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import classes from './tinyAxis.module.css';

const TinyAxis = ({ dimensions, xScale, yScale }) => {
  const xTinyAxisRef = useRef(null);
  const yTinyAxisRef = useRef(null);
  const xAxis = d3.axisTop();
  const yAxis = d3.axisLeft();
 
  useEffect(() => {
    doAxis();
  });

  const doAxis = () => {
    const xRef = d3.select(xTinyAxisRef.current);
    const yRef = d3.select(yTinyAxisRef.current);
    xAxis.scale(xScale).ticks(d3.timeDay.every(90));
    yAxis.scale(yScale).ticks(2,',.0f');

    xRef.call(xAxis.tickSize(10).tickFormat(d3.timeFormat("%b")))
    yRef.call(yAxis.tickSize(10));
  };

  return (
    <>
      <g
        ref={xTinyAxisRef}
        className={classes.tinyAxisGroupX}
        transform={`translate(0,${dimensions.height - dimensions.margin.top})`}
      ></g>
      <g
        ref={yTinyAxisRef}
        className={classes.tinyAxisGroupY}
        transform={`translate(${dimensions.width-dimensions.margin.left}, 0)`}
      ></g>
    </>
  );
};

export default TinyAxis;
