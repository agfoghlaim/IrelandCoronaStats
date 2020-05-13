import React, { useState } from 'react';
import TinySvgLine from './tinySvgLine';
import classes from './summaryBox.module.css';
import * as d3 from 'd3';

const dimensions = {
  margin: {
    left: 10,
    right: 10,
    top: 10,
    bottom: 10,
  },
  width: 200,
  height: 100,
};
const { margin, width, height } = dimensions;
const SummaryBox = ({
  fieldName,
  yesterdayFieldName,
  niceStats,
  latest,
  text,
  shortTitle,
  dateField,
  svgLineFieldName,
}) => {

  const [isLogScale, setIsLogScale] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [hoverInfo, setHoverInfo] = useState('');

  // better performance?. Can still get the shape of the graph with this
  const shortStatsForPerformance = niceStats.filter((stat, i) => i % 3 === 0);
  const xExtent = d3.extent(shortStatsForPerformance, (d) => d.Date);

  const updateInfo = () => {
    setHoverInfo(`${shortTitle} ${isLogScale ? '(Log)' : '(Linear)'}`);
  };

  const handleMouseIn = (e, what) => {
    updateInfo();
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };

  const handleClick = (e, what) => {
    updateInfo();
    setIsLogScale(!isLogScale);
  };

  const xScale = d3
    .scaleTime()
    .domain([xExtent[0], xExtent[1]])
    .range([margin.left, width - margin.right]);

  const yExtent = d3.extent(
    shortStatsForPerformance,
    (d) => d.ConfirmedCovidCases
  );

  const getYScale = () => {
    let yScale = d3
      .scaleLog()
      .domain(yExtent)
      .clamp(true)
      .range([height - margin.top, margin.bottom])
      .nice();

    if (!isLogScale) {
      yScale = d3
        .scaleLinear()
        .domain(yExtent)
        .clamp(true)
        .range([height - margin.top, margin.bottom])
        .nice();
    }
    return yScale;
  };

  return (
    <div className={classes.summaryBox} style={{ position: 'relative' }}>
      <TinySvgLine
        shortStatsForPerformance={shortStatsForPerformance}
        xScale={xScale}
        yScale={getYScale()}
        handleClick={handleClick}
        mouseEnter={handleMouseIn}
        mouseLeave={handleMouseOut}
        fieldName={svgLineFieldName}
        dimensions={dimensions}
        label={text}
        isHovered={isHovered}
      />

      {isHovered ? (
        <div
          style={{
            position: 'absolute',
            letterSpacing: '0.1rem',
            top: '1rem',
            opacity: 1,
            fontSize: '0.5rem',
            margin: 0,
            right: ' 1rem',
            textTransform: 'uppercase',
            fontWeight: 800,
            color: 'var(--covidGreen)',
            padding: 0,
            background: 'var(--lightBlack)',
            textAlign: 'right',
          }}
        >
          {hoverInfo}
        </div>
      ) : null}

      <h4>
        {latest[fieldName] ? latest[fieldName].toLocaleString() : ''}{' '}
        {yesterdayFieldName ? (
          <small>
            (+
            {latest[yesterdayFieldName].toLocaleString()})*
          </small>
        ) : null}
      </h4>
      <h3>{text}</h3>
      <p>({new Date(latest[dateField]).toString().substring(0, 15)})</p>
    </div>
  );
};

export default SummaryBox;
