// Early Bar Chart - not used

import React, { useEffect, useRef, useState } from 'react';
import Layout from '../layout';
import * as d3 from 'd3';


const width = 600;
const height = 400;

// BAR CHART ===========================================

const margin = {
  top: 20,
  right: 5,
  bottom: 50,
  left: 35
};

const DailyChart2 = props => {
  const [dailyData] = useState(props.dailyData);

  const xAxisRef = useRef(null);
  const yAxisRef = useRef(null);
  const xAxis = d3.axisBottom()
  const yAxis = d3.axisLeft();

  // X-Data | Time | Remember this is in ms
  const [minDate, maxDate] = d3.extent(dailyData, d => d.attributes.Date);

  // // Y-Data | Today Cases
  // const [minCases, maxCases] = d3.extent( dailyData, d => d.attributes.TotalConfirmedCovidCases);

  // Color | Total Cases
  const minMaxTotalCases = d3.extent(dailyData, d => d.attributes.TotalConfirmedCovidCases);

  //X Scale: min and max of date
  const xScale = d3
    .scaleTime()
    .domain([new Date(minDate), new Date(maxDate)])
    .range([margin.left, width - margin.right])
  xScale.ticks(10);

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(dailyData, d => d.attributes.TotalConfirmedCovidCases)])
    .range([height - margin.bottom, margin.top])

  // Color: min max of total cases
  const colorScale = d3
    .scaleSequential() // .reverse() //fixes colors
    .domain(minMaxTotalCases)
    .interpolator(d3.interpolateRdYlBu);

  useEffect(() => {
    const x = xAxis.scale(xScale)
    const svgX = d3.select(xAxisRef.current);
    svgX.call(x)
    .selectAll("text")
    .attr("transform", "translate(-10,10)rotate(-45)")
    .style("text-anchor", "end")

    const y = yAxis.scale(yScale);
    const svgY = d3.select(yAxisRef.current);
    svgY.call(y);
  });

  const ans = dailyData.map(d => {
    return {
      x: xScale(new Date(d.attributes.Date)),
      y: yScale(d.attributes.TotalConfirmedCovidCases),
      fill: colorScale(d.attributes.TotalConfirmedCovidCases),
      height: height - margin.bottom - yScale(d.attributes.TotalConfirmedCovidCases)
    };
  });

  const mapChart = () => {
    return ans.map(a => (
      <rect
        key={a.x}
        width={4}
        height={a.height}
        x={a.x}
        y={a.y}
        fill={a.fill}
      />
    ));
  };

  return (
    <Layout>
      <h1>Daily Chart2 - Total Confirmed Cases</h1>
      <svg width={width} height={height} style={{background: 'pink'}}>
        <g
          ref={xAxisRef}
          transform={`translate(0, ${height - margin.bottom})`}
        />
        <g ref={yAxisRef} transform={`translate(${margin.left}, 0)`} />
        {mapChart()}
      </svg>
    </Layout>
  );
};

export default DailyChart2;
