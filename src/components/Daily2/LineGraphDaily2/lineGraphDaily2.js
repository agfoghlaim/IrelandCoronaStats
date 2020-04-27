import React, { useState, useEffect, useRef, useCallback } from 'react';
import * as d3 from 'd3';
import classes from './lineGraphDaily2.module.css';
import Axis from './axis';
import YAxisLabel from './yAxisLabel';
import Line from './line';
import { useStore } from '../../../Store/store';
import HoverRectangles from '../HoverRectangles/hoverRectangles';

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
const { margin, width, height } = dimensions;
const LineGraphDaily2 = ({ handleSelectCounty, graphData, graphId }) => {
  const dispatch = useStore(false)[1];
  const dailyData = useStore()[0].daily2;

  const daily = dailyData.filter((d) => d.id === graphId)[0]; //should be called graph

  const [selectLogScale, setSelectLogScale] = useState(true);

  const svgRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [hoverInfo, setHoverInfo] = useState();
  const [hoverColor, setHoverColor] = useState();
  const [hoverPosition, setHoverPosition] = useState([]);

  const calculateYExtentOfSelectedAttributes = () => {
    // get yScale
    const getExtentsForAllSelectedAttributes = () => {
      const extents = daily.selectedAttributeNames.map((attr) => {
        return d3.extent(daily.all, (d) => d[attr]);
      });
      return extents;
    };
    const selectedExtents = getExtentsForAllSelectedAttributes();
    const maxValue = selectedExtents.map((h) =>
      Math.max(...selectedExtents.map((h) => h[1]))
    )[0];
    const minValue = selectedExtents.map((h) =>
      Math.min(...selectedExtents.map((h) => h[0]))
    )[0];
    const yExtent = [minValue, maxValue];
    return yExtent;
  };

  const getYScale = () => {
    const getYExtent = () => {
      let extent = calculateYExtentOfSelectedAttributes();
      // logScale can't deal with <= 0
      if (selectLogScale && extent[0] <= 0) {
        extent[0] = 1;
      }
      return extent;
    };
    const yExtent = getYExtent();
    if (selectLogScale) {
      const yScale = d3
        .scaleLog()
        // .scaleSymlog() accepts values below zero but causes more trouble than it's worth
        .domain(yExtent)
        .clamp(true)
        .range([height - margin.top, margin.bottom])
        .nice();
      yScale.theType = 'LOG'; // need this for nice axis (axis.js)
      return yScale;
    } else {
      const yScale = d3
        .scaleLinear()
        .domain(yExtent)
        .clamp(true)
        .range([height - margin.top, margin.bottom]);
      yScale.theType = 'LINEAR'; // need this for nice axis
      return yScale;
    }
  };

  const getXExtent = () => {
    return d3.extent(daily.all, (d) => d.Date);
  };

  const getXScale = () => {
    const xExtent = getXExtent();
    const xScale = d3
      .scaleTime()
      .domain([xExtent[0], xExtent[1]])
      .range([margin.left, width - margin.right]);
    return xScale;
  };

  const colorScale = d3
    .scaleSequential()
    .domain([0, 100])
    .interpolator(d3.interpolateRainbow);

  const handleTextBox = (data, selectedAttribute) => {
    const dateToSelect = data['Date'];
    dispatch('SET_SELECTED_DATE_AND_DATA2', dateToSelect);
  };

  const handleHover = (e, color) => {
    setHoverInfo(e.target.id);
    setHoverColor(color);
    const xP = e.clientX + 20;
    const yP = e.clientY - 10;
    setHoverPosition([xP, yP]);
    setIsHovered(true);
  };
  const handleHoverLeave = (e) => {
    setIsHovered(false);
  };
  //============
  const handleHoverDate = (e, info) => {
    // daily data date attr is 'Date'
    // statistics profile data date attr is 'StatisticsProfileDate'
    let dateFieldName = 'Date';
    if (!info[dateFieldName]) {
      dateFieldName = 'Date';
    }
    setHoverInfo(new Date(info[dateFieldName]).toString().substring(0, 10));
    setHoverColor('var(--lightBlack)');

    const xP = e.clientX + 20;
    const yP = e.clientY - 10;
    setHoverPosition([xP, yP]);
    setIsHovered(true);
  };

  const handleHoverLeaveDate = () => {
    setIsHovered(false);
  };
  //==========
  const getColor = (fieldName) => {
    const check = daily.avail.filter((d) => d.fieldName === fieldName);
    if (check.length && check[0].color) {
      return check[0].color;
    }

    return 'var(--blue)';
  };
  const toggleLogScale = () => {
    const currentLog = selectLogScale;
    setSelectLogScale(!currentLog);
  };

  return (
    <div className={classes.svgWrap}>
      <button onClick={toggleLogScale}>
        {selectLogScale ? 'Use Linear Scale' : 'Use Log Scale'}
      </button>
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
        {daily && daily.all.length ? (
          <>
            <Axis
              dimensions={dimensions}
              xScale={getXScale()}
              yScale={getYScale()}
              selectLogScale={selectLogScale}
            />

            <YAxisLabel
              text={daily.xAxisLabel}
              yClass={classes.yLabel}
              height={height}
            />

            <HoverRectangles
              graphData={daily.all}
              width={width}
              height={height}
              margin={margin}
              xScale={getXScale()}
              xAxisAttr={daily.xAxisAttribute}// todo
              handleHoverLeaveDate={handleHoverLeaveDate}
              handleHoverDate={handleHoverDate}
              handleTextBox={handleTextBox}
            />
           { daily.selectedAttributeNames.map((fieldName) => {
              return (
                <Line
                  graphData={daily.all}
                  i="0"
                  key="0"
                  handleHover={handleHover}
                  handleHoverLeave={handleHoverLeave}
                  xScale={getXScale()}
                  yScale={getYScale()}
                  colorScale={colorScale}
                  fieldName={fieldName}
                  xScaleAttribute="Date"
                  // color="red"
                  color={getColor(fieldName)}
                  handleSelectCounty={handleSelectCounty}
                />
              );
            })}
          </>
        ) : null}

      </svg>
    </div>
  );
};

export default LineGraphDaily2;
