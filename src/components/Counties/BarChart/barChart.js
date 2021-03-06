import React, { useState, useEffect, useRef, useCallback } from 'react';
import * as d3 from 'd3';
import classes from './barChart.module.css';
import { useStore } from '../../../Store/store';
import Rect from './rect';
import XAxisLabel from '../../../UI/Graphs/xAxisLabel';
import BoringButton from '../../../UI/Buttons/boringButton';
import LoadingComp from '../../../UI/loading';
import ErrorComp from '../../../UI/error';
const dimensions = {
  margin: {
    left: 70,
    right: 60,
    top: 60,
    bottom: 60,
  },
  width: 1000,
  height: 800,
};
const { margin, width, height } = dimensions;
const boringButtonStyle = (selectLogScale) => {
  return {
    background: `${selectLogScale ? 'var(--lightBlack)' : 'var(--covidGreen)'}`,
    color: `${selectLogScale ? 'var(--covidGreen)' : 'var(--lightBlack)'}`,
    borderRadius: ' 0.4rem',
    border: 'none',
    fontWeight: '800',
    letterSpacing: '0.1rem',
    textTransform: 'uppercase',
    fontSize: '0.6rem',
    padding: '0.5rem 1rem',
    outline: 'none',
    minWidth: '5rem',
    display: 'grid',
    alignSelf: 'center',
    justifySelf: 'center',
    cursor: 'pointer',
  };
};

const hoverStyle = (isHovered, hoverPosition) => {
  return {
    opacity: `${isHovered ? '1' : '0'}`,
    position: 'fixed',
    left: `${hoverPosition[0]}px`,
    top: `${hoverPosition[1]}px`,
    background: 'var(--black)',
    color: 'var(--white)',
    padding: '0.5rem 1rem',
    borderRadius: '0.4rem',
    fontSize: '0.6rem',
  };
};
const BarChart = ({ handleSelectOneCounty, isLoading, isError }) => {
  const storeSections = useStore()[0].sections[0];

  const attribute = storeSections.selectedAttributeName;
  const selectedData = storeSections.avail.filter((data) => data.selected)[0];

  const [selectLogScale, setSelectLogScale] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [hoverInfo, setHoverInfo] = useState();
  const [hoverPosition, setHoverPosition] = useState([]);

  // Refs
  const svgRef = useRef(null);
  const xAxisRef = useRef(null);
  const yAxisRef = useRef(null);

  const xExtent = d3.extent(
    storeSections.allCountiesLatestData,
    (county) => {
      if(!county) return 0;
      return county[attribute];
    }
  );

  const countyNamesForAxisLabel = storeSections.allCountiesLatestData.map(
    (c) => c.CountyName 
  );
  const xAxis = d3.axisBottom();
  const yAxis = d3.axisLeft();

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

  const toggleLogScale = () => {
    const currentLog = selectLogScale;
    setSelectLogScale(!currentLog);
  };

  const doAxis = useCallback(() => {
    const xRef = d3.select(xAxisRef.current);
    const yRef = d3.select(yAxisRef.current);

    const xTickWidth = -Math.abs(height - margin.top - margin.bottom);
    xAxis.scale(xScale).ticks(10, ',.1s');
    yAxis.scale(yScale);
    xRef.call(xAxis.tickSize(xTickWidth));
    yRef.call(yAxis);
  }, [yScale, xScale, xAxis, yAxis]);

  useEffect(() => {
    doAxis();
  }, [doAxis]);

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
  };

  const renderRectangles = () => {
    return storeSections.allCountiesLatestData.map((c) => {
      const numCounties = 26;
      const barHeight = (height - margin.top - margin.bottom) / numCounties;
      const y = yScale(c.CountyName);
      const barWidth = xScale(c[attribute]) - margin.left;
      const rect = {
        width: barWidth, 
        height: barHeight,
        y: y,

      }
      return (
        <Rect
          key={c.CountyName}
          allCountiesLatestData={c}
          rectangle={rect}
          localHandleSelectCounty={localHandleSelectCounty}
          classes={classes}
          handleHover={handleHover}
          handleHoverLeave={handleHoverLeave}
          width={barWidth}
          barHeight={barHeight}
          attribute={attribute}
          storeSections={storeSections}
          selectedData={selectedData}
          margin={margin}
          y={y}
        />
      );
    });
  };
  return (
    <>
      <BoringButton
        onClick={toggleLogScale}
        overRideStyle={boringButtonStyle()}
      >
        {selectLogScale ? 'Use Linear Scale' : 'Use Log Scale'}
      </BoringButton>

      {isHovered && hoverPosition.length ? (
        <div style={hoverStyle(isHovered, hoverPosition)}>
          {selectedData.name}: {hoverInfo}
        </div>
      ) : null}

      {isError ? (
        <ErrorComp msg="Could not load data for graph." />
      ) : isLoading ? (
        <LoadingComp />
      ) : (
        <svg
          className={classes.barChartSvg}
          viewBox={`-20 40 ${width} ${height}`}
          ref={svgRef}
          width={width}
        >
          <g
            ref={xAxisRef}
            transform={`translate(0,${
              dimensions.height - dimensions.margin.top
            })`}
          ></g>
          <g
            ref={yAxisRef}
            transform={`translate(${dimensions.margin.left}, 0)`}
          ></g>

          {storeSections.allCountiesLatestData &&
          selectedData &&
          storeSections.allCountiesLatestData.length ? (
            <>
              <g>{renderRectangles()}</g>
            </>
          ) : null}
          <XAxisLabel
            width={width}
            text={selectedData ? selectedData.xAxisDescription : ''}
            height={height}
            margin={margin}
          />
        </svg>
      )}
    </>
  );
};

export default BarChart;
