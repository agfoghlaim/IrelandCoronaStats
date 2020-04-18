import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import classes from './lineGraph.module.css';
import HoverRect from '../HoverRect/hoverRect';

const margin = {
  left: 50,
  right: 50,
  top: 50,
  bottom: 50,
};
const width = 800;
const height = 600;

const LineGraph = ({ theData, handleTextBox, section }) => {

  const [data, setData] = useState(theData);

  const svgRef = useRef(null);
  const xAxisRef = useRef(null);
  const yAxisRef = useRef(null);
  const xAxis = d3.axisBottom();
  const yAxis = d3.axisLeft();
  const yTickWidth = -Math.abs(width - margin.right - margin.left);
  const xTickWidth = -Math.abs(height - margin.top - margin.bottom);

  const [isHovered, setIsHovered] = useState(false);
  const [hoverInfo, setHoverInfo] = useState();
  const [hoverColor, setHoverColor] = useState();
  const [hoverPosition, setHoverPosition] = useState([]);

  const xExtent = d3.extent(
    data[0].data,
    // (d) => d.attributes.StatisticsProfileDate
    (d) => d.attributes[data[0].xAxisAttribute]
  );

  useEffect(() => {
    setData(theData);
  }, [theData]);

  // Switched to log scale, yExtent is hardcoded
  // const yExtent = d3.extent(data[0].data, (d) => d.attributes.CovidCasesConfirmed);

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

  useEffect(() => {
    const doAxis = (xS, yS) => {
      const xRef = d3.select(xAxisRef.current);
      const yRef = d3.select(yAxisRef.current);
      xAxis.scale(xScale).ticks(d3.timeDay.every(1));
      yAxis.scale(yScale).ticks(20, ',.1s');
      xRef.call(xAxis.tickSize(xTickWidth));
      yRef.attr('className', 'what').call(yAxis.tickSize(yTickWidth));
    };

    doAxis();
  }, [theData, data, yScale, xScale, yAxis, xAxis, xTickWidth, yTickWidth]);

  const doCircles = (graphData) => {
    return graphData.data.length && graphData.selected
      ? graphData.data.map((attr, i) => {
          const y = yScale(attr.attributes[graphData.fieldName]);
          // const x = xScale(attr.attributes.StatisticsProfileDate);
          const x = xScale(attr.attributes[graphData.xAxisAttribute]);

          return x && y ? (
            <circle
              key={`${graphData.fieldName}-${i}`}
              className={classes.lineGraphCircle}
              onClick={() =>
                handleTextBox(attr, graphData.fieldName, graphData)
              }
              onMouseEnter={(e) => handleHover(e, attr, graphData)}
              onMouseLeave={(e) => handleHoverLeave(e)}
              cx={x}
              cy={y}
              r="0.4rem"
              fill={graphData.color}
            ></circle>
          ) : null;
        })
      : null;
  };

  const handleHoverDate = (e, info) => {

    setHoverInfo(
      new Date(info.attributes.StatisticsProfileDate)
        .toString()
        .substring(0, 10)
    );
    setHoverColor('var(--lightBlack)');

    const xP = e.clientX + 20;
    const yP = e.clientY - 10;
    setHoverPosition([xP, yP]);
    setIsHovered(true);
  };
  const handleHoverLeaveDate = () => {
    setIsHovered(false);
  };
  const handleHover = (e, info, attr) => {
    // console.log(info,attr)
    setHoverInfo(
      `${attr.name}: ${info.attributes[attr.fieldName]}`
    );
    setHoverColor(attr.color);
    // setHoverInfo(
    //   new Date(info.attributes.StatisticsProfileDate)
    //     .toString()
    //     .substring(0, 10)
    // );

    const xP = e.clientX + 20;
    const yP = e.clientY - 10;
    setHoverPosition([xP, yP]);
    setIsHovered(true);
  };
  const handleHoverLeave = () => {
    setIsHovered(false);
  };



  const doHoverLines2 = () => {
    const graphData = data[0]; // do once
    return graphData.data.length && graphData.selected
      ? graphData.data.map((attr, i) => {

          const y1 = 0;
          const graphWidth = width - margin.left - margin.right;
          const rectWidth = graphWidth / graphData.data.length;
          const x = xScale(attr.attributes[graphData.xAxisAttribute]);
          const xOffset = x - rectWidth / 2;
          const rect = {
            x: x,
            y:margin.top,
            graphWidth,
            rectWidth,
            height: height-margin.bottom,
            xOffset,
            key: `${graphData.fieldName}-${i}`

          }
          return x ? (
            <HoverRect rect={rect} attr={attr} graphData={graphData} handleHoverLeaveDate={handleHoverLeaveDate} handleHoverDate={handleHoverDate} />
          ) : null;
        })
      : null;
  };
  const doLine = () => {
    return data.map((graphData) => {
      if (graphData.data.length && graphData.selected) {
        const line = d3
          .line()
          // .x((d) => xScale(d.attributes.StatisticsProfileDate))
          .x((d) => xScale(d.attributes[graphData.xAxisAttribute]))
          .y((d) => yScale(d.attributes[graphData.fieldName]));

        const path = line(graphData.data);
        return (
          <path
            key={graphData.fieldName}
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

      {/* <h4>Something</h4> */}
      <svg ref={svgRef} viewBox="0 0 800 600" width={width} height={height}>
        <text
          fill="var(--black)"
          x={-Math.abs(height / 2 + 100)}
          y="20"
          style={{ transform: 'rotate(-90deg)' }}
          className={classes.yLabel}
        >
          #cases (log scale)
        </text>

        {doLine()}

        {/* {data.map((graph) => {
          return doHoverLines(graph);
        })}  */}
        {data && data.length && data[0].selected ? doHoverLines2() : null}
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

export default LineGraph;
