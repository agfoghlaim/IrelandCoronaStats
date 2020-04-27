import React, { useState, useEffect, useRef, useCallback } from 'react';
import * as d3 from 'd3';
import classes from './lineGraph2.module.css';
import Axis from './axis';
import YAxisLabel from './yAxisLabel';
import Line from './line';
import { useStore } from '../../../Store/store';

const margin = {
  left: 50,
  right: 50,
  top: 50,
  bottom: 50,
};
const width = 800;
const height = 600;

const dimensions = {
  margin: {
    left: 50,
    right: 50,
    top: 50,
    bottom: 50,
  },
  width: 800,
  height: 600,
};

const LineGraph2 = ({ handleSelectCounty }) => {

  const storeSections = useStore()[0].sections[0];

  const svgRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [hoverInfo, setHoverInfo] = useState();
  const [hoverColor, setHoverColor] = useState();
  const [hoverPosition, setHoverPosition] = useState([]);
  const [selectedAttribute, setSelectedAttribute] = useState('');
  const [selectedAttributeName, setSelectedAttributeName] = useState('');
  // always run, this could be more efficient
  useEffect(() => {
    const findSelectedAttribute = () => {
      const selected = storeSections.avail.filter((d) => d.selected)[0];
      return selected;
    };
    const newSelected = findSelectedAttribute();
    setSelectedAttribute(newSelected.fieldName);
    setSelectedAttributeName(newSelected.name);
  });


  const useForXExtent = storeSections.allCounties[0].stats;

  const xExtent = d3.extent(useForXExtent, (d) => d.TimeStampDate);
  const xScale = d3
    .scaleTime()
    .domain([xExtent[0], xExtent[1]])
    .range([margin.left, width - margin.right]);
  const yScale = d3
    .scaleLog()
    .domain([1, 20000])
    .clamp(true)
    .range([height - margin.top, margin.bottom])
    .nice();
  const colorScale = d3
    .scaleSequential()
    .domain([0, 100])
    .interpolator(d3.interpolateRainbow);

  const handleHover = (e, info) => {
    const county = info.name;
    // e.target.attributes['stroke-width'].value = '0.5rem';
    setHoverInfo(county);
    setHoverColor(info.color);
    const xP = e.clientX + 20;
    const yP = e.clientY - 10;
    setHoverPosition([xP, yP]);
    setIsHovered(true);
  };
  const handleHoverLeave = (e) => {
    setIsHovered(false);
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
            background: `${hoverColor}`,
            color: 'var(--white)',
            padding: '0.5rem 1rem',
            borderRadius: '0.4rem',
            fontSize: '0.6rem',
          }}
        >
          {hoverInfo}
        </div>
      ) : null}

      <h3 style={{ textAlign: 'center' }}>{selectedAttributeName} by County</h3>

      <svg
        style={{ maxWidth: '100%' }}
        ref={svgRef}
        viewBox="0 0 800 600"
        width={width}
        height={height}
      >
        <Axis dimensions={dimensions} xScale={xScale} yScale={yScale} />
        <YAxisLabel
          text={'#cases (log scale)'}
          yClass={classes.yLabel}
          height={height}
        />
        {storeSections && storeSections.allCounties.length
          ? storeSections.allCounties.map((graphData, i) => (
              <Line
                graphData={graphData}
                i={i}
                key={i}
                handleHover={handleHover}
                handleHoverLeave={handleHoverLeave}
                xScale={xScale}
                yScale={yScale}
                colorScale={colorScale}
                selectedAttribute={selectedAttribute}
                handleSelectCounty={handleSelectCounty}
              />
            ))
          : null}

      </svg>
    </div>
  );
};

export default LineGraph2;