import React,  {useRef, useState, useEffect} from 'react';
import * as d3 from 'd3';


const dimensions = {
  margin: {
    left: 50,
    right: 50,
    top: 50,
    bottom: 50,
  },
  width: 800,
  height: 600
}
const Axis = ({xExt}) => {

  const [xExtent, setXExtent] = useState([]);

  // so axis renders 'first' time
  useEffect(()=>{
    setXExtent(xExt);
  },[]);
  
  const xAxisRef = useRef(null);
  const yAxisRef = useRef(null);
  const xAxis = d3.axisBottom();
  const yAxis = d3.axisLeft();
  const yTickWidth = -Math.abs(dimensions.width - dimensions.margin.right - dimensions.margin.left);
  const xTickWidth = -Math.abs(dimensions.height - dimensions.margin.top - dimensions.margin.bottom);
  const xScale = d3
  .scaleTime()
  .domain([xExtent[0], xExtent[1]])
  .range([dimensions.margin.left, dimensions.width - dimensions.margin.right]);

const yScale = d3
  .scaleLog()
  .domain([1, 20000])
  .clamp(true)
  .range([dimensions.height - dimensions.margin.top, dimensions.margin.bottom])
  .nice();

  const doAxis = () => {
    const xRef = d3.select(xAxisRef.current);
    const yRef = d3.select(yAxisRef.current);
    xAxis.scale(xScale).ticks(d3.timeDay.every(3));
    yAxis.scale(yScale).ticks(20, ',.1s');
    xRef.call(xAxis.tickSize(xTickWidth));
    yRef.attr('className', 'what').call(yAxis.tickSize(yTickWidth));
  };
  doAxis();

  return (
    <>
      <g
        ref={xAxisRef}
        transform={`translate(0,${dimensions.height - dimensions.margin.top})`}
      ></g>
      <g ref={yAxisRef} transform={`translate(${dimensions.margin.left}, 0)`}></g>
    </>
  );
};

export default Axis;
