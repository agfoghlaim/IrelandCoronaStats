// Based off chart Hooks
// rendered in daily

import React, { useRef, useState } from 'react';
import * as d3 from 'd3';
import Arc from './arc';
import classes from './breakdown.module.css';

const width = 600;
const height = 500;
const innerRadius = 50;
const outerRadius = 200;

const BreakdownChart = props => {
  // props.breakdown not used, remove in breakdown.js - TODO

  const [breakdownData] = useState(props.breakdown);
  const svgRef = useRef(null);
  const createPie = d3
    .pie()
    .value(d => d.value)
    .sort(null);
  const createArc = d3
    .arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius);
  const colors = d3.scaleOrdinal(d3.schemeCategory10);
  const format = d3.format(',d');
  const data = createPie(breakdownData);

  return (
    <div className={classes.breakdownPieWrap}>
      <div className={classes.sectionHeader}>
        <h3>{props.chartTitle}</h3>
        </div>
        <div className={classes.pieSvgWrap}>
        <svg width={width} height={height} viewBox="0 0 500 1000">
          <g
            ref={svgRef}
            transform={`translate(${outerRadius + 100}, ${outerRadius + 250})`}
          >
            {data.map((d, i) => {
            
              return (
                <Arc
                  key={i}
                  data={d}
                  index={i}
                  createArc={createArc}
                  colors={colors}
                  format={format}
                  svgDimensions={[width, height]}
                />
              );
            })}
          </g>
        </svg>
        </div>
      </div>
     
  );
};

export default BreakdownChart;
