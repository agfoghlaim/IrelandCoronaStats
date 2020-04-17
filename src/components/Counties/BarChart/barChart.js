import React, { useState, useEffect, useRef, useCallback } from 'react';
import * as d3 from 'd3';
import classes from './barChart.module.css';
import Axios from 'axios';

// This is in bits because they've changed data to show all records ever for counties instead of one - the latest.

// const oneCountyAllFieldsUrl = `https://services1.arcgis.com/eNO7HHeQ3rUcBllm/arcgis/rest/services/Covid19CountyStatisticsHPSCIrelandOpenData/FeatureServer/0/query?where=CountyName=%27Clare%27&1%3D1&outFields=*&f=json`;

const BarChart = ({ cases, theData, handleSelectOneCounty, selectedCountyName }) => {
//  console.log(theData)
  const margin = {
    left: 70,
    right: 60,
    top: 60,
    bottom: 60,
  };
  const width = 800;
  const height = 800;
  
  // state
  const [availData] = useState(theData);
  const [toUse, setToUse] = useState(theData[0].data);
  const [toUseInfo, setToUseInfo] = useState();
  const [attribute, setAttribute] = useState(theData[0].fieldName);
  const [selectLogScale, setSelectLogScale] = useState(true);
  // const [hoverRef, isHovered] = useHover();
  const [isHovered, setIsHovered] = useState(false);
  const [hoverInfo, setHoverInfo] = useState();
  const [hoverPosition, setHoverPosition] = useState([]);
  const [localIsSelectedCounty, setLocalIsSelectedCounty] = useState(selectedCountyName);

  const xExtent = d3.extent(toUse, (county) => county[attribute]);
  const countyNamesForAxisLabel = toUse.map((c) => c.CountyName);

  const svgRef = useRef(null);
  const xAxisRef = useRef(null);
  const yAxisRef = useRef(null);

  const xAxis = d3.axisBottom();
  const yAxis = d3.axisLeft();

  const toggleLogScale = () => {
    const currentLog = selectLogScale;
    setSelectLogScale(!currentLog);
  };
  const yScale = d3
    .scaleBand()
    .domain(countyNamesForAxisLabel)
    .range([height - margin.top, margin.bottom]);

  const getXScale = () => {
    if (selectLogScale) {
      return d3
        .scaleLog()
        .domain([1, Math.max(10000, xExtent[1])])
        .clamp(true)
        .range([margin.left, width - margin.right])
        .nice();
    } else {
      return d3
        .scaleLinear()
        .domain(xExtent)
        .clamp(true)
        .range([margin.left, width - margin.right]);
    }
  };
  const xScale = getXScale();
  const doAxis = useCallback(
    () => {
      const xRef = d3.select(xAxisRef.current);
      const yRef = d3.select(yAxisRef.current);
      const yTickWidth = -Math.abs(width - margin.right - margin.left);
      const xTickWidth = -Math.abs(height - margin.top - margin.bottom);
      xAxis.scale(xScale).ticks(10, ',.1s');
      yAxis.scale(yScale);
      xRef.call(xAxis.tickSize(xTickWidth));
      yRef.call(yAxis);
    },
    [margin, yScale, xScale, xAxis, yAxis]
  );

  useEffect(() => {
    const doSetSelectedAttribute = () => {
      const selected = theData.filter((data) => data.selected)[0];
      if (selected && selected.fieldName) {
        setAttribute(selected.fieldName);
      }
    };
    doSetSelectedAttribute();
    doAxis();
  }, [theData, doAxis]);

  useEffect(() => {
    const selectedData = availData.filter((data) => data.selected)[0];
    setToUse(selectedData.data);
    setToUseInfo(selectedData); // don't need selectedData.data too but this is easier.
  }, [attribute, theData, availData]);

  const handleHover = (e, info) => {

    setHoverInfo(info);

    const xP = e.clientX + 20;
    const yP = e.clientY - 10;
    setHoverPosition([xP, yP]);
    setIsHovered(true);
  };
  const handleHoverLeave = () => {
    setIsHovered(false);
  };

  const localHandleSelectCounty = (county) => {
    handleSelectOneCounty(county);
    setLocalIsSelectedCounty(county);
  } 

  const renderRectangles = () => {

    return toUse.map((c) => {
      
      const numCounties = 26;
      const barHeight = (height - margin.top - margin.bottom) / numCounties;
      const y = yScale(c.CountyName);
      const length = xScale(c[attribute]) - margin.left;

      return (
        <g key={c.CountyName}>
          <rect
            onClick={()=>localHandleSelectCounty(c.CountyName)}
            className={classes.barChartRect}
            onMouseEnter={(e) => handleHover(e, c[attribute])}
            onMouseLeave={(e) => handleHoverLeave(e)}
            width={length}
            height={barHeight}
            strokeWidth="1"
            stroke="var(--white)"
            fill={toUseInfo.color}
            opacity={`${c.CountyName === localIsSelectedCounty ? 1 : 0.75}`}
            x={margin.left}
            y={y}
          ></rect>
        </g>
      );
    });
  };
  return (
    <div className={classes.svgWrap}>
 
      {isHovered && hoverPosition.length ? (
        <div
          style={{
            opacity: `${isHovered ? '1' : '0'}`,
            position: 'fixed',
            left: `${hoverPosition[0]}px`,
            top: `${hoverPosition[1]}px`,
            background: 'var(--black)',
            color: 'var(--white)',
            padding: '0.5rem 1rem',
            borderRadius: '0.4rem',
            fontSize: '0.6rem',
          }}
        >
          {toUseInfo.name}: {hoverInfo}
        </div>
      ) : null}
     
      <button onClick={toggleLogScale}>
        {selectLogScale ? 'Use Linear Scale' : 'Use Log Scale'}
      </button>
      <svg viewBox={`0 0 ${width} ${height}`} ref={svgRef}  width={width} height={height}>
        <g
          ref={xAxisRef}
          transform={`translate(0,${height - margin.bottom})`}
        ></g>
        <g ref={yAxisRef} transform={`translate(${margin.left}, 0)`}></g>
        {toUse && toUseInfo && toUse.length ? (
          <>
            <g>{renderRectangles()}</g>
          </>
        ) : null}
        {/* <text>desc</text> */}
      </svg>
        <div className={classes.xAxisDescription}>{ toUseInfo ? toUseInfo.xAxisDescription : ''}</div>
      
    </div>
  );
};

export default BarChart;
