import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import classes from './lineGraph.module.css';

const margin = {
  left: 50,
  right: 50,
  top: 50,
  bottom: 50,
};
const width = 800;
const height = 600;

const LineGraph = ({ data, name, handleTextBox, title }) => {
  const selectedAttribute = name;


  const svgRef = useRef(null);
  const xAxisRef = useRef(null);
  const yAxisRef = useRef(null);
  const xAxis = d3.axisBottom();
  const yAxis = d3.axisLeft();

  const [xExtent] = useState(
    d3.extent(data, (d) => d.attributes.StatisticsProfileDate)
  );
  const [yExtent, setYExtent] = useState(
    d3.extent(data, (d) => {
      return d.attributes[selectedAttribute];
    })
  );

  const xScale = d3
    .scaleTime()
    .domain([xExtent[0], xExtent[1]])
    .range([margin.left, width - margin.right]);

  const yScale = d3
    .scaleLinear()
    .domain([Math.min(yExtent[0], 0), yExtent[1]])
    .range([height - margin.top, margin.bottom]);
 
  const yTickWidth = -Math.abs(width - margin.right - margin.left);

  const xTickWidth = -Math.abs(height - margin.top - margin.bottom);
  const doAxis = () => {
    const xRef = d3.select(xAxisRef.current);
    const yRef = d3.select(yAxisRef.current);
    xAxis.scale(xScale).ticks(d3.timeDay.every(1));
    yAxis.scale(yScale).ticks(20);
    xRef.call(xAxis.tickSize(xTickWidth));
    yRef.attr('className', 'what').call(yAxis.tickSize(yTickWidth));
  };

  useEffect(() => {
    doAxis();
  });

  useEffect(() => {
    const newYExtent = d3.extent(data, (d) => d.attributes[selectedAttribute]);
    setYExtent(newYExtent);
  }, [data, selectedAttribute]);


  const doCircles = () => {

    return data.map((d,i) => {
  
      const y = yScale(d.attributes[selectedAttribute]);
      const x = xScale(d.attributes.StatisticsProfileDate);
      if( y && x) {
        return (
         
            <circle
              className={classes.lineGraphCircle}
              onClick={() => handleTextBox(d)}
              cx={x}
              cy={y}
              key={`${d.StatisticsProfileDate}-${i}`}
              r="0.4rem"
              fill="var(--blue)"
            ></circle>
          
        );
      }

    });
  };

  const doLine = () => {
    const line = d3
      .line()
      .x((d) => xScale(d.attributes.StatisticsProfileDate))
      .y((d) => yScale(d.attributes[selectedAttribute]));
    // .curve(d3.curveCardinal);
    const path = line(data);
    return (
      <path
        key={data[0].attributes.StatisticsProfileDate}
        d={path}
        fill="none"
        stroke="var(--purple)"
        strokeWidth="2px"
      ></path>
    );
  };

  // console.log(data);
  return (
    <div className={classes.svgWrap}>
      <h4>{title}</h4>
      <svg ref={svgRef} viewBox="0 0 800 600" width={width} height={height}>
      <text fill="var(--black)" x={-Math.abs(height/2+100)} y="20" style={{transform: 'rotate(-90deg)'}} className={classes.yLabel}>#cases</text>
        {doLine()}
        {doCircles()}
        <g
          className={classes.lineChartXAxis}
          ref={xAxisRef}
          transform={`translate(0,${height - margin.top})`}
        ></g>
        <g ref={yAxisRef} transform={`translate(${margin.left}, 0)`}></g>
       
      </svg>
    </div>
  );
};

export default LineGraph;


