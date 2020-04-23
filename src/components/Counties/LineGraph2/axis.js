import React, { useRef, useState, useEffect } from 'react';
import * as d3 from 'd3';


const Axis = ({ dimensions, xScale, yScale }) => {
  // const [xExtent, setXExtent] = useState([]);

  // // so axis renders 'first' time
  // useEffect(() => {
  //   setXExtent(xExt);
  // }, []);

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


  const doAxis = () => {
    const xRef = d3.select(xAxisRef.current);
    const yRef = d3.select(yAxisRef.current);
    xAxis.scale(xScale).ticks(d3.timeDay.every(3));
    yAxis.scale(yScale).ticks(20, ',.1s');
    xRef.call(xAxis.tickSize(xTickWidth));
    yRef.call(yAxis.tickSize(yTickWidth));
  };
  doAxis();


  return (
    <>
      <g
        ref={xAxisRef}
        transform={`translate(0,${dimensions.height - dimensions.margin.top})`}
      ></g>
      <g
        ref={yAxisRef}
        transform={`translate(${dimensions.margin.left}, 0)`}
      ></g>
    </>
  );
};

export default Axis;
