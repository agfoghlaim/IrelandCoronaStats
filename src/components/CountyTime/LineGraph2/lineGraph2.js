import React, { useState, useEffect, useRef, useCallback } from 'react';
import * as d3 from 'd3';
import classes from './lineGraph2.module.css';
import Axis from './axis';
import YAxisLabel from './yAxisLabel';
import Line from './line';
// import HoverRect from '../HoverRect/hoverRect';

const margin = {
  left: 50,
  right: 50,
  top: 50,
  bottom: 50,
};
const width = 800;
const height = 600;

const LineGraph2 = ({ theData, theNewData, handleTextBox, handleSelectCounty}) => {
  // const [data, setData] = useState(theData);
  const [newData, setNewData] = useState(theNewData);
  // console.log(theData, theNewData)
  const svgRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [hoverInfo, setHoverInfo] = useState();
  const [hoverColor, setHoverColor] = useState();
  const [hoverPosition, setHoverPosition] = useState([]);
  const [selectedAttribute, setSelectedAttribute] = useState('');

 
  useEffect(() => {
    const findSelectedAttribute = () => {

      const selected = newData.avail.filter(d=>d.selected)[0];
 
      return selected;
    }
    setNewData(theNewData);
  
    const newSelected = findSelectedAttribute();
    setSelectedAttribute(newSelected.fieldName);
  }, [ theNewData, newData]);

  const useForXExtent = newData.allData[0];
  const xExtent = d3.extent(useForXExtent, (d) => d.TimeStamp);
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

  const handleHover = (e, info, color) => {
    const county = info[0].CountyName;
    // console.log(e.target.attributes)
    e.target.attributes['stroke-width'].value= '0.5rem';
    setHoverInfo(county);
    setHoverColor(color);
    const xP = e.clientX + 20;
    const yP = e.clientY - 10;
    setHoverPosition([xP, yP]);
    setIsHovered(true);
  };
  const handleHoverLeave = (e) => {
    e.target.attributes['stroke-width'].value= '2px';
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

      <svg
        style={{ maxWidth: '100%' }}
        ref={svgRef}
        viewBox="0 0 800 600"
        width={width}
        height={height}
      >
        <Axis xExt={xExtent} />
        <YAxisLabel
          text={'#cases (log scale)'}
          yClass={classes.yLabel}
          height={height}
        />
         {newData && newData.allData.length 
          ? newData.allData.map((graphData, i) => (
              <Line
                graphData={graphData}
                i={i}
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
