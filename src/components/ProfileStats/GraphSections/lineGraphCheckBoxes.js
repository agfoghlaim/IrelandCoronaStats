import React, { useState, useEffect, useRef, useCallback } from 'react';
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

const LineGraphCheckBoxes = ({ theData, handleTextBox, section, selected }) => {
  const [data, setData] = useState(theData);

  const svgRef = useRef(null);
  const xAxisRef = useRef(null);
  const yAxisRef = useRef(null);
  const xAxis = d3.axisBottom();
  const yAxis = d3.axisLeft();

  const yTickWidth = -Math.abs(width - margin.right - margin.left);
  const xTickWidth = -Math.abs(height - margin.top - margin.bottom);

  const xExtent = d3.extent(data[0].data, (d) =>  d.attributes.StatisticsProfileDate);

  // Switched to log scale, yExtent is hardcoded
  const yExtent = d3.extent(data[0].data, (d) => d.attributes.CovidCasesConfirmed);

  const xScale = d3
    .scaleTime()
    .domain([xExtent[0], xExtent[1]])
    .range([margin.left, width - margin.right]);

  // const yScale = d3
  //   .scaleLinear()
  //   .domain([Math.min(yExtent[0], 0), yExtent[1]])
  //   .range([height - margin.top, margin.bottom]);

  const yScale = d3.scaleLog()
    .domain([1,20000])
    .clamp(true)
    .range([height - margin.top, margin.bottom])
    .nice();

  useEffect(() => {
    const doAxis = (xS, yS) => {
      const xRef = d3.select(xAxisRef.current);
      const yRef = d3.select(yAxisRef.current);
      xAxis.scale(xScale).ticks(d3.timeDay.every(1));
      yAxis.scale(yScale).ticks(20,",.1s");
      xRef.call(xAxis.tickSize(xTickWidth));
      yRef.attr('className', 'what').call(yAxis.tickSize(yTickWidth));
    };
    doAxis();
    setData(theData);
  }, [theData, data, yScale, xScale, yAxis, xAxis, xTickWidth, yTickWidth]);

  const doCircles = (graphData) => {

    return (graphData.data.length && graphData.selected)
      ? graphData.data.map((attr) => {
    
          const y = yScale(attr.attributes[graphData.fieldName]);
          const x = xScale(attr.attributes.StatisticsProfileDate);

          return x && y ? (
            <>
              <circle
                className={classes.lineGraphCircle}
                onClick={() => handleTextBox(attr, graphData.fieldName)}
                cx={x}
                cy={y}
                key={`${graphData.StatisticsProfileDate}`}
                r="0.4rem"
                fill={graphData.color}
              ></circle>
            </>
          ) : null;
        })
      : null;
  };

  const doLine = () => {
    return data.map((graphData) => {
      if (graphData.data.length && graphData.selected) {
        
        const line = d3
          .line()
          .x((d) => xScale(d.attributes.StatisticsProfileDate))
          .y((d) =>  yScale(d.attributes[graphData.fieldName]));
 
        const path = line(graphData.data); //ok
        return (
          <path
            d={path}
            fill="none"
            stroke={graphData.color}
            strokeWidth="2px"
          ></path>
        );
      }
    });
  };

  return (
    <div className={classes.svgWrap}>
      <h4>Something</h4>
      <svg ref={svgRef} viewBox="0 0 800 600" width={width} height={height}>
        {doLine()}
        {data.map((graph) => {
          return doCircles(graph);
        })}

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

export default LineGraphCheckBoxes;
