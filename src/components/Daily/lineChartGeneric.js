import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import classes from './lineChartGeneric.module.css';
import HoverTextBox from './HoverTextBox';

const margin = {
  left: 50,
  right: 50,
  top: 50,
  bottom: 50,
};

const width = 800;
const height = 600;

const LineChartGeneric = ({ dataToShow }) => {
  const [data] = useState(dataToShow);
  const dataAttrs = [
    { title: 'percentageChange', display: 'Daily Percentage Change' },
    { title: 'todaysCases', display: 'Daily Cases' },
    { title: 'totalSoFar', display: 'Total' },
  ];

  const [selectedAttribute, setSelectedAttribute] = useState('todaysCases');
  const [xExtent] = useState(d3.extent(data, (d) => d.date));
  const [yExtent, setYExtent] = useState(
    d3.extent(data, (d) => d[selectedAttribute])
  );
  const [shouldShowHoverTextBox, setShouldSetShowHoverTextBox] = useState(true);
  const [selectedDayData, setSelectedDayData] = useState({});

  const svgRef = useRef(null);
  const xAxisRef = useRef(null);
  const yAxisRef = useRef(null);
  const xAxis = d3.axisBottom();
  const yAxis = d3.axisLeft();

  const getNewestData = () => {
    const datesOnly = data.map((d) => new Date(d.date).getTime());

    const newestDate = Math.max(...datesOnly);

    const ans = data.filter((d) => new Date(d.date).getTime() === newestDate);

    return ans[0];
  };

  useEffect(() => {
    const newestData = getNewestData();
    setSelectedDayData(newestData);
  }, []);

  const handleShowTextBox = (x, y, data) => {
    console.log(data);
    setSelectedDayData(data);
    setShouldSetShowHoverTextBox(true);
  };
  // TODO - rename, no hovering involved now
  const showHoverTextbox = (x, y, data) => {
    return (
      <div className={classes.hoverTextBoxWrap}>
        <HoverTextBox
          todaysData={selectedDayData}
          show={shouldShowHoverTextBox}
        />
      </div>
    );
  };
  useEffect(() => {
    doAxis();
  });

  useEffect(() => {
    const newYExtent = d3.extent(data, (d) => d[selectedAttribute]);
    setYExtent(newYExtent);
  }, [selectedAttribute, data]);

  const renderButtons = () => {
    return dataAttrs.map((attr) => (
      <button
        key={attr.title}
        className={classes.btn}
        onClick={() => switchAttr(attr.title)}
      >
        {attr.display}
      </button>
    ));
  };

  const switchAttr = (attr) => {
    setSelectedAttribute(attr);
    const newYExtent = d3.extent(data, (d) => d[selectedAttribute]);
    setYExtent(newYExtent);
  };

  const xScale = d3
    .scaleTime()
    .domain([xExtent[0], xExtent[1]])
    .range([margin.left, width - margin.right]);

  const yScale = d3
    .scaleLinear()
    .domain([Math.min(yExtent[0]), yExtent[1]])
    .range([height - margin.top, margin.bottom]);

  const yTickWidth = -Math.abs(width - margin.right - margin.left);

  const xTickWidth = -Math.abs(height - margin.top - margin.bottom);

  const doAxis = () => {
    const xRef = d3.select(xAxisRef.current);
    const yRef = d3.select(yAxisRef.current);
    xAxis.scale(xScale).ticks(d3.timeDay.every(1));
    yAxis.scale(yScale).ticks(20);
    // xRef.call(xAxis);
    xRef.call(xAxis.tickSize(xTickWidth));
    yRef.attr('className', 'what').call(yAxis.tickSize(yTickWidth));
  };

  const doCircles = () => {
    return data.map((d) => {
      const y = yScale(d[selectedAttribute]);
      const x = xScale(d.date);

      return (
        <circle
          className={classes.lineGraphCircle}
          onClick={() => handleShowTextBox(x, y, d)}
          cx={x}
          cy={y}
          key={`${d.date}`}
          r="0.4rem"
          fill="var(--blue)"
        ></circle>
      );
    });
  };

  const dailyLine = () => {
    const line = d3
      .line()
      .x((d) => xScale(d.date))
      .y((d) => yScale(d[selectedAttribute]));
    // .curve(d3.curveCardinal);

    const path = line(data);
    return (
      <path
        d={path}
        fill="none"
        stroke="var(--purple)"
        strokeWidth="2px"
      ></path>
    );
  };

  return (
    <div className={classes.lineChartWrap}>
      <div className={classes.lineChartLeftWrap}>
        <div className={classes.sectionHeader}>
          <h2>
            {dataAttrs.filter((d) => d.title === selectedAttribute)[0].display}
          </h2>
        </div>
        {shouldShowHoverTextBox ? showHoverTextbox() : null}
        <div className={classes.btnGroup}>{renderButtons()}</div>
      </div>
      <div className={classes.svgWrap}>
        <svg ref={svgRef} viewBox="0 0 800 600" width={width} height={height}>
          <g
            className={classes.lineChartXAxis}
            ref={xAxisRef}
            transform={`translate(0,${height - margin.top})`}
          ></g>
          <g
            className={classes.lineChartYAxis}
            ref={yAxisRef}
            transform={`translate(${margin.left}, 0)`}
          ></g>
          {dailyLine()}
          {doCircles()}
        </svg>
      </div>
    </div>
  );
};

export default LineChartGeneric;
