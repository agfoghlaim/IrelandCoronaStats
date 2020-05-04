import React, { useState, useEffect, useRef, useCallback } from 'react';
import * as d3 from 'd3';
import classes from './barChart.module.css';
import { useStore } from '../../../Store/store';
import XAxisLabel from '../../../UI/Graphs/xAxisLabel';
import BoringButton from '../../../UI/Buttons/boringButton';
import LoadingComp from '../../../UI/loading';
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

const BarChart = ({ handleSelectOneCounty, isLoading }) => {
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
    (county) => county[attribute]
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
      const length = xScale(c[attribute]) - margin.left;

      return (
        <g key={c.CountyName}>
          <rect
            onClick={() => localHandleSelectCounty(c.CountyName)}
            className={classes.barChartRect}
            onMouseEnter={(e) => handleHover(e, c[attribute])}
            onMouseLeave={(e) => handleHoverLeave(e)}
            width={length}
            height={barHeight}
            strokeWidth="1"
            stroke={
              c.CountyName === storeSections.newSelectedCounty.name
                ? selectedData.color
                : 'var(--white)'
            }
            fill={
              c.CountyName === storeSections.newSelectedCounty.name
                ? 'var(--white)'
                : selectedData.color
            }
            opacity={`${
              c.CountyName === storeSections.newSelectedCounty.name ? 1 : 0.75
            }`}
            x={margin.left}
            y={y}
          ></rect>
        </g>
      );
    });
  };
  return (
    <div className={(classes.svgWrap, classes.barChartSvgWrap)}>
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
          {selectedData.name}: {hoverInfo}
        </div>
      ) : null}

      <BoringButton onClick={toggleLogScale} config={{ minWidth: '8rem' }}>
        {' '}
        {selectLogScale ? 'Use Linear Scale' : 'Use Log Scale'}
      </BoringButton>
      {isLoading ? (
        <LoadingComp />
      ) : (
        <svg viewBox={`0 0 ${width} ${height}`} ref={svgRef} width={width}>
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
    </div>
  );
};

export default BarChart;
